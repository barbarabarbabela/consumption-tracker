// utils/convert-image-to-base-64.ts
export const base64Encode = (buffer: Buffer): string => {
  return buffer.toString("base64");
};
