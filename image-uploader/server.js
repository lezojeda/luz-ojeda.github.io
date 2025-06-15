const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
const upload = multer({ dest: 'tmp/' });

const astroPicturesDir = path.resolve(__dirname, '..', 'src', 'content', 'pictures');
const filesDir = path.join(astroPicturesDir, 'files');

app.post('/upload', upload.single('image'), (req, res) => {
  const { titleEn, titleEs, pubDate } = req.body;

  const ext = path.extname(req.file.originalname).toLowerCase();
  const baseName = req.file.originalname.toLowerCase().replace(/\s+/g, '_');

  const imageDest = path.join(filesDir, baseName);
  const jsonDest = path.join(astroPicturesDir, baseName.replace(ext, '.json'));

  console.log('Moving image to:', imageDest);
  console.log('Creating JSON at:', jsonDest);

  try {
    fs.mkdirSync(filesDir, { recursive: true });
    fs.renameSync(req.file.path, imageDest);
  } catch (err) {
    console.error("Error moving file:", err);
    return res.status(500).send("File move failed");
  }

  const json = {
    image: `./files/${baseName}`,
    pubDate,
    en: { title: titleEn },
    es: { title: titleEs }
  };

  try {
    fs.writeFileSync(jsonDest, JSON.stringify(json, null, 2));
  } catch (err) {
    console.error("Error writing JSON:", err);
    return res.status(500).send("JSON write failed");
  }

  res.sendStatus(200);
});

app.listen(3000, () => console.log("Uploader running on http://localhost:3000"));