import dbQuery from "../config/db.js";

export const getEmpModel = async (params) => {
  try {
    const result = await dbQuery("select * from employees");
    return result;
  } catch (error) {
    throw error;
  }
};

export const findEmpByEmp_idModel = async (id) => {
  try {
    const [result] = await dbQuery(
      "select count(emp_id) as emp_count from employees where emp_id = ?",
      [id]
    );
    console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
};

export const findEmpByEmailModel = async (email) => {
  try {
    const [result] = await dbQuery(
      "SELECT count(email) as emp_count FROM employees WHERE email = ?",
      [email]
    );

    return result;
  } catch (error) {
    throw error;
  }
};

export const findEmpByidModel = async (id) => {
  try {
    const [result] = await dbQuery("SELECT * FROM employees WHERE id = ?", [
      id,
    ]);
    return result;
  } catch (error) {
    throw error;
  }
};

export const postEmpModel = async (employeeData) => {
  try {
    const {
      emp_id,
      first_name,
      last_name,
      email,
      password_hash,
      salt,
      gender = null,
      dob,
      department_id,
      address = null,
      city = null,
      country = null,
      phone = null,
      status,
    } = employeeData;
    const result = await dbQuery(
      `INSERT INTO employees (
                emp_id, first_name, last_name, email, password_hash, salt,
                gender, dob, department_id, address, city, country, phone, status
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        emp_id,
        first_name,
        last_name,
        email,
        password_hash,
        salt,
        gender,
        dob,
        department_id,
        address,
        city,
        country,
        phone,
        status,
      ]
    );
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

export const updateEmpModel = async (id, updatableData) => {
  const updatableFields = [
    "emp_id",
    "first_name",
    "last_name",
    "email",
    "gender",
    "dob",
    "department_id",
    "address",
    "city",
    "country",
    "phone",
    "status",
  ];
  try {
    const filteredFields = Object.keys(updatableData).filter((val) =>
      updatableFields.includes(val)
    );
    if (filteredFields.length == 0) {
      throw new Error("No field matches to update");
    }
    const setClause = filteredFields.map((field) => `${field} = ?`).join(", ");
    const values = filteredFields.map((val) => updatableData[val]);
    values.push(id);

    const query = `UPDATE employees SET ${setClause} WHERE id = ?`;

    const result = await dbQuery(query, values);
    return result.affectedRows;
  } catch (error) {
    throw error;
  }
};

export const deleteEmpModel = async (id) => {
  try {
    const result = await dbQuery("DELETE from employees WHERE id = ?", [id]);
    return result.affectedRows;
  } catch (error) {
    throw error;
  }
};
