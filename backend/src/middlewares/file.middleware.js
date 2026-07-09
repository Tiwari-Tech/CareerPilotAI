const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 3 * 1024 * 1024 }, // 3 MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'application/pdf') {
            const err = new Error('Only PDF files are supported for the resume upload');
            err.status = 400;
            return cb(err);
        }
        cb(null, true);
    },
});

module.exports = upload;
