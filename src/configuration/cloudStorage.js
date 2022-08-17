const { Storage } = require('@google-cloud/storage');
const path = require('path');
const gc = new Storage({
    keyFileName: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    projectId: 'hardstore-334605',
});

gc.getBuckets().then((x) => console.log(x));
const bucket = gc.bucket('keyhub-files-three');
module.exports = bucket;
