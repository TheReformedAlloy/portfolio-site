const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

const s3Bucket = new AWS.S3();

//Pass file buffer(s) to middleware in req.file(s)
function uploadFilesToBucket (req, res, next) {
    Promise.all(req.files.map(file => {
        const bucketPath = req.path.slice(1);
        return new Promise((resolve, reject) => {
            s3Bucket.upload({
                Bucket: "reformed-alloy",
                Key: `${bucketPath}/${file.originalname}`,
                Body: file.buffer
            }, (err, data) => {
                if(err) reject(err)
                else resolve(data);
            })
        })
    })).then(() => {
        next();
    });
}

//Delete file
function deleteFilesFromBucket (req, res) {
    req.files.forEach(file => {
        const bucketPath = req.path.slice(1);
        s3Bucket.deleteObject({
            Bucket: bucketName,
            Key: `${bucketPath}/${file.originalname}`
        });
    });
    next();
}

module.exports = {
    uploadFilesToBucket,
    deleteFilesFromBucket
}