import bcrypt from "bcrypt";

const salt = 10;

export const hash = async (token) => {
  return await bcrypt.hash(token, salt);
};

export const compareHash = async (myPlaintextPassword, hash) => {
  const match = await bcrypt.compare(myPlaintextPassword, hash);
  return match;
};