import { getEmpModel } from "../models/empModel.js"


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
        console.error(`Error while fetching the employees`, error)
        return res
          .status(500)
          .json({
            success: false,
            message: "Error in fetching Employee, please try again later.",
          });
    }
}