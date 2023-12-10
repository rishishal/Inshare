import express from "express";
import multer from "multer";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import File from "../models/file";
import axios, { AxiosResponse } from "axios";
import { Response } from "express";

const router = express.Router();

const storage = multer.diskStorage({}); // Use memory storage for multer

const upload = multer({
  storage,
});

router.post("/upload", upload.single("myFile"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Hey bro! We need a file" });
    }

    console.log(req.file);

    let uploadedFile: UploadApiResponse;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "shareMe",
        resource_type: "auto",
      });

      // this code is use to upload sepeatedly in cloudinary
      // console.log(uploadedFile);
      // res
      //   .status(200)
      //   .json({ message: "File uploaded successfully", data: uploadedFile });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Cloudinary upload failed" });
    }
    const { originalname } = req.file;
    const { secure_url, bytes, format } = uploadedFile;

    const file = await File.create({
      filename: originalname,
      sizeInBytes: bytes,
      secure_url,
      format,
    });
    res.status(200).json({
      id: file._id,
      downloadPageLink: `${process.env.API_BASE_ENDPOINT_CLIENT}download/${file._id}`,
      secure_url: file.secure_url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error :(" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const file = await File.findById(id);
    if (!file) {
      return res.status(404).json({ message: "File does not exist" });
    }
    const { filename, format, sizeInBytes } = file;
    return res.status(200).json({
      name: filename,
      sizeInBytes,
      format,
      id,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error :(" });
  }
});

router.get("/:id/download", async (req, res) => {
  try {
    const id = req.params.id;
    const file = await File.findById(id);
    if (!file) {
      return res.status(404).json({ message: "File does not exist" });
    }
    // https.get(file?.secure_url, (fileStream) => fileStream.pipe(res));

    const fileUrl: string | undefined = file?.secure_url;

    if (fileUrl) {
      axios
        .get(fileUrl, { responseType: "stream" })
        .then((response: AxiosResponse) => {
          response.data.pipe(res);
        })
        .catch((error) => {
          console.error("Error fetching file:", error);
          res.status(500).send("Internal Server Error");
        });
    } else {
      res.status(404).send("File not found");
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error :(" });
  }
});

export default router;
