const express = require('express');
const range = require('range-parser');
const fs = require('fs');
const path = require('path');
const {
    S3,
} = require('@aws-sdk/client-s3');
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
const bucketName = 'eshop-microservices-bucket';
const key = 'videos/1080p.mp4';

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

app.get('/api/videoaws', (req, res) => {
    const params = {
        Bucket: bucketName,
        Key: key,
    };

    s3.headObject(params, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        const videoSize = data.ContentLength;
        const rangeRequest = range(videoSize, req.headers.range, { combine: true });

        if (rangeRequest === -1) {
            // Invalid range
            res.status(416).send('Requested Range Not Satisfiable');
            return;
        }
        const { start, end } = rangeRequest[0];

        const chunkSize = 65536; // for example, adjust as needed

        const headers = {
            'Content-Range': `bytes ${start}-${end}/${videoSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(206, headers);

        console.log(params, start, end, chunkSize);
        const s3Stream = s3.getObject(params).createReadStream({ Range: `bytes=${start}-${end}` });

        // Convert the S3 stream to a Node.js Readable stream
        const readableStream = Readable.from(s3Stream); //new Readable();

        // Log headers
        console.log(headers);

        // Log errors
        s3Stream.on('error', (error) => {
            console.error('S3 Stream Error:', error);
        });

        readableStream.on('error', (error) => {
            console.error('Readable Stream Error:', error);
        });

        res.on('error', (error) => {
            console.error('Response Stream Error:', error);
        });

        readableStream.pipe(res);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
