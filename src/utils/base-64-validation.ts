export const isBase64 = (str: string): boolean => {
  const base64Pattern =
    /^data:image\/(?:png|jpeg|jpg|gif|webp);base64,[A-Za-z0-9+/=]+$/;
  return base64Pattern.test(str);
};
