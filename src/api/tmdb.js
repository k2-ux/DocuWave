import {TMDB_API_KEY, TMDB_BASE_URL} from '@env';

export async function fetchDocumentaryPage(page = 1) {
  const url = `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=99&page=${page}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`TMDB request failed: ${res.status}`);
  return res.json();
}
