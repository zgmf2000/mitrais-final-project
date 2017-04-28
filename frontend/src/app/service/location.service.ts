import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LocationService {
    constructor(private http: Http) {}

    get() {
        return this.http.get('/api/getLocations')
            .map(response => {
                return response.json();
            });
    }

    getLocationInfo(locationId) {
        return this.http.get(`/api/getSingleLocation/${locationId}`)
            .map(response => {
                return response.json();
            });
    }
}
