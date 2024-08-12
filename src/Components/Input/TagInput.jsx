import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-2 text-sm  text-slate-900 bg-slate-100 px-3 py-1 rounded"
            >
              #{tag}
              <button onClick={() => handleRemoveTag(tag)}>
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-3 md:gap-4  mt-3">
        <input
          onChange={handleInputChange}
          value={inputValue}
          type="text"
          placeholder="Add tags "
          className=" text-xs  md:text-sm bg-transparent border px-[6px] py-1 md:py-2 md:px-3 rounded outline-none  "
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={() => addNewTag()}
          className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700 group duration-500"
        >
          <MdAdd className="text-2xl text-blue-700 group-hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
