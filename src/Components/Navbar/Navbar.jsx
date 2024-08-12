import React, { useState } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuerry, setSearchQuerry] = useState("");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuerry) {
      onSearchNote(searchQuerry);
    }
  };

  const onClearSearch = () => {
    setSearchQuerry("");
    handleClearSearch();
  };

  return (
    <header className="bg-white flex  items-center  justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl  font-medium text-black py-2 ">Notes</h2>

      <SearchBar
        value={searchQuerry}
        onChange={({ target }) => {
          setSearchQuerry(target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />

      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </header>
  );
};

export default Navbar;
