import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class EmployeeService {
  constructor(private http: Http) {}

  getEmployees() {
      return this.http.get('/api/getEmployees')
          .map(response => {
              return response.json();
          });
  }

  getEmployeesFiltered(filterQuery)
  {
      let searchParam = new URLSearchParams();
      searchParam.append('gender', filterQuery.gender);
      searchParam.append('locationId', filterQuery.location);

      return this.http.get(`/api/filterEmployee?gender=${filterQuery.gender}&locationId=${filterQuery.location}`)
          .map(response => {
              return response.json();
          });
  }

  getEmployeeInfo(id)
  {
      return this.http.get(`/api/getSingleEmployee/${id}`)
          .map(response => {
              return response.json();
          })
          .catch(this.handleError);
  }

  add(employee) {
    return this.http.post('/api/modifyEmployee', employee)
        .map(response => {
            return response.json();
        })
        .catch(this.handleError);
  }

  edit(employee, targetId) {
      employee.append('empId', targetId);
      return this.http.post(`/api/modifyEmployee`, employee)
          .map(response => {
              return response.json();
          })
          .catch(this.handleError);
  }

  delete(employeeId) {
    return this.http.delete(`/api/modifyEmployee/${employeeId}`)
        .map(response => {});
  }
  
  private handleError (error: Response | any) 
  {
    let errMsg: string;
    if (error instanceof Response) {
        const body = error.json() || '';
        const err = JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
        errMsg = error.message ? error.message : error.toString();
    }
    console.error(`Error: ${errMsg}`);
    return Observable.throw(errMsg);
  }
}
