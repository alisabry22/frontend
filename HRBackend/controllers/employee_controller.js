const oracledb = require("oracledb");


const getAllEmployees =async(req,res) =>{
    let connection;
  try {
      connection=await oracledb.getConnection({
          user:"ATTEND",
          password:"attend",
          connectString:"192.168.0.69:1521/xe",
              });
  
          var result=await connection.execute( "select e.emp_name,e.card_id,e.dept_code, d.dept_desc ,r.rule_desc from at_emps e , AT_DEPT d , at_rules r   where 1=1 and e.dept_code=d.dept_code(+)  and e.rule_no = r.rule_no(+) ORDER BY (CAST(card_id as integer)) ASC");
              
            var departments=await connection.execute("select dept_desc from at_dept");
            connection.close();
            
          return res.send({state:"success",result:result.rows,departments:departments.rows});
  } catch (error) {
        return res.send({state:"error", message:error.message});
  }
      
}



const addNewEmployee=async(req,res)=>{
  var empname=req.body.empname;
  var emptype=req.body.emptype;
  var department=req.body.department;
  var job=req.body.job;
  let connection;
  try {
      connection=await oracledb.getConnection({
          user:"ATTEND",
          password:"attend",
          connectString:"192.168.0.69:1521/xe",
              });
  
          var max_card_id=await connection.execute("select MAX(CAST(card_id AS integer)) as card_id from at_emps");
          var max_emp_no=await connection.execute("select MAX(CAST(emp_no AS integer)) as emp_no from at_emps");
       
          max_card_id=max_card_id.rows[0]["CARD_ID"];
          max_card_id++;
          max_emp_no=max_emp_no.rows[0]["EMP_NO"];
          max_emp_no++;
         

          var insert=`INSERT INTO at_emps (card_id,emp_no,emp_name,dept_code,sect_code,job_code) values(:1,:2,:3,:4,:5,:6)`;
          var binds=[
            max_card_id,
            max_emp_no,
            empname,
            department,
            1,
            job
          ];
        await connection.execute(insert,binds);
         connection.commit();
            connection.close();
          return res.send({state:"success",message:"Succesffully Added Employee"});
  } catch (error) {
        return res.send({state:"error", message:error.message});
  }

}

const getAllEmpTime=async(req,res)=>{
  try {
    let connection;
    connection=await oracledb.getConnection({
      user:"ATTEND",
      password:"attend",
      connectString:"192.168.0.69:1521/xe",
          });
          var query="select * from at_emp_time ORDER BY (CAST(card_id as integer)) ASC";
         var emptime=await connection.execute(query);
          return res.send({state:"success",emptime:emptime.rows});
  } catch (error) {
    console.log(error);
      return res.send({state:"error",message:error.message});
  }

}
const EditEmployee=async(req,res)=>{
  let connection;
  empname=req.body.empname;
  departmentName=req.body.departmentName;
  role=req.body.role;

  try {
    connection=await oracledb.getConnection({
      user:"ATTEND",
      password:"attend",
      connectString:"192.168.0.69:1521/xe",
          });
         
          rolecode=role=="Manager"?"1":"2";
          var query=`select dept_code from at_dept where dept_desc=:1`;
          var dept=[departmentName];
      
        var dept_Code= await connection.execute(query,dept);
        dept_Code=dept_Code.rows[0]["DEPT_CODE"];
        var updateQuery="update at_emps set emp_name=:1 , dept_code=:2 ,rule_no=:3 where emp_name=:1";
        var binds=[empname,dept_Code,rolecode];
            await connection.execute(updateQuery,binds);
            connection.commit();
            
        connection.close();
        return res.send({state:"success",message:"Successfully changed Employee Data"});
        


  } catch (error) {
    console.log(error);
      return res.send({state:"error",message:error});
  }
}



module.exports={getAllEmployees,addNewEmployee,getAllEmpTime,EditEmployee};