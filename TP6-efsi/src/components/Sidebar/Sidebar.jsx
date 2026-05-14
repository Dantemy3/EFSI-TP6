import "./Sidebar.css";

function Sidebar({ user, currentView, onNavigate }) {
  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: "explore",
      label: "Explore",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: "reels",
      label: "Reels",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="2" />
          <path d="M2 8h20M8 2v6M16 2v6" stroke="currentColor" strokeWidth="2" />
          <path d="M10 13l5 3-5 3v-6z" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: "igtv",
      label: "IGTV",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2" />
          <path d="M8 9l8 3-8 3V9z" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: "notifications",
      label: "Notification",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: "profile",
      label: "Profile",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <div className="sidebar__avatar-wrapper">
          <img
            src={user.avatar}
            alt={user.displayName}
            className="sidebar__avatar"
          />
        </div>
        <h2 className="sidebar__name">
          {user.displayName}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#3b82f6" aria-label="Verified">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#3b82f6" strokeWidth="2" fill="none" />
            <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </h2>
        <p className="sidebar__handle">{user.handle}</p>

        <div className="sidebar__stats">
          <div className="sidebar__stat">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="white" strokeWidth="2" />
              <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="2" />
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="white" strokeWidth="2" />
            </svg>
            <span>{user.followers}</span>
          </div>
          <div className="sidebar__stat sidebar__stat--likes">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#e1306c">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
            <span>{user.following}</span>
          </div>
        </div>
      </div>

      <nav className="sidebar__nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar__nav-item ${currentView === item.id ? "sidebar__nav-item--active" : ""}`}
            onClick={() => onNavigate(item.id)}
            aria-current={currentView === item.id ? "page" : undefined}
          >
            <span className="sidebar__nav-icon">{item.icon}</span>
            <span className="sidebar__nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
