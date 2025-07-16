import {
  findEmpByEmailModel,
  findEmpByIdModel,
  getEmpModel,
  postEmpModel,
} from "../models/empModel.js";
import bcrypt from "bcryptjs";

export const getEmpCtrlr = async (req, res) => {
  try {
    const result = await getEmpModel();
    if (!result || result.length == 0) {
      return res
        .status(400)
        .json({ success: false, error: "No employees found" });
    }
    return res.status(200).json({ success: true, result });
  } catch (error) {
    console.error(`Error while fetching the employees`, error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching Employee, please try again later.",
    });
  }
};

export const postEmpCtrlr = async (req, res) => {
  try {
    const requiredField = [
      "emp_id",
      "first_name",
      "last_name",
      "email",
      "password",
      "dob",
      "department_id",
    ];

    const employeeData = req.body;
    // Check for the required fields
    const missingFields = requiredField.filter((val) => !employeeData[val]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields ${missingFields}`,
      });
    }
    // Check for the unique employee
    const existingEmpByID = await findEmpByIdModel(employeeData.emp_id);
    if (existingEmpByID.emp_count > 0) {
      return res.status(409).json({
        success: false,
        message: `Employee ID already exists`,
      });
    }
    const existingEmpByEmail = await findEmpByEmailModel(employeeData.email);
    if (existingEmpByEmail.emp_count > 0) {
      return res.status(409).json({
        success: false,
        message: `email already exists`,
      });
    }
    //Hasing the password
    const salt = bcrypt.genSaltSync(10);
    const password_hash = bcrypt.hashSync(employeeData.password, salt);

    const finalEmployeeData = {
      ...employeeData,
      password_hash,
      salt,
      status: employeeData.status || "active",
    };

    const emp = await postEmpModel(finalEmployeeData);
    res.status(201).json({
      success: true,
      emp,
      message: "Employee created successfully",
    });
  } catch (error) {
    console.error(`error in posting the employee `, error);
    res.status(500).json({
      success: false,
      message:
        "Error in posting the employee, please try again after some time",
    });
  }
};
