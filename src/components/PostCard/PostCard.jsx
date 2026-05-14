import { useState } from "react";
import "./PostCard.css";

function PostCard({ post, onSelect }) {
  const [liked, setLiked] = useState(false);

  function handleLike(e) {
    e.stopPropagation();
    setLiked((prev) => !prev);
  }

  return (
    <article
      className="post-card"
      onClick={() => onSelect(post)}
      role="button"
      tabIndex={0}
      aria-label={`Ver publicación de ${post.username}`}
      onKeyDown={(e) => e.key === "Enter" && onSelect(post)}
    >
      <div className="post-card__image-wrapper">
        <img
          src={post.imageUrl}
          alt={`Publicación de ${post.username}`}
          className="post-card__image"
          loading="lazy"
        />
      </div>

      <div className="post-card__footer">
        <div className="post-card__user">
          <img
            src={post.avatarUrl}
            alt={post.username}
            className="post-card__avatar"
          />
          <span className="post-card__username">{post.username}</span>
        </div>

        <div className="post-card__actions">
          <button
            className={`post-card__action-btn ${liked ? "post-card__action-btn--liked" : ""}`}
            onClick={handleLike}
            aria-label={liked ? "Quitar like" : "Dar like"}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill={liked ? "#e1306c" : "none"}>
              <path
                d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                stroke={liked ? "#e1306c" : "white"}
                strokeWidth="2"
              />
            </svg>
          </button>

          <button
            className="post-card__action-btn"
            onClick={(e) => { e.stopPropagation(); onSelect(post); }}
            aria-label="Comentar"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            className="post-card__action-btn"
            onClick={(e) => e.stopPropagation()}
            aria-label="Compartir"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path d="M22 2L15 22l-4-9-9-4 20-7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}

export default PostCard;
