import dbQuery from "../config/db.js";

export const getEmpModel = async (params) => {
    try {
        const [result] = await dbQuery("select * from employees") 
        return result
    } catch (error) {
        throw error
    }
}

export const findEmpByIdModel = async (id) => {
    try {
        const [result] = await dbQuery("select count from exployee where emp_id = ?", [id])
        return result;
    } catch (error) {
        throw error
    }
}


export const postEmpModel = async (employeeData) => {
    try {
        
    } catch (error) {
        
    }
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
    const [result] = await db.query(
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
    console.log(result)
    return result.insertId;
};