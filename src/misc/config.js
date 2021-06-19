const API_BASED_URL = 'https://api.tvmaze.com';

export async function apiget(queryStrings) {
  const response = await fetch(`${API_BASED_URL}${queryStrings}`).then(r =>
    r.json()
  );
  return response;
}
