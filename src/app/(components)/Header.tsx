import React from "react";
import { IconPhotoPlus } from "@tabler/icons-react";

type Props = {};

function Header({}: Props) {
  return (
    <div className='w-full h-auto px-[2.7em] py-4 mb-[4em] border-b border-grey-200 flex items-center justify-between'>
      <div className='flex gap-2'>
        <IconPhotoPlus size={20} />
        <span>Photo Plus</span>
      </div>
      <div className=''>
        <button className='px-[3em] py-2 hover:bg-slate-900 transition ease-in-out rounded-md bg-black text-white text-sm'>
          Sign up
        </button>
      </div>
    </div>
  );
}

export default Header;
