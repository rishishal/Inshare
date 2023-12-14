"use client";
import Image from "next/image";
const DownloadPage = ({ downloadPageLink }) => {
  return (
    <div className='p-1 '>
      <h1 className='my-2 text-lg font-medium'>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias,
        corporis?
      </h1>
      <div className='flex space-x-3'>
        <span className='break-all'>{downloadPageLink}</span>
        <Image
          src='/copy.png'
          alt='Copy-Image'
          className='object-contain cursor-pointer'
          height={80}
          width={80}
          onClick={() => navigator.clipboard.writeText(downloadPageLink)}
        />
      </div>
    </div>
  );
};
export default DownloadPage;
