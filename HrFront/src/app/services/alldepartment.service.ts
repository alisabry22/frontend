import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ADD_NEW_DEPARTMENT, GET_ALL_DEPARTMENTS } from '../url';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlldepartmentService {

  constructor(private http:HttpClient) { }

  getAllDepts():Observable<any>{
    return this.http.get(GET_ALL_DEPARTMENTS);
  }

  addNewDepartment(deptname:string):Observable<any>{
    let body = new URLSearchParams();
    body.set("deptname",deptname);
    return this.http.post(ADD_NEW_DEPARTMENT,body.toString(),{headers:{'Content-Type': 'application/x-www-form-urlencoded'}});
  }
}
