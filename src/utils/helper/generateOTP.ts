const generateOTP = (length: number): string => {
  //   const chars = "23456789ABCDEFGHIJKLMNPQRSTUWXYZabcdefghijklmnpqrstuwxyz";
  const chars = "1234567890";

  if (!length) {
    length = Math.floor(Math.random() * chars.length);
  }

  let str = "";
  for (let i = 0; i < length; i += 1) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
};

export default generateOTP;
