export const validateBase64 = (str: string): boolean => {
  const base64Pattern =
    /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
  return base64Pattern.test(str);
};
