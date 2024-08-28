export function convertBase64ToImageUrl(base64String: string) {
  if (!base64String) {
    throw new Error("Base64 string is required.");
  }

  let mimeType = "";
  if (base64String.startsWith("/9j/")) {
    mimeType = "image/jpeg";
  } else if (base64String.startsWith("iVBOR")) {
    mimeType = "image/png";
  } else {
    mimeType = "image/jpeg";
  }

  return `data:${mimeType};base64,${base64String}`;
}
