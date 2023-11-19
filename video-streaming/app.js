const express = require('express');
const range = require('range-parser');
const fs = require('fs');
const path = require('path');
const {
    S3,
} = require('@aws-sdk/client-s3');

const app = express();
const port = 3000;

// NOTE: It should pickup the credentails from the .aws/credentials file
// Configure AWS SDK with your credentials
// AWS.config.update({
//     accessKeyId: 'YOUR_ACCESS_KEY',
//     secretAccessKey: 'YOUR_SECRET_KEY',
//     region: 'YOUR_AWS_REGION',
// });

const s3 = new S3();
const bucketName = 'your-s3-bucket-eshop-microservices-bucket';
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

        const chunkSize = end - start + 1;
        const headers = {
            'Content-Range': `bytes ${start}-${end}/${videoSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(206, headers);

        const s3Stream = s3.getObject(params).createReadStream({ Range: `bytes=${start}-${end}` });
        s3Stream.pipe(res);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
