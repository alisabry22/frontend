const express=require("express");
const {getAllDepartments,AddNewDepartment} = require("../controllers/department_controller");
const deptrouter=express.Router();


//get All Departments
deptrouter.get("/getalldepts",getAllDepartments);
//add new department to oracle db
deptrouter.post("/addnewdept",AddNewDepartment);

module.exports=deptrouter;