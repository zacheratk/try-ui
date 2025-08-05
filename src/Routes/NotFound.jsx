import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <p>Uh oh! We couldn't find that page.</p>
      <NavLink to="/">
        <button>Go back to home</button>
      </NavLink>
    </>
  );
};

export default NotFound;
