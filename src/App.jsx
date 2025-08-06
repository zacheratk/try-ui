import Feed from "./Routes/Feed";
import CreatePost from "./Routes/CreatePost";
import About from "./Routes/About";
import PostView from "./Routes/PostView";
import { Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import NotFound from "./Routes/NotFound";
import EditPost from "./Routes/EditPost";

function App() {
  return (
    <>
      <header className="main-padding">
        <h1>Try UI</h1>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Feed</NavLink>
            </li>
            <li>
              <NavLink to="/create">Create Post</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <div className="line" />
      <main>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/about" element={<About />} />
          <Route path="/post/:id" element={<PostView />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
