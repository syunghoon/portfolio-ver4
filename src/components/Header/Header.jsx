import { Link } from "react-router-dom";

import "./header.css";

function Header() {
  return (
    <header className="site-header">
      <div className="site-header__container">
        <div className="site-header__left">
          <Link to="/" className="site-header__brand" aria-label="Go to home">
            <h4 className="site-header__brand-name">Shane Ohmuni</h4>
          </Link>

          <nav className="site-header__nav" aria-label="Primary navigation">
            <Link to="/projects" className="site-header__link">
              Projects
            </Link>
            <Link to="/Lab" className="site-header__link">
              Lab
            </Link>
            <Link to="/Blog" className="site-header__link">
              Blog
            </Link>
            <Link to="/posts/0000-ABOUT" className="site-header__link">
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
