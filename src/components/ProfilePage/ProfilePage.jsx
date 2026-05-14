import { useState } from "react";
import PostModal from "../PostModal/PostModal";
import "./ProfilePage.css";

function ProfilePage({ user, posts }) {
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div className="profile-page">
      {/* Header del perfil */}
      <div className="profile-page__header">
        <div className="profile-page__avatar-wrapper">
          <img
            src={user.avatar}
            alt={user.displayName}
            className="profile-page__avatar"
          />
        </div>

        <div className="profile-page__info">
          <div className="profile-page__name-row">
            <h1 className="profile-page__username">{user.handle}</h1>
            <button className="profile-page__edit-btn">Editar perfil</button>
            <button className="profile-page__settings-btn" aria-label="Configuración">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="white" strokeWidth="2" />
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="white" strokeWidth="2" />
              </svg>
            </button>
          </div>

          <div className="profile-page__stats">
            <div className="profile-page__stat">
              <strong>{user.posts}</strong>
              <span>publicaciones</span>
            </div>
            <div className="profile-page__stat">
              <strong>{user.followers}</strong>
              <span>seguidores</span>
            </div>
            <div className="profile-page__stat">
              <strong>{user.following}</strong>
              <span>seguidos</span>
            </div>
          </div>

          <div className="profile-page__bio">
            <p className="profile-page__display-name">{user.displayName}</p>
            <p className="profile-page__bio-text">{user.bio}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="profile-page__tabs">
        <button
          className={`profile-page__tab ${activeTab === "posts" ? "profile-page__tab--active" : ""}`}
          onClick={() => setActiveTab("posts")}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" />
            <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2" />
            <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" />
            <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2" />
          </svg>
          Publicaciones
        </button>
        <button
          className={`profile-page__tab ${activeTab === "saved" ? "profile-page__tab--active" : ""}`}
          onClick={() => setActiveTab("saved")}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          </svg>
          Guardados
        </button>
        <button
          className={`profile-page__tab ${activeTab === "tagged" ? "profile-page__tab--active" : ""}`}
          onClick={() => setActiveTab("tagged")}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            <line x1="7" y1="7" x2="7.01" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Etiquetados
        </button>
      </div>

      {/* Grid de posts */}
      {activeTab === "posts" && (
        <div className="profile-page__grid">
          {posts.map((post) => (
            <button
              key={post.id}
              className="profile-page__grid-item"
              onClick={() => setSelectedPost(post)}
              aria-label={`Ver publicación de ${post.username}`}
            >
              <img
                src={post.imageUrl}
                alt={`Publicación de ${post.username}`}
                className="profile-page__grid-img"
                loading="lazy"
              />
              <div className="profile-page__grid-overlay">
                <span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                  {post.likes}
                </span>
                <span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="white" strokeWidth="2" fill="white" />
                  </svg>
                  {post.comments.length}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {activeTab === "saved" && (
        <div className="profile-page__empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" stroke="#555" strokeWidth="2" strokeLinejoin="round" />
          </svg>
          <p>No hay publicaciones guardadas</p>
        </div>
      )}

      {activeTab === "tagged" && (
        <div className="profile-page__empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" stroke="#555" strokeWidth="2" strokeLinejoin="round" />
          </svg>
          <p>No hay publicaciones etiquetadas</p>
        </div>
      )}

      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
}

export default ProfilePage;
