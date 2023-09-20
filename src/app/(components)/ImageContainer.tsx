import { useState, useEffect } from "react";
import Image from "next/image";
import { image_samples } from "../(data)/image-sample";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IconTag } from "@tabler/icons-react";

type Props = {};

function ImageContainer({}: Props) {
  const [characters, updateCharacters] = useState(image_samples);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCharacters, setFilteredCharacters] = useState(characters);

  const filterCharacters = () => {
    const filtered = characters.filter((character) =>
      character.tag.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCharacters(filtered);
  };

  useEffect(() => {
    filterCharacters();
  }, [searchQuery, characters]);

  function handleInputChange(e: any) {
    setSearchQuery(e.target.value);
  }

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;

    const items = Array.from(filteredCharacters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  return (
    <>
      <div className='mx-auto px-[2.7em] mb-[2em]'>
        <div className='text-3xl mb-[20px] font-semibold text-black flex gap-5'>
          Gallery
        </div>

        <input
          type='text'
          placeholder='Search image tags...'
          className='text-black w-[400px] text-base mt-[20px] border-b border-gray-300 font-normal leading-normal bg-transparent outline-none'
          value={searchQuery}
          onChange={handleInputChange}
        />
      </div>
      <div className='p-5 md:p-10'>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='image-gallery' direction='horizontal'>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className='grid grid-cols-1 gap-3 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              >
                {filteredCharacters.map(({ id, image, tag }, index) => (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className='mb-10'
                      >
                        <div className='w-[280px] h-[320px] rounded-[4px] bg-slate-300'>
                          <Image
                            src={image}
                            alt={`Image ${index}`}
                            width={200}
                            height={200}
                            loading='lazy'
                            className='w-full h-full object-cover'
                          />
                          <div className='relative flex gap-3 opacity-75 bg-black text-white p-2'>
                            <IconTag size={20} className="text-white"/>{tag}
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
}

export default ImageContainer;
