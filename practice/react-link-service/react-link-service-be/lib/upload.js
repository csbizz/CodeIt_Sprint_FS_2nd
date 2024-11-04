const path = require('path');
const multer = require('multer');
const { v4: uuid } = require('uuid');
const { STATIC_FILE_PATH, STATIC_URL } = require('../config');

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, STATIC_FILE_PATH);
    },
    filename(req, file, cb) {
      const { originalname } = file;
      const ext = path.extname(originalname);
      const filename = `temp-${uuid()}${ext}`;
      file.location = `${STATIC_URL}/${filename}`;
      cb(null, filename);
    },
  }),
});

module.exports = upload;
