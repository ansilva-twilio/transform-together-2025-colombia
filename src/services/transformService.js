// services/trans.js
const FUNCTION_URL = "https://tt-colombia-2025-7160.twil.io/fetch_info.js"; 
const USERNAME = "tt2025";
const PASSWORD = "2XT8P3Y7VL"; 

export async function getInfo() {
  const headers = new Headers();
  headers.set(
    "Authorization",
    "Basic " + btoa(`${USERNAME}:${PASSWORD}`)
  );

  const response = await fetch(FUNCTION_URL, {
    method: "GET",
    headers
  });

  if (!response.ok) {
    throw new Error(`Error fetching Info: ${response.status}`);
  }

  return response.json();
}