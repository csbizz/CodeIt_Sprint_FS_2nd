import express from 'express';
import multer from 'multer';

const app = express();

const upload = multer({ dest: 'uploads/' });

app.post('/photos', upload.single('image'), (req, res) => {
  console.log(req.file.path);
  const filename = req.file.filename;
  const path = `/profile/${filename}`;
  res.json({ path });
});

app.arguments('/profile', express.static('uploads/'));

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
