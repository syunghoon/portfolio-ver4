import { Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Lab from "./pages/Lab";
import Blog from "./pages/Blog";
import Post from "./pages/Post";

function App() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">Home</Link> | <Link to="/projects">Projects</Link> |{" "}
          <Link to="/lab">Lab</Link> | <Link to="/blog">Blog</Link> |{" "}
          <Link to="/post/0000-ABOUT">About</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/lab" element={<Lab />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/post/:slug" element={<Post />} />
      </Routes>
    </>
  );
}

export default App;
