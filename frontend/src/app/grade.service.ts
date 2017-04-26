import { Injectable } from '@angular/core';
import { Http , URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GradeService {
    constructor(private http: Http) {}

    get(divisionId) {
        const searchParam = new URLSearchParams();
        searchParam.append('divisionId', divisionId);
        return this.http.get('/api/getGrades', { search: searchParam })
            .map(response => {
                return response.json();
            });
    }

    getSingle(gradeId) {
        return this.http.get(`/api/getSingleGrade/${gradeId}`)
            .map(response => {
                return response.json();
            });
    }
}
