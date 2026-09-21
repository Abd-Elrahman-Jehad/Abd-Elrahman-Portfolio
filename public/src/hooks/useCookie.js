// Persistence helper: tries localStorage first (works when the file is opened
// directly via file://, which cookies cannot do there), and falls back to a
// cookie (works once the site is hosted on a real domain, and in sandboxed
// preview frames that block localStorage but allow cookies). Between the two,
// this covers every way someone might actually open this project.
export function getCookie(name) {
  try {
    const fromStorage = window.localStorage.getItem(name);
    if (fromStorage !== null) return fromStorage;
  } catch (e) {
    /* localStorage unavailable — fall through to cookie */
  }
  try {
    const match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
    return match ? decodeURIComponent(match[1]) : null;
  } catch (e) {
    return null;
  }
}

export function setCookie(name, value, days = 365) {
  try {
    window.localStorage.setItem(name, value);
  } catch (e) {
    /* ignore */
  }
  try {
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${days * 24 * 60 * 60}`;
  } catch (e) {
    /* ignore */
  }
}
