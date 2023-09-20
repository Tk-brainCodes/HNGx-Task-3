import { useState } from "react";
import Image from "next/image";
import { image_samples } from "../(data)/image-sample";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import LoadingSpinner from '../(components)/LoadingSpinner'

type Props = {};

function ImageContainer({}: Props) {
  const [characters, updateCharacters] = useState(image_samples);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCharacters, setFilteredCharacters] = useState(characters); 

  const filterCharacters = () => {
    const filtered = characters.filter((character) =>
      character.tag.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCharacters(filtered);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    filterCharacters(); 
  };

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;

    const items = Array.from(filteredCharacters); 
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  const handleImageLoad = () => {
    setLoading(false);
  };

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
                        {loading ? (
    <div className="w-[280px] h-[320px] bg-gray-300 animate-pulse"/>
                        ) : (
                          <>
                            <Image
                              src={image}
                              alt={`Image ${index}`}
                              width={200}
                              height={200}
                              loading='lazy'
                              className='w-[280px] h-[320px] rounded-[4px] bg-slate-300'
                              onLoad={handleImageLoad}
                            />
                            <div className="absolute top-0 left-0 bg-black text-white p-2">{tag}</div>
                          </>
                        )}
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
