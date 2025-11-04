import { Link, NavLink } from "react-router-dom";

import "./header.css";

function Header() {
  const getNavLinkClass = ({ isActive }) =>
    `site-header__link${isActive ? " site-header__link--active" : ""}`;

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
            <NavLink to="/projects" className={getNavLinkClass}>
              Projects
            </NavLink>
            <NavLink to="/lab" className={getNavLinkClass}>
              Lab
            </NavLink>
            <NavLink to="/blog" className={getNavLinkClass}>
              Blog
            </NavLink>

            <NavLink to="/posts/0000-ABOUT" className={getNavLinkClass}>
              About
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
