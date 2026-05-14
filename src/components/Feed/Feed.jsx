import PostCard from "../PostCard/PostCard";
import "./Feed.css";

function Feed({ posts, onSelectPost, loading }) {
  if (loading) {
    return (
      <div className="feed__loading" aria-live="polite" aria-busy="true">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="feed__skeleton" aria-hidden="true" />
        ))}
      </div>
    );
  }

  return (
    <section className="feed" aria-label="Feed de publicaciones">
      <h2 className="feed__title">TRENDiNG</h2>
      <div className="feed__grid">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onSelect={onSelectPost} />
        ))}
      </div>
    </section>
  );
}

export default Feed;
