import "./Stories.css";

function StoryItem({ story }) {
  return (
    <div className="story-item">
      <div className="story-item__avatar-ring">
        <img
          src={story.avatar}
          alt={story.username}
          className="story-item__avatar"
          loading="lazy"
        />
      </div>
      <span className="story-item__username">{story.username}</span>
    </div>
  );
}

function Stories({ stories }) {
  return (
    <section className="stories" aria-label="Stories">
      <h2 className="stories__title">STORiES</h2>
      <div className="stories__list">
        {stories.map((story) => (
          <StoryItem key={story.id} story={story} />
        ))}
        <button className="stories__arrow" aria-label="Ver más stories">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}

export default Stories;
