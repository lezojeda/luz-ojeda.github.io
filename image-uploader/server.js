const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
const upload = multer({ dest: "tmp/" });

const astroPicturesDir = path.resolve(__dirname, "..", "src", "content", "pictures");
const filesDir = path.join(astroPicturesDir, "files");

app.post("/upload", upload.single("image"), (req, res) => {
	let { titleEn, titleEs, pubDate, filename } = req.body;

	// Use today's date if no date passed
	if (!pubDate) {
		const now = new Date();
		pubDate = now.toISOString().split("T")[0]; // "YYYY-MM-DD"
	}

	const ext = path.extname(req.file.originalname).toLowerCase();
	// If filename is provided, ensure it has the correct extension
	let baseName;
	if (filename) {
		// Remove any existing extension from the provided filename and add the correct one
		const filenameWithoutExt = path.parse(filename).name;
		baseName = filenameWithoutExt + ext;
	} else {
		baseName = req.file.originalname.toLowerCase().replace(/\s+/g, "_");
	}

	const imageDest = path.join(filesDir, baseName);
	const jsonDest = path.join(astroPicturesDir, baseName.replace(ext, ".json"));

	console.log("Moving image to:", imageDest);
	console.log("Creating JSON at:", jsonDest);

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
		es: { title: titleEs },
	};

	try {
		fs.writeFileSync(jsonDest, JSON.stringify(json, null, 2));
	} catch (err) {
		console.error("Error writing JSON:", err);
		return res.status(500).send("JSON write failed");
	}

	res.sendStatus(200);
	console.log("Image successfully uploaded.\n");
});

app.listen(3000, () => console.log("Uploader running on http://localhost:3000"));
