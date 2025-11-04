import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Lab from "./pages/Lab";
import Blog from "./pages/Blog";
import Post from "./pages/Posts";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Header />

      <main className="page-content">
        <div className="page-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/lab" element={<Lab />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/posts/:slug" element={<Post />} />
          </Routes>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
