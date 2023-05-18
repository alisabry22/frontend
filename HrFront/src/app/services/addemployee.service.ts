import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ADD_NEW_EMP, GET_ALL_DEPARTMENTS } from '../url';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddemployeeService {

  constructor(private http:HttpClient) {

   }

   getAllDepartments():Observable<any> {
   return this.http.get(GET_ALL_DEPARTMENTS);

   }
   addnewEmployee(empname:string,department:string,job:string,emptype:string):Observable<any>{
    let body = new URLSearchParams();
    body.set('empname',empname);
    body.set('emptype',emptype);
    body.set('department',department);
    body.set('job',job);

    return this.http.post(ADD_NEW_EMP,body.toString(),{headers:{'Content-Type': 'application/x-www-form-urlencoded'}});
   }
}
