import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DivisionService {
    constructor(private http: Http) {}

    get() {
        return this.http.get('/api/getDivisions')
            .map(response => {
                return response.json();
            });
    }

    getSingle(divisionId) {
        return this.http.get(`/api/getSingleDivision/${divisionId}`)
            .map(response => {
                return response.json();
            });
    }
}
