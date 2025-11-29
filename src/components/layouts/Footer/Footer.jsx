import "./Footer.css";
import githubIcon from "/assets/github.svg";
import instagramIcon from "/assets/instagram.svg";
import linkedinIcon from "/assets/linkedin.svg";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__container">
        <div className="site-footer__meta">
          <p>Designed and Developed by SH Cho 2025</p>
        </div>

        <div className="site-footer__social" aria-label="Social links">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="site-footer__social-link"
          >
            <img src={instagramIcon} alt="Instagram" width="24" height="24" />
          </a>
          <a
            href="https://github.com/syunghoon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="site-footer__social-link"
          >
            <img src={githubIcon} alt="GitHub" width="24" height="24" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="site-footer__social-link"
          >
            <img src={linkedinIcon} alt="LinkedIn" width="24" height="24" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
