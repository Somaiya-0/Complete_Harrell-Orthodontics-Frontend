/**
 * Tries a real API call; if it fails (backend not running/seeded yet),
 * resolves with the given mock data instead so pages always render
 * complete content. Swap to `strict: true` per-call once the backend
 * is live if you want failures to surface instead of masking them.
 */
export async function withFallback(apiCall, mockValue) {
  try {
    const res = await apiCall();
    const data = res.data;
    // DRF pagination returns {results: [...]}; unwrap when present.
    if (data && Array.isArray(data.results)) {
  return data.results.length ? data.results : mockValue;
}

return data && Array.isArray(data) && data.length ? data : mockValue;
  } catch (err) {
    return mockValue;
  }
}
