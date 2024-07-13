// @ts-nocheck
import Cookies from 'js-cookie';
const env = import.meta.env.VITE_ENV

export async function csrfFetch(url, options = {}) {
  // set options.method to 'GET' if there is no method
  options.method = options.method || 'GET';
  // set options.headers to an empty object if there is no headers
  options.headers = options.headers || {};

  options.credentials = 'include';
  // if the options.method is not 'GET', then set the "Content-Type" header to
  // "application/json", and set the "XSRF-TOKEN" header to the value of the
  // "XSRF-TOKEN" cookie
  if (options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] =
    options.headers['Content-Type'] || 'application/json';
    options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
  }
  if (env === "production") {
    try {
      const res = await fetch("https://dimension-1.onrender.com" + url, options);
      return res;
    } catch (e) {
      throw new Error(e.message);
    }
  }
  // call the default window's fetch with the url and the options passed in
  try {
    const res = await window.fetch(url, options);
    // if the response status code is 400 or above, then throw an error with the
    // error being the response
    // if (res.status >= 400) throw res;

    // if the response status code is under 400, then return the response to the
    // next promise chain
    return res;
  } catch (e) {
    throw new Error(e.message)
  }

}

export function restoreCSRF() {
  return csrfFetch('/api/csrf/restore');
}