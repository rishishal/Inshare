"use client";
import DownloadPage from "@/components/DownloadPage";
import DropZone from "@/components/DropZone";
import EmailForm from "@/components/EmailForm";
import RenderFile from "@/components/RenderFile";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState();
  const [id, setId] = useState();
  const [downloadPageLink, setDownloadPageLink] = useState();
  const [uploadState, setUploadState] = useState<
    "Uploading" | "Upload Failed" | "Uploaded" | "Upload"
  >("Upload");

  axios.defaults.baseURL = "https://charming-tux-ant.cyclic.app/";

  const handleUpload = async () => {
    if (uploadState === "Uploading") return;
    setUploadState("Uploading");
    const formData = new FormData();
    formData.append("myFile", file);
    try {
      const { data } = await axios({
        method: "POST",
        data: formData,
        url: "api/files/upload",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setDownloadPageLink(data.downloadPageLink);
      setId(data.id);
      setUploadState("Uploaded");
    } catch (error) {
      console.error("error", (error as Error)?.response?.data);
      setUploadState("Upload Failed");
    }
  };

  const resetComponent = () => {
    setFile(null);
    setDownloadPageLink(null);
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='my-4 text-3xl font-medium'>
        Got a file Share? Easy file Sharing
      </h1>
      <div className='flex flex-col items-center bg-gray-800 shadow-xl w-96 rounded-xl justify-center'>
        {!downloadPageLink && <DropZone setFile={setFile} />}

        {file && (
          <RenderFile
            file={{
              format: file.type.split("/")[1],
              name: file.name,
              sizeInBytes: file.size,
            }}
          />
        )}

        {/* Upload File */}
        {!downloadPageLink && file && (
          <button className='button' onClick={handleUpload}>
            {uploadState}
          </button>
        )}

        {downloadPageLink && (
          <div className='p-2 text-center'>
            <DownloadPage downloadPageLink={downloadPageLink} />
            <EmailForm id={id} />
            <button className='button' onClick={resetComponent}>
              Upload New File
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
