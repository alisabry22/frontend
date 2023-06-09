const express=require("express")
const app=express();
const cors=require("cors");
const bodyparser=require("body-parser");
const split_router=require("./routes/split_router")
const employee_router=require("./routes/employee_router")
const oraclerun=require('./db');
const dashobard_router = require("./routes/dashboard_router");
const deptrouter = require("./routes/department_router");

app.use(cors());
oraclerun();
app.use(dashobard_router);
app.use(split_router);
app.use("/emps",employee_router);
app.use("/dept",deptrouter);





app.listen(3000,()=>console.log("listenting on port 3000"))