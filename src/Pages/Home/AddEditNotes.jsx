import React, { useState } from "react";
import TagInput from "../../Components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstances from "../../Utils/axiosinstance";

const AddEditNotes = ({
  noteData,
  type,
  getAllNotes,
  onClose,
  showToastMessage,
}) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);

  const [error, setError] = useState(null);

  //* Add new Note
  const addNewNote = async () => {
    try {
      const response = await axiosInstances.post("/add-note", {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        showToastMessage("Note Added Successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  //* Edit  Note
  const editNote = async () => {
    const noteId = noteData._id;

    try {
      const response = await axiosInstances.put("/edit-note/" + noteId, {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        showToastMessage("Note Updated Successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  //* Add Note
  const handleAddNote = () => {
    //* Validations
    if (!title) {
      setError("Please enter the title");
      return;
    }

    if (!content) {
      setError("Please enter the Content");
      return;
    }
    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative">
      <button
        className="w-10  h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-300"
        onClick={onClose}
      >
        <MdClose className="text-xl  text-slate-400" />
      </button>

      <div className=" flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className=" text-lg md:text-2xl text-slate-950 bg-slate-5 outline-none"
          placeholder="Go To Gym At 5"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">CONTENT</label>
        <textarea
          type="text"
          className="text-sm text-slate-950 outline-none  bg-slate-100 p-2 rounded"
          placeholder="Content"
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      <div className="mt-3">
        <label className="input-label">TAGS</label>

        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button
        onClick={handleAddNote}
        className="btn-primary font-medium mt-5 md:p-3  duration-500"
      >
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
};

export default AddEditNotes;
