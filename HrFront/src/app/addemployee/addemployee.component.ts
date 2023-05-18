import { Component, OnInit } from '@angular/core';
import { AddemployeeService } from '../services/addemployee.service';
import { Department } from 'shared/models/department';
import { job } from 'shared/models/job';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit {
  departments=[];
  final_departs:Department[]=[];
  jobs=[];
  final_jobs:job[]=[];
  state:string="";
  message:string="";
  alertShown:boolean=false;
  selectedJob:string="";
  selectedDebt:string="";
  employeeName:string="";
  employeeType:string="";

  constructor(private addempservice:AddemployeeService){}
  ngOnInit(): void {
    this.getAllEmployees();
  }
  getAllEmployees(){
    this.addempservice.getAllDepartments().subscribe((response)=>{
      this.state=response.state;
      this.departments=response.departments;
      this.jobs=response.jobs;
      this.final_departs=this.departments.map(val=>({dept_desc:val["DEPT_DESC"],dept_id:val["DEPT_CODE"]}));
      this.final_jobs=this.jobs.map(val=>({job_desc:val["JOB_DESC"],job_id:val["JOB_CODE"]}));
      this.selectedDebt=this.final_departs[0].dept_desc!;
      this.selectedJob=this.final_jobs[0].job_desc!;
      console.log(this.final_jobs);
    });
  }
  //on selecting department getting its value

  onSelectDept(event:any){
    this.selectedDebt=event.target.options[event.target.options.selectedIndex].text;

  }
//on selecting job getting its value
  onSelectJob(event:any){
    this.selectedJob=event.target.options[event.target.options.selectedIndex].text;


  }

  addEmployee(event:any){
    this.employeeName=event.target.employeeName.value;
    this.employeeType=event.target.flexRadioDefault.value;
    if(this.employeeName.length==0 || this.employeeType.length==0|| this.selectedDebt.length==0 || this.employeeType.length==0){
      this.state="error";
      this.message="Some Fields Are Missing";
      this.alertShown=true;
    }else{
     var dep= this.final_departs.find(({dept_desc})=>dept_desc===this.selectedDebt);
     var jobid=this.final_jobs.find(({job_desc})=>job_desc===this.selectedJob);
     if(dep && jobid){
      this.addempservice.addnewEmployee(this.employeeName,dep["dept_id"],jobid["job_id"],this.employeeType).subscribe({
        next:(event:any)=>{
          if (event instanceof HttpResponse){
         this.state=event.body.state;
       this.message=event.body.message;
       this.alertShown=true;
         }else if (event instanceof HttpErrorResponse){
           this.state=event.error;
           this.message=event.message;
           this.alertShown=true;

         }else{
          this.state=event.state;
          this.message=event.message;
          this.alertShown=true;
         }
       }
      });
     }

    }
  }
  closeAlert(){
    this.alertShown=false;
  }
}
