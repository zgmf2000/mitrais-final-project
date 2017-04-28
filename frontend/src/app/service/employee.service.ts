import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

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
          });
  }

  add(employee) {
    return this.http.post('/api/modifyEmployee', employee)
        .map(response => {
            return response.json();
        });
  }

  edit(employee, targetId) {
      employee.append('empId', targetId);
      return this.http.post(`/api/modifyEmployee`, employee)
          .map(response => {
              return response.json();
          });
  }

  delete(employeeId) {
    return this.http.delete(`/api/modifyEmployee/${employeeId}`)
        .map(response => {});
  }
}
