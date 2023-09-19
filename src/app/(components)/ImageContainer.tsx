import React from "react";
import Image from "next/image";
import { image_samples } from "../(data)/image-sample";
import { IconSearch } from "@tabler/icons-react";

type Props = {};

function ImageContainer({}: Props) {
  return (
    <>
      <div className='mx-auto px-[2.7em] mb-[2em]'>
        <div className='text-3xl font-semibold text-black'>Gallery</div>

        <input
          type='text'
          placeholder='Search image tags...'
          className='text-black w-[400px] text-base mt-[20px] border-b border-gray-300 font-normal leading-normal bg-transparent outline-none'
        />
      </div>
      <div className='p-5 md:p-10'>
        <div className='columns-1 gap-5 lg:gap-8 sm:columns-2 lg:columns-3 xl:columns-4 [&>img:not(:first-child)]:mt-5 lg:[&>img:not(:first-child)]:mt-8'>
          {image_samples.map(({ id, image }) => (
            <div key={id}>
              <img className='mb-[1em] hover:brightness-50 cursor-pointer' src={image} alt='image' />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ImageContainer;
