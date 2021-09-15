import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div data-testid="nav">
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link data-testid="nav-button" to="/character-creation">
        <button>Character Creation</button>
      </Link>
      <Link data-testid="nav-button" to="/all-characters">
        <button>View All Characters</button>
      </Link>
    </div>
  );
}

export default Navbar;
