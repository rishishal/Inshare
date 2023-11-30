"use client";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const DropZone = () => {
  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div>
      <div {...getRootProps()} className='w-full h-80'>
        <input {...getInputProps()} />
        <p>Drag & Drop Files Here </p>
      </div>
    </div>
  );
};
export default DropZone;
