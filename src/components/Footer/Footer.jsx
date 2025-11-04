import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__container">
        <div className="site-footer__meta">
          <p>Designed and developed by Shawn Cho 2025</p>
        </div>

        <div className="site-footer__social" aria-label="Social links">
          {/* <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="site-footer__social-link"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              role="img"
              aria-hidden="true"
            >
              <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3a5.25 5.25 0 1 1 0 10.5a5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5zM17.5 6a1 1 0 1 1 0 2a1 1 0 0 1 0-2z" />
            </svg>
          </a> */}
          <a
            href="https://github.com/syunghoon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="site-footer__social-link"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              role="img"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2a10 10 0 0 0-3.162 19.49c.5.09.683-.217.683-.483c0-.237-.008-.868-.013-1.703c-2.782.604-3.37-1.34-3.37-1.34c-.454-1.154-1.11-1.462-1.11-1.462c-.907-.62.069-.607.069-.607c1.003.07 1.53 1.03 1.53 1.03c.89 1.524 2.34 1.084 2.91.83c.092-.645.348-1.084.634-1.334c-2.22-.253-4.555-1.112-4.555-4.945c0-1.092.39-1.985 1.029-2.684c-.103-.253-.447-1.272.098-2.65c0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.53 9.53 0 0 1 2.504.336c1.91-1.294 2.748-1.025 2.748-1.025c.547 1.378.203 2.397.1 2.65a3.783 3.783 0 0 1 1.028 2.684c0 3.842-2.337 4.69-4.566 4.94c.358.308.678.916.678 1.846c0 1.334-.012 2.41-.012 2.738c0 .267.18.577.688.479A10.002 10.002 0 0 0 12 2Z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
