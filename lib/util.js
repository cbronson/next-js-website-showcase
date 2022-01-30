export async function retryFetch(url, options = {}, retries = 3) {
  const res = await fetch(url, options);

  if (res.ok) {
    const json = await res.json();
    if (json.error) return retryOrThrow(url, options, retries);
    return json;
  }

  return retryOrThrow(url, options, retries);
}

function retryOrThrow(url, options, retries) {
  if (retries > 0) return retryFetch(url, options, retries - 1);
  throw new Error(res.statusText);
}
