const express = require('express');
const range = require('range-parser');
const fs = require('fs');
const path = require('path');
const { S3 } = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');
const { Readable } = require('stream');
const { EventEmitter } = require('events');
EventEmitter.defaultMaxListeners = 15; // set a higher limit, adjust as needed

const app = express();
const port = 3000;

// NOTE: It should pickup the credentails from the .aws/credentials file
dotenv.config();

console.log(process.env.ACCESS_KEY_ID, process.env.SECRET_ACCESS_KEY, process.env.REGION);

const s3Options = {
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
    }
};

const s3 = new S3(s3Options);
const bucketName = process.env.BUCKET_NAME;
const key = process.env.VIDEO_KEY;

app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to the Node.js Tutorial!' });
});

app.get('/api/video', (req, res) => {
    const videoPath = './videos/1080p.mp4'; // Replace with the path to your video file
    const videoSize = fs.statSync(videoPath).size;
    const rangeRequest = range(videoSize, req.headers.range, { combine: true });

    if (rangeRequest === -1) {
        // Invalid range
        res.status(416).send('Requested Range Not Satisfiable');
        return;
    }

    const { start, end } = rangeRequest[0];

    const chunkSize = end - start + 1;
    const headers = {
        'Content-Range': `bytes ${start}-${end}/${videoSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4',
    };

    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
});

app.get('/api/videoaws', async (req, res) => {

    const params = {
        Bucket: bucketName,
        Key: key,
    };

    try {
        const { ContentLength } = await s3.headObject(params);
        const rangeRequest = range(ContentLength, req.headers.range, { combine: true });

        if (rangeRequest === -1) {
            res.status(416).send('Requested Range Not Satisfiable');
            return;
        }

        const { start, end } = rangeRequest[0];
        const chunkSize = 3e6; // for example, adjust as needed

        const responseHeaders = {
            'Content-Range': `bytes ${start}-${end}/${ContentLength}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(206, responseHeaders);

        const rangeParams = {
            Bucket: bucketName,
            Key: key,
            Range: `bytes=${start}-${end}`,
        };

        // Use createReadStream from aws-sdk
        s3.getObject(rangeParams).then(data => {
            const readable = Readable.from(data.Body);

            // Pipe the S3 stream directly to the response
            readable?.pipe(res);
        });

        // Log headers
        console.log(responseHeaders);


    } catch (error) {
        console.error('S3 HeadObject Error:', error);
        // res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
