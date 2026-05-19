import { useState, useEffect } from "react";
import { fetchCatImages } from "./api";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Stories from "./components/Stories/Stories";
import Feed from "./components/Feed/Feed";
import PostModal from "./components/PostModal/PostModal";
import ProfilePage from "./components/ProfilePage/ProfilePage";

import { currentUser, storyUsers, captions, commentSets } from "./data/userData";
import "./App.css";

// Nombres de usuario simulados para los posts
const POST_USERNAMES = [
  "@michi_01", "@gatito_02", "@felino_03", "@neko_04",
  "@kitty_05", "@paws_06", "@whisker_07", "@gato_lover",
  "@felino_08", "@neko_09", "@kitty_10", "@michi_11",
];

const DATES = [
  "Hace 2 horas", "Hace 5 horas", "Ayer", "Hace 2 días",
  "Hace 3 días", "Hace 4 días", "Hace 1 semana", "Hace 2 semanas",
  "Hace 3 semanas", "Hace 1 mes", "Hace 2 meses", "Hace 3 meses",
];

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentView, setCurrentView] = useState("home");

  useEffect(() => {
    async function fetchCats() {
      try {
        setLoading(true);
        const cats = await fetchCatImages(12);

        // Obtenemos avatares para los posts desde Cataas
        const avatarUrls = POST_USERNAMES.map(
          (_, i) => `https://cataas.com/cat?width=40&height=40&i=${i}`
        );

        const formattedPosts = cats.map((cat, index) => ({
          id: cat.id,
          imageUrl: cat.url,
          username: POST_USERNAMES[index % POST_USERNAMES.length],
          avatarUrl: avatarUrls[index % avatarUrls.length],
          caption: captions[index % captions.length],
          likes: Math.floor(Math.random() * 9000) + 500,
          comments: commentSets[index % commentSets.length],
          date: DATES[index % DATES.length],
        }));

        setPosts(formattedPosts);
      } catch (error) {
        console.error("Error al obtener imágenes de gatos:", error);
        // Fallback con Cataas si The Cat API falla
        try {
          const fallbackPosts = Array.from({ length: 12 }, (_, index) => ({
            id: `cat-${index}`,
            imageUrl: `https://cataas.com/cat?width=400&height=400&i=${index}`,
            username: POST_USERNAMES[index % POST_USERNAMES.length],
            avatarUrl: `https://cataas.com/cat?width=40&height=40&i=${index + 20}`,
            caption: captions[index % captions.length],
            likes: Math.floor(Math.random() * 9000) + 500,
            comments: commentSets[index % commentSets.length],
            date: DATES[index % DATES.length],
          }));
          setPosts(fallbackPosts);
        } catch (fallbackError) {
          console.error("Error en fallback:", fallbackError);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchCats();
  }, []);

  function handleNavigate(view) {
    setCurrentView(view);
    setSelectedPost(null);
  }

  return (
    <div className="app">
      <Header onNavigate={handleNavigate} currentView={currentView} />

      <div className="app__body">
        <Sidebar
          user={currentUser}
          currentView={currentView}
          onNavigate={handleNavigate}
        />

        <main className="app__main">
          {currentView === "profile" ? (
            <ProfilePage user={currentUser} posts={posts} />
          ) : (
            <>
              <Stories stories={storyUsers} />
              <Feed
                posts={posts}
                onSelectPost={setSelectedPost}
                loading={loading}
              />
            </>
          )}
        </main>
      </div>

      {selectedPost && (
        <PostModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
}

export default App;
