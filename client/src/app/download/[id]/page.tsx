"use client";
import { NextPage } from "next";
import { IFile } from "../../../../libs/types";
import RenderFile from "@/components/RenderFile";
import axios from "axios";
import fileDownload from "js-file-download";
import Image from "next/image";

const page: NextPage<{ file: IFile }> = async ({
  params,
}: {
  params: { id: string };
}) => {
  const res = await fetch(`https://charming-tux-ant.cyclic.app/${params.id}`);
  const data = await res.json();

  const handleDownload = async () => {
    const { data } = await axios.get(
      `https://charming-tux-ant.cyclic.app/${params.id}/download`,
      {
        responseType: "blob",
      }
    );

    fileDownload(data, name);
  };

  const { id, name, sizeInBytes, format } = data;
  return (
    <div className='flex flex-col items-center justify-center py-3 space-y-4 bg-gray-800 rounded-md shadow-xl w-96'>
      {!id ? (
        <span>oops! Fide dose not exist! check the URL</span>
      ) : (
        <>
          <Image
            src='/file-download.png'
            alt='File Image'
            // className='w-16 h-16'
            width={80}
            height={80}
          />
          <h1 className='text-xl'>Your File is ready to be Downloaded</h1>
          <RenderFile file={{ format, name, sizeInBytes }} />
          <button className='button' onClick={handleDownload}>
            Download
          </button>
        </>
      )}
    </div>
  );
};
export default page;
