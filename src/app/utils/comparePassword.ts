import bcrypt from 'bcrypt';
export const comparePassword = async (
  password: string,
  hashedPassword: string,
) => {
  const isPasswordMatch = await bcrypt.compare(password, hashedPassword);
  return isPasswordMatch;
};
