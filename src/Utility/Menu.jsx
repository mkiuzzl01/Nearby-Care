import React from "react";
import { NavLink } from "react-router-dom";

const Menu = ({ link, name }) => {
  return (
    <li>
      <NavLink
        end
        to={link}
        className={({ isActive }) =>
          isActive ? " text-[#f1f141]" : " hover:text-green-400 rounded-lg"
        }
      >
        {name}
      </NavLink>
    </li>
  );
};

export default Menu;
