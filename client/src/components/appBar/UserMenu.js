import React from "react";
import { Link } from "react-router-dom";

export const UserMenu = ({ isAdmin }) => {
  return (
    <div className="userMenu">
      <ul>
        <li>
          <Link to="/setting">SETTING</Link>
        </li>
        {isAdmin && (
          <li>
            <Link to="/create-post">ADD POST</Link>
          </li>
        )}
        <li onClick={() => {}}>LOGOUT</li>
      </ul>
    </div>
  );
};
