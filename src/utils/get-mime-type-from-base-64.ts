export const getMimeTypeFromBase64 = (base64: string): string => {
  const base64Data = base64.replace(/^data:(.+?);base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");

  if (buffer.length >= 4) {
    const header = buffer.toString("hex", 0, 4);

    if (header.startsWith("ffd8")) return "image/jpeg"; // JPEG
    if (header.startsWith("8950")) return "image/png"; // PNG
    if (header.startsWith("4749")) return "image/gif"; // GIF
    if (header.startsWith("424d")) return "image/bmp"; // BMP
  }

  return "application/octet-stream";
};
