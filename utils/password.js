import bcrypt from 'bcrypt';

export async function cryptPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (e) {
    throw e;
  }
}

export async function comparePasswords(password, userPassword) {
  try {
    return await bcrypt.compare(password, userPassword);
  } catch (e) {
    throw e;
  }
}
