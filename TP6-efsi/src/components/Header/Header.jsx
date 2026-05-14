import "./Header.css";

function Header({ onNavigate, currentView }) {
  return (
    <header className="header">
      <div className="header__logo">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="2" />
          <circle cx="17.5" cy="6.5" r="1.5" fill="white" />
        </svg>
        <span className="header__logo-text">Instagram</span>
      </div>

      <div className="header__search">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="8" stroke="#aaa" strokeWidth="2" />
          <path d="M21 21l-4.35-4.35" stroke="#aaa" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          placeholder="Username, hashtag and story search"
          className="header__search-input"
          aria-label="Search"
        />
      </div>

      <div className="header__actions">
        <button className="header__icon-btn" aria-label="Settings">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="white" strokeWidth="2" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="white" strokeWidth="2" />
          </svg>
        </button>
        <button className="header__icon-btn" aria-label="Camera">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" stroke="white" strokeWidth="2" />
            <circle cx="12" cy="13" r="4" stroke="white" strokeWidth="2" />
          </svg>
        </button>
        <button className="header__icon-btn" aria-label="Messages">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M22 2L15 22l-4-9-9-4 20-7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          className="header__new-post-btn"
          onClick={() => onNavigate && onNavigate("home")}
          aria-label="New Post"
        >
          <span>+</span> New Post
        </button>
      </div>
    </header>
  );
}

export default Header;
