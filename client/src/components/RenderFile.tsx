import { FunctionComponent } from "react";
import { IFile } from "../../libs/types";
import { sizeInMb } from "../../libs/sizeInMb";

const RenderFile: FunctionComponent<{ file: IFile }> = ({
  file: { format, sizeBytes, name },
}) => {
  return (
    <div className='flex items-center w-full p-4 my-2'>
      <img src={`/${format}.png`} alt='' className='w-14 h-14' />
      <span className='mx-2'>{name}</span>
      <span className='ml-auto'>{sizeInMb(sizeBytes)}</span>
    </div>
  );
};
export default RenderFile;
