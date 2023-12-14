"use client";
import { Dispatch, FunctionComponent, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

const DropZone: FunctionComponent<{ setFile: Dispatch<any> }> = ({
  setFile,
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: {
        "image/jpeg": [".jpeg", ".jpg"],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          [".docx"],
        "image/png": [".png"],
        "application/pdf": [".pdf"],
      },
    });

  return (
    <div className='w-full p-4'>
      <div
        {...getRootProps()}
        className='w-full h-80 rounded-md cursor-pointer focus:outline-none'
      >
        <input {...getInputProps()} />
        <div
          className={`flex flex-col items-center justify-center border-2 border-dashed border-yellow-light rounded-xl h-full space-y-3
            ${isDragReject ? "border-red-500" : ""}
            ${isDragAccept ? "border-green-500" : ""}`}
        >
          <Image src='/folder.png' alt='folder' width={100} height={80} />
          {isDragReject ? (
            <p>Sorry, This app only supported image and mp3</p>
          ) : (
            <>
              <p>Drag & Drop Files Here </p>
              <p className='mt-2 text-base text-gray-300'>
                Only Jpeg, png & mp3 files supported
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default DropZone;
