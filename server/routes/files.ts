import express from "express";
import multer from "multer";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import File from "../models/file";

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
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error :(" });
  }
});

export default router;
