import { useState, useEffect } from "react";
import "./PostModal.css";

function PostModal({ post, onClose }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [saved, setSaved] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(post.comments);

  // Cerrar con Escape
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Bloquear scroll del body
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  function handleLike() {
    setLiked((prev) => {
      setLikeCount((c) => (prev ? c - 1 : c + 1));
      return !prev;
    });
  }

  function handleAddComment(e) {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments((prev) => [
      ...prev,
      { user: "@gato_lover", text: newComment.trim() },
    ]);
    setNewComment("");
  }

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Publicación detallada"
    >
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Imagen */}
        <div className="modal__image-side">
          <img
            src={post.imageUrl}
            alt={`Publicación de ${post.username}`}
            className="modal__image"
          />
        </div>

        {/* Contenido */}
        <div className="modal__content-side">
          {/* Header del post */}
          <div className="modal__post-header">
            <img
              src={post.avatarUrl}
              alt={post.username}
              className="modal__avatar"
            />
            <div className="modal__user-info">
              <span className="modal__username">{post.username}</span>
              <span className="modal__date">{post.date}</span>
            </div>
            <button
              className="modal__close-btn"
              onClick={onClose}
              aria-label="Cerrar"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Caption */}
          <div className="modal__caption">
            <span className="modal__caption-user">{post.username}</span>
            <span className="modal__caption-text"> {post.caption}</span>
          </div>

          {/* Comentarios */}
          <div className="modal__comments">
            {comments.map((comment, i) => (
              <div key={i} className="modal__comment">
                <span className="modal__comment-user">{comment.user}</span>
                <span className="modal__comment-text"> {comment.text}</span>
              </div>
            ))}
          </div>

          {/* Acciones */}
          <div className="modal__actions">
            <div className="modal__action-buttons">
              <button
                className={`modal__action-btn ${liked ? "modal__action-btn--liked" : ""}`}
                onClick={handleLike}
                aria-label={liked ? "Quitar like" : "Dar like"}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill={liked ? "#e1306c" : "none"}>
                  <path
                    d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                    stroke={liked ? "#e1306c" : "white"}
                    strokeWidth="2"
                  />
                </svg>
              </button>

              <button className="modal__action-btn" aria-label="Comentar">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                </svg>
              </button>

              <button className="modal__action-btn" aria-label="Compartir">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <path d="M22 2L15 22l-4-9-9-4 20-7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <button
                className={`modal__action-btn modal__action-btn--save ${saved ? "modal__action-btn--saved" : ""}`}
                onClick={() => setSaved((p) => !p)}
                aria-label={saved ? "Quitar guardado" : "Guardar"}
                style={{ marginLeft: "auto" }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill={saved ? "white" : "none"}>
                  <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div className="modal__likes">
              <strong>{likeCount.toLocaleString()} likes</strong>
            </div>
          </div>

          {/* Agregar comentario */}
          <form className="modal__add-comment" onSubmit={handleAddComment}>
            <input
              type="text"
              placeholder="Agregar un comentario..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="modal__comment-input"
              aria-label="Agregar comentario"
            />
            <button
              type="submit"
              className="modal__comment-submit"
              disabled={!newComment.trim()}
              aria-label="Publicar comentario"
            >
              Publicar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostModal;
