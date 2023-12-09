import { NextPage } from "next";
import { IFile } from "../../../../libs/types";
import RenderFile from "@/components/RenderFile";

const page: NextPage<{ file: IFile }> = async ({
  params,
}: {
  params: { id: string };
}) => {
  const res = await fetch(`http://localhost:8000/api/files/${params.id}`);
  const data = await res.json();

  const { id, name, sizeInBytes, format } = data;
  return (
    <div className='flex flex-col items-center justify-center py-3 space-y-4 bg-gray-800 rounded-md shadow-xl w-96'>
      {!id ? (
        <span>oops! Fide dose not exist! check the URL</span>
      ) : (
        <>
          <img
            src='/file-download.png'
            alt='File Image'
            className='w-16 h-16'
          />
          <h1 className='text-xl'>Your File is ready to be Downloaded</h1>
          <RenderFile file={{ format, name, sizeInBytes }} />
          <button className='button'>Download</button>
        </>
      )}
    </div>
  );
};
export default page;
