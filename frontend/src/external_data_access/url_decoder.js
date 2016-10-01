
export function decodeAmpersand(url) {
  return url.replace(/&amp;/g, '&');
}

export default { decodeAmpersand };
