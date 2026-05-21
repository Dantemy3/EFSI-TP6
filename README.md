# Instagram Clone — TP6 EFSI

Clon web de Instagram desarrollado con React, que consume imágenes de gatos desde [The Cat API](https://thecatapi.com/) y las presenta en un feed estilo red social.

**Diseño de Figma utilizado como referencia:**
[Instagram Web UI Recreated](https://www.figma.com/community/file/1004033523744290376)

---

## Organización del proyecto

```
src/
├── components/
│   ├── Header/
│   │   ├── Header.jsx
│   │   └── Header.css
│   ├── Sidebar/
│   │   ├── Sidebar.jsx
│   │   └── Sidebar.css
│   ├── Stories/
│   │   ├── Stories.jsx
│   │   └── Stories.css
│   ├── Feed/
│   │   ├── Feed.jsx
│   │   └── Feed.css
│   ├── PostCard/
│   │   ├── PostCard.jsx
│   │   └── PostCard.css
│   ├── PostModal/
│   │   ├── PostModal.jsx
│   │   └── PostModal.css
│   └── ProfilePage/
│       ├── ProfilePage.jsx
│       └── ProfilePage.css
├── data/
│   └── userData.js
├── App.jsx
├── App.css
└── index.css
```

---

## Componentes

### `Header`
Barra superior fija que contiene el logo de Instagram, un campo de busqueda y botones de acción (configuración, cámara, mensajes y nuevo post). Recibe `onNavigate` y `currentView` como props para manejar la navegación.

Se separó en su propio componente porque es una pieza visual independiente, siempre visible, y no depende del estado del feed ni del perfil.

### `Sidebar`
Panel lateral izquierdo que muestra el perfil del usuario logueado (avatar, nombre, handle, seguidores y seguidos) y el menú de navegación principal (Home, Explore, Reels, IGTV, Notification, Profile). Recibe `user`, `currentView` y `onNavigate` como props.

Agrupa la identidad del usuario y la navegación en un único componente lateral, tal como lo hace el diseño de Figma. Al recibir `currentView`, puede resaltar el ítem activo sin manejar estado propio.

### `Stories`
Sección horizontal de historias con avatares circulares con borde degradado. Recibe el array `stories` como prop y renderiza un `StoryItem` por cada historia.

Las stories son una sección visualmente diferenciada del feed. Separarlas permite reutilizarlas o modificarlas sin tocar el feed.

### `Feed`
Grilla de 3 columnas que renderiza las publicaciones. Recibe `posts`, `onSelectPost` y `loading` como props. Mientras carga, muestra un skeleton animado. Delega el renderizado individual a `PostCard`.

El feed es el contenedor lógico de las publicaciones. Separarlo de `App` mantiene `App` limpio y permite que `Feed` maneje su propia presentación (loading, grid, título).

### `PostCard`
Tarjeta individual de publicación. Muestra la imagen, el avatar y username del autor, y botones de like, comentario y compartir. Maneja su propio estado de like con `useState`. Recibe `post` y `onSelect` como props.

Es la unidad mínima reutilizable del feed. Al manejar el estado de like localmente, cada tarjeta es independiente. Recibe `onSelect` para delegar la apertura del modal al componente padre.

### `PostModal`
Ventana emergente (modal) que muestra una publicación en detalle: imagen ampliada, usuario, fecha, caption, comentarios, botones de interacción y formulario para agregar comentarios. Maneja estado de like, guardado y lista de comentarios con `useState`. Cierra con la tecla Escape o haciendo clic fuera.

La visualización individual requiere más información y espacio que una tarjeta del feed. Un modal permite mostrar ese detalle sin cambiar de vista, manteniendo el contexto del feed visible detrás.

### `ProfilePage`
Vista completa del perfil del usuario logueado. Muestra avatar, nombre, handle, estadísticas (publicaciones, seguidores, seguidos), biografía, botón de editar perfil y una grilla de publicaciones con tabs (Publicaciones, Guardados, Etiquetados). Al hacer clic en una publicación abre el `PostModal`. Recibe `user` y `posts` como props.

El perfil es una vista completamente diferente al feed. Separarla en su propio componente permite que `App` simplemente decida qué vista renderizar según `currentView`, sin mezclar lógica de perfil con lógica de feed.

---

## Comunicación entre componentes mediante props

```
App
├── Header        ← onNavigate, currentView
├── Sidebar       ← user, currentView, onNavigate
├── Stories       ← stories
├── Feed          ← posts, onSelectPost, loading
│   └── PostCard  ← post, onSelect
├── PostModal     ← post, onClose
└── ProfilePage   ← user, posts
    └── PostModal ← post, onClose
```

El estado principal (`posts`, `selectedPost`, `currentView`) vive en `App` y se distribuye hacia abajo mediante props. Los eventos del usuario (seleccionar un post, navegar) suben mediante callbacks (`onSelect`, `onNavigate`).

---

## Hooks utilizados

| Hook | Dónde | Para qué |
|------|-------|----------|
| `useState` | `App` | Guardar `posts`, `selectedPost`, `currentView`, `loading` |
| `useEffect` | `App` | Realizar la petición a la API al montar el componente |
| `useState` | `PostCard` | Manejar el estado de like individual de cada tarjeta |
| `useState` | `PostModal` | Manejar like, guardado, lista de comentarios y nuevo comentario |
| `useEffect` | `PostModal` | Escuchar la tecla Escape y bloquear el scroll del body |
| `useState` | `ProfilePage` | Manejar el post seleccionado y el tab activo |

---

## Consumo de API

Se utiliza **Axios** para consumir [The Cat API](https://api.thecatapi.com/v1/images/search) con un límite de 12 imágenes. La petición se realiza en `useEffect` al montar `App`. Si la API principal falla, se usa [Cataas](https://cataas.com/) como fallback.

Cada imagen obtenida se combina con datos simulados (username, avatar, caption, likes, comentarios, fecha) para construir el objeto `post` completo.

---

## Visualización individual de publicaciones

Se resolvió mediante un **modal** (`PostModal`). Al hacer clic en cualquier `PostCard` del feed o en cualquier imagen del perfil, se actualiza el estado `selectedPost` en el componente padre, lo que renderiza el `PostModal` con la información completa del post seleccionado.

El modal muestra:
- Imagen ampliada 
- Nombre de usuario y fecha
- Caption
- Lista de comentarios (con posibilidad de agregar nuevos)
- Cantidad de likes (interactivo)
- Botones de like, comentario, compartir y guardar

---

## Perfil de usuario emulado

El perfil está definido en `src/data/userData.js` como un objeto estático `currentUser`. No hay sistema de login ni registro. La aplicación asume que el usuario ya está logueado.

Datos del perfil:
- `username` y `displayName`
- `handle` (@gato_lover)
- `bio` (biografía breve)
- `followers` y `following`
- `posts` (cantidad)
- `avatar` (imagen desde Cataas)

El perfil se accede desde el menú lateral haciendo clic en "Profile".

---

## Estados para selección de publicaciones

| Estado | Tipo | Descripción |
|--------|------|-------------|
| `selectedPost` | `object \| null` | Post actualmente seleccionado. Si es `null`, el modal no se muestra. |
| `currentView` | `string` | Vista activa: `"home"` o `"profile"`. Controla qué renderiza `App`. |
| `liked` | `boolean` | Estado de like en `PostCard` y `PostModal` (local a cada instancia). |
| `activeTab` | `string` | Tab activo en `ProfilePage`: `"posts"`, `"saved"` o `"tagged"`. |

---

## Instrucciones de ejecución

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build de producción
npm run build
```

Requiere Node.js 18+ y npm 9+.
