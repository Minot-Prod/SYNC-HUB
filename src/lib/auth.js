export function checkAuth(req) {
  const cookie = req.headers.cookie || "";
  const match = cookie.match(/sync_token=([^;]+)/);
  return !!match;
}

