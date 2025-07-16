import dbQuery from "../config/db.js";

export const getAdminModel = async () => {
  try {
    const result = await dbQuery(`select * from admin`);
    return result;
  } catch (error) {
    console.error("Error in fetching admin ", error);
    throw error;
  }
};

export const findAdminByUserNameModel = async (userName) => {
  try {
    const result = await dbQuery(
      `select count(username) as usercount from admin where username = ?`,
      [userName]
    );
    return result[0];
  } catch (error) {
    throw error;
  }
};

export const postAdminModel = async (userName, passHash, salt) => {
  try {
    const result = await dbQuery(
      `Insert into admin (username, password_hash, salt) values (?, ?, ?)`,
      [userName, passHash, salt]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

export const getCredentialModel = async (userId) => {
  try {
    const result = await dbQuery(
      `select password_hash from admin where id = ?`,
      [userId]
    );
    return result[0];
  } catch (error) {
    throw error;
  }
};

export const updatePasswordModel = async (userId, newHash, salt) => {
  try {
    const result = await dbQuery(
      `UPDATE admin SET password_hash = ?, salt = ? WHERE id = ?`,
      [newHash, salt, userId]
    );
    return result.affectedRows;
  } catch (error) {
    throw error; 
  }
};
