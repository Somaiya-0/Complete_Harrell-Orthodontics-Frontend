/**
 * Tries a real API call; if it fails, returns mock data.
 */
export async function withFallback(apiCall, mockValue) {
  try {
    const res = await apiCall();
    const data = res.data;

    // DRF paginated response
    if (data && Array.isArray(data.results)) {
      return data.results.length ? data.results : mockValue;
    }

    // Plain array response
    if (Array.isArray(data)) {
      return data.length ? data : mockValue;
    }

    // Plain object response (dashboard stats, etc.)
    if (data && typeof data === "object") {
      return data;
    }

    return mockValue;
  } catch (err) {
    return mockValue;
  }
}