import React from "react";
import { CiSearch, CiBellOn } from "react-icons/ci";
import avatar from "../../images/prakash.jpg"
import UserPool from "../../State/UserPool";

const Navbar = () => {
  const user = UserPool.getCurrentUser();
  return (
    <div className="navbar">
      <div className="navbar-items">
        <input className="search-input" />
        <CiSearch className="navbar-icon" />
      </div>
      <div className="navbar-items">
        <CiBellOn className="navbar-icon" />
        <img src={avatar} alt="avatar" className="avatar" />
        <p>Hello, {user?.storage.name || ''}</p>
      </div>
    </div>
  );
};

export default Navbar;
