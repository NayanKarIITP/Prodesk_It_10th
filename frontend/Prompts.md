Prompt 1: Modern UI/UX Overhaul
"Refactor the App.css to implement a Modern Glassmorphism Dashboard. Use a 2-column CSS Grid: Sidebar fixed at 350px and Main Content scaling at 1fr.

Styling: Apply a soft gradient background (linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)), rounded corners (20px), and backdrop-filter: blur(10px) on all cards.

Interactivity: Add hover-state transformations to .post-card (scaling/shadows) and style the 'Publish' button to show a loading state when isUploading is true."

Prompt 2: Defensive Data Mapping (Author Name Fix)
"In the React posts.map() and topPosts.map() functions, write robust display logic for author names to handle inconsistent backend data.

Logic: Use optional chaining to check for both post.authorId?.name (standard find) and post.author?.name (aggregation result).

Fallback: If neither exists, default to 'Community Member'. This ensures the 'Member' placeholder is replaced by actual names in both the Feed and Trending sections."

Prompt 3: Optimistic Delete Feature
"Implement a handleDeletePost(id) function in App.js.

Request: Use the fetch API with the DELETE method to ${API}/posts/${id}.

UX Pattern: Apply Optimistic UI updates. Use .filter() to remove the post from the local posts state immediately upon clicking. Alert the user only if the server request fails.

UI: Add a floating trash icon (🗑️) button overlay on the top-right of each post image, visible only on card hover."

Prompt 4: Senior-Level React Optimization
"Refactor the data-fetching architecture in App.js to eliminate ESLint dependency warnings and prevent infinite re-renders.

Action: Wrap the fetchUsers, fetchPosts, and fetchTopPosts functions in useCallback hooks.

Goal: Memoize these functions so they remain stable when passed into the useEffect dependency array. Add an isUploading state check to the submit button to prevent duplicate form submissions."