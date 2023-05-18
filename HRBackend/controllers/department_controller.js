const oracledb=require("oracledb");


const getAllDepartments=async(req,res)=>{
    try {
      connection=await oracledb.getConnection({
          user:"ATTEND",
          password:"attend",
          connectString:"192.168.0.69:1521/xe",
              });
  
          var departments=await connection.execute( "select distinct d.dept_code ,d.dept_desc,count(e.emp_name) emp_count from at_emps e,at_dept d where 1=1 and e.dept_code(+)=d.dept_code group by  d.dept_desc ,d.dept_code order by d.dept_code ASC");
          var jobs=await connection.execute("select job_desc,job_code from at_jobs ORDER BY job_code ASC");
            connection.close();
            
          return res.send({state:"success",departments:departments.rows,jobs:jobs.rows});
  } catch (error) {
        return res.send({state:"error", message:error.message});
  }
  }

const AddNewDepartment=async(req,res)=>{
    let connection;
    var dept_name=req.body.deptname;
    try {

        connection=await oracledb.getConnection({
            user:"ATTEND",
            password:"attend",
            connectString:"192.168.0.69:1521/xe",
                });

                var latest_dept_code=await connection.execute("select Max (DEPT_CODE) as deptcode from at_dept");
               latest_dept_code=latest_dept_code.rows[0]["DEPTCODE"];
                latest_dept_code++;
                var addDept="insert into at_dept (dept_code,dept_desc) values (:1,:2)";
               
      
                   console.log(totalemp);
                var binding=[
                    latest_dept_code,
                    dept_name,

                ];
      var result=  await connection.execute(addDept,binding);
      console.log(result);
        connection.commit();
        connection.close();
        return res.send({state:"success",message:"Successfully added new Department"});
        
    } catch (error) {
        return res.send({state:"error",message:error.message});
    }
}
module.exports={getAllDepartments,AddNewDepartment};