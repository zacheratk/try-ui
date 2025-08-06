import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import supabase from "../API/client";
import MenuIcon from "../assets/menu.svg?react"
import "./MeatBallMenu.css"

export default function MeatballMenu({ postId }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const onDelete = async () => {
    await supabase.from("posts").delete().eq("id", postId);
    window.location = "/";
  };
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="meatball-menu" ref={menuRef}>
      <button
        className="meatball-btn"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Open menu"
      >
    <MenuIcon />
      </button>

      {open && (
        <div className="menu-dropdown">
          <Link
            to={`/edit/${postId}`}
            className="menu-item"
            onClick={() => setOpen(false)}
          >
            Edit
          </Link>
          <button onClick={onDelete} className="menu-item delete">
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
