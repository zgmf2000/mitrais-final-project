import { Request, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

export class MockXHRBackend {

    createConnection(request: Request) {
        var response = new Observable((responseObserver: Observer<Response>) => {
            var responseOptions;
            switch (request.method) {
                case RequestMethod.Get:
                    if (request.url.indexOf('employee') >= 0)
                    {
                        if (request.url.indexOf('id') >= 0)
                        {
                            let id, filteredEmployee;
                            if (request.url.indexOf('?') >= 0)
                                id = parseInt(request.url.split('=')[1], 10);
                            if (id)
                                filteredEmployee = this._employees.filter(employee => employee.employee_id == id);
                            else
                                filteredEmployee = this._employees;
                            responseOptions = new ResponseOptions({
                                body: { employees: JSON.parse(JSON.stringify(filteredEmployee)) },
                                status: 200
                            });
                        }
                        else if (request.url.indexOf('gender') >= 0)
                        {
                            let gender, filteredEmployee;
                            if (request.url.indexOf('?') >= 0)
                                gender = request.url.split('=')[1];
                            if (gender)
                                filteredEmployee = this._employees.filter(employee => employee.employee_gender == gender);
                            else
                                filteredEmployee = this._employees;
                            responseOptions = new ResponseOptions({
                                body: { employees: JSON.parse(JSON.stringify(filteredEmployee)) },
                                status: 200
                            });
                        }
                        else
                        {
                            responseOptions = new ResponseOptions({
                                body: { employees: JSON.parse(JSON.stringify(this._employees)) },
                                status: 200
                            });
                        }
                    }
                    else if (request.url === "location")
                    {
                        let id, filteredLocation;
                        if (request.url.indexOf('?') >= 0)
                            id = request.url.split('=')[1];
                        if (id) {
                            filteredLocation = this._location.filter(location => location.location_id === id);
                        } else {
                            filteredLocation = this._location;
                        }
                        responseOptions = new ResponseOptions({
                            body: { locations: JSON.parse(JSON.stringify(filteredLocation)) },
                            status: 200
                        });
                    }
                    break;
                case RequestMethod.Post:
                    switch(request.url)
                    {
                        case "add-employee":
                            var newEmployee = JSON.parse(request.text().toString());
                            newEmployee.employee_id = this._getNewId();
                            this._employees.push(newEmployee);
                            responseOptions = new ResponseOptions({ status: 201 });
                            break;
                        default:
                            break;
                    }
                    break;
                case RequestMethod.Delete:
                    let id = parseInt(request.url.split('/')[1], 10);
                    this._deleteEmployee(id);
                    responseOptions = new ResponseOptions({ status: 200 });
                    break;
            }

            let responseObject = new Response(responseOptions);
            responseObserver.next(responseObject);
            responseObserver.complete();
            return () => { };
        });
        return { response };
    }

    _deleteEmployee(id) {
        let target = this._employees.find(employee => employee.employee_id === id);
        let index = this._employees.indexOf(target);
        if (index >= 0) {
            this._employees.splice(index, 1);
        }
    }

    _getNewId() {
        if (this._employees.length > 0) {
            return Math.max.apply(Math, this._employees.map(employee => employee.employee_id)) + 1;
        }
        else
            return 1;
    }

    _employees = [
        {
            employee_id             : 1,
            employee_first_name     : "Albert",
            employee_last_name      : "Wesker",
            employee_gender         : "Male",
            employee_photo          : "wesker.jpg",
            employee_status         : null,
            employee_location       : "Bali",
            employee_phone_no       : "+6284910342",
            employee_email          : "albert.wesker@mitrais.com",
            employee_dob            : "1994-03-06",
            employee_hire_date      : "2017-01-01",
            employee_suspend_date   : null,
            employee_nationality    : "Indonesian",
            employee_grade          : "JP",
            employee_marital_status : "Single",
            employee_division       : "SWD - Red"
        },
        {
            employee_id             : 2,
            employee_first_name     : "Chris",
            employee_last_name      : "Redfield",
            employee_gender         : "Male",
            employee_photo          : "chris.jpg",
            employee_status         : null,
            employee_location       : "Bali",
            employee_phone_no       : "+6284910342",
            employee_email          : "albert.wesker@mitrais.com",
            employee_dob            : "1994-03-06",
            employee_hire_date      : "2017-01-01",
            employee_suspend_date   : null,
            employee_nationality    : "Indonesian",
            employee_grade          : "JP",
            employee_marital_status : "Single",
            employee_division       : "SWD - Red"
        },
        {
            employee_id             : 3,
            employee_first_name     : "Claire",
            employee_last_name      : "Redfield",
            employee_gender         : "Female",
            employee_photo          : "claire.jpg",
            employee_status         : null,
            employee_location       : "Bali",
            employee_phone_no       : "+6284910342",
            employee_email          : "albert.wesker@mitrais.com",
            employee_dob            : "1994-03-06",
            employee_hire_date      : "2017-01-01",
            employee_suspend_date   : null,
            employee_nationality    : "Indonesian",
            employee_grade          : "JP",
            employee_marital_status : "Single",
            employee_division       : "SWD - Red",
            employee_sub_division   : "SW BootCamp"
        },
        {
            employee_id             : 4,
            employee_first_name     : "Barry",
            employee_last_name      : "Burton",
            employee_gender         : "Male",
            employee_photo          : null,
            employee_status         : null,
            employee_location       : "Bali",
            employee_phone_no       : "+6284910342",
            employee_email          : "albert.wesker@mitrais.com",
            employee_dob            : "1994-03-06",
            employee_hire_date      : "2017-01-01",
            employee_suspend_date   : null,
            employee_nationality    : "Indonesian",
            employee_grade          : "JP",
            employee_marital_status : "Single",
            employee_division       : "SWD - Red",
            employee_sub_division   : "SW BootCamp"
        }
    ];

    _location = [
        {
            location_id  : 1,
            location_name: "Bali"
        },
        {
            location_id  : 2,
            location_name: "Jogjakarta"
        },
        {
            location_id  : 3,
            location_name: "Bandung"
        },
        {
            location_id  : 4,
            location_name: "Jakarta"
        },
    ];
}