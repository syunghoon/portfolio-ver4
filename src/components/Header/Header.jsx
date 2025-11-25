import { Link, NavLink } from "react-router-dom";

import "./Header.css";

function Header() {
  return (
    <header className="site-header">
      <div className="site-header__container">
        <div className="site-header__left">
          <Link to="/" className="site-header__brand" aria-label="Go to home">
            <h4 className="site-header__brand-name">Sung-Hoon Cho</h4>
          </Link>
        </div>

        <div className="site-header__right">
          <nav className="site-header__nav" aria-label="Primary navigation">
            <NavLink to="/projects" className="site-header__link">
              Projects
            </NavLink>
            <NavLink to="/lab" className="site-header__link">
              Lab
            </NavLink>
            <NavLink to="/blog" className="site-header__link">
              Blog
            </NavLink>

            <NavLink to="/posts/0000-ABOUT" className="site-header__link">
              About
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
