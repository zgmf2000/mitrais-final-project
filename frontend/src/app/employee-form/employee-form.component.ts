import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { EmployeeService } from '../service/employee.service';
import { LocationService } from '../service/location.service';
import { GradeService } from '../service/grade.service';
import { DivisionService } from '../service/division.service';
import { SharedService } from '../service/shared-service.service';
import { UtilityToken } from '../providers';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import * as moment from 'moment';
import 'date-input-polyfill';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  form;
  locations;
  divisions;
  grades;
  forbiddenFile;
  errorMessages;
  submitted = false;
  employeeId;
  employeePicture = '../../../assets/user-icon.svg';
  selectedEmployee = {
    employeeId  : null,
    firstName : null,
    lastName : null,
    gender: null,
    photo: null,
    status: null,
    phoneNo: null,
    dob: null,
    location: {
      locationId: null,
      locationName: null
    },
    hireDate: null,
    suspendDate: null,
    nationality: null,
    maritalStatus: null,
    division: {
      divisionId: null,
      divisionCode: null,
      divisionName: null
    },
    grade: {
      gradeId: null,
      gradeName: null
    },
    subDivision: null
  };

  constructor(
      private employeeService: EmployeeService,
      private locationService: LocationService,
      private divisionService: DivisionService,
      private sharedService: SharedService,
      private gradeService: GradeService,
      private formBuilder: FormBuilder,
      private activatedRoute: ActivatedRoute,
      public snackBar: MdSnackBar,
      private router: Router,
      private datePipe: DatePipe,
      @Inject(UtilityToken) public utilityList
  )
  {
    this.locationService.get().subscribe( locations => {
      this.locations = locations;
    });

    this.divisionService.get().subscribe( divisions => {
      this.divisions = divisions;
    });

    if (this.router.url.indexOf('edit') >= 0)
    {
      this.activatedRoute.params.subscribe(params => {
        this.employeeId = params['employee_id'];
        this.initializeForm();
      });
    }
  }

  initializeForm()
  {
    this.employeeService.getEmployeeInfo(this.employeeId).subscribe(employee => {
      this.selectedEmployee = employee;
      this.setEmployeePicture(undefined);
      this.selectedEmployee.hireDate = this.convertDate(this.selectedEmployee.hireDate);
      this.selectedEmployee.dob = this.convertDate(this.selectedEmployee.dob);
      this.selectedEmployee.suspendDate = (this.selectedEmployee.suspendDate) ? this.convertDate(this.selectedEmployee.suspendDate) : null;
      this.getGrades(employee.division.divisionId);
    
      let fileInput = <HTMLInputElement>document.getElementById('photo');
      fileInput.value = '';

      this.sharedService.notifyOther({ option: 'highlight', value: employee });
    },
    error =>  {
      this.router.navigate(['404']);
    })
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName     : this.formBuilder.control('', [Validators.required]),
      lastName      : this.formBuilder.control('', [Validators.required]),
      gender        : this.formBuilder.control('', [Validators.required]),
      photo         : this.formBuilder.control(''),
      status        : this.formBuilder.control(''),
      locationId    : this.formBuilder.control('', [Validators.required]),
      phoneNo       : this.formBuilder.control('', [Validators.required]),
      email         : this.formBuilder.control('', [Validators.required, Validators.email]),
      dob           : this.formBuilder.control('', [Validators.required, this.validateDate, this.validateBirthDate]),
      suspendDate   : this.formBuilder.control('', [this.validateDate, this.validateSuspendDate]),
      hireDate      : this.formBuilder.control('', [Validators.required, this.validateDate]),
      nationality   : this.formBuilder.control(''),
      gradeId       : this.formBuilder.control('', [Validators.required]),
      maritalStatus : this.formBuilder.control('', [Validators.required]),
      divisionId    : this.formBuilder.control('', [Validators.required]),
      subDivision   : this.formBuilder.control('')
    });
  }

  scrollFormToTop()
  {
        const formContainer : any = document.getElementsByClassName('outer-container')[0];
        formContainer.scrollTop = 0;
  }

  sendCancel()
  {
    this.router.navigate(['/']);
    this.sharedService.notifyOther({ option: 'unhighlight', value: '' });
  }

  convertDate(milliseconds)
  {
    return this.datePipe.transform(milliseconds, 'yyyy-MM-dd');
  }

  validateDate(date)
  {
    if (moment(date.value, ['MM/DD/YYYY', 'M/D/YYYY', 'YYYY-MM-DD'], true).isValid() || !date.value)
      return null;
    else
    {
      return {
        validateDate : {
          valid : false
        }
      };
    }
  }

  validateBirthDate(dob)
  {
    const currentYear = moment();
    const birthYear = moment(dob.value);

    if (currentYear.diff(birthYear, 'years') < 18)
      return {
        validateBirthDate: {
          valid: false
        }
      };
    else
      return null;
  }

  validateSuspendDate(suspendDate)
  {
    const hiringDate = (<HTMLInputElement>document.getElementById('hireDate')).value;

    if (!hiringDate)
      return null;
    else
    {
      const hireDate = moment(hiringDate);
      const suspensionDate = moment(suspendDate.value);

      if (suspensionDate.isBefore(hireDate))
        return {
        validateSuspendDate: {
          valid: false
        }
      };
    }

    return null;
  }

  getGrades(divisionId)
  {
    this.gradeService.get(divisionId).subscribe(grades => {
      this.grades = grades;
    });
  }

  setEmployeePicture(optionalLink)
  {
    if (optionalLink)
      this.employeePicture = optionalLink;
    else if (this.selectedEmployee.photo)
      this.employeePicture = `../../../assets/${this.selectedEmployee.photo}`;
    else
      this.employeePicture = `../../../assets/user-icon.svg`;
  }

  triggerUploadWindow()
  {
    document.getElementById('trigger-photo-upload').click();
  }

  setFile(event)
  {
    const reader = new FileReader();
    const allowedTypes = ['image/jpeg', 'image/png'];
    const file = event.target.files[0];

    this.forbiddenFile = false;

    if (event.target.files[0])
    {
      if (file.type === allowedTypes[0] || file.type === allowedTypes[1])
      {
        reader.onload = (event: any) =>
        {
          this.setEmployeePicture(event.target.result);
        };
          reader.readAsDataURL(event.target.files[0]);
      }
      else
      {
        this.forbiddenFile = true;
      }
    }
  }

  onSubmit(submittedFormData)
  {
    this.submitted = true;

    //Required to trigger invalid style on md-select elements.
    if (!this.form.valid)
    {
      this.form.get('gender').markAsTouched();
      this.form.get('locationId').markAsTouched();
      this.form.get('gradeId').markAsTouched();
      this.form.get('divisionId').markAsTouched();
      this.form.get('maritalStatus').markAsTouched();
      return false;
    }

    const formData : any = new FormData(document.getElementsByTagName('form')[0]);

    //Add data from select options
    formData.append('gender', submittedFormData.gender);
    formData.append('gradeId', submittedFormData.gradeId);
    formData.append('divisionId', submittedFormData.divisionId);
    formData.append('maritalStatus', submittedFormData.maritalStatus);
    formData.append('locationId', submittedFormData.locationId);

    if (submittedFormData.suspendDate === null)
      formData.delete('suspendDate');

    if (this.router.url.indexOf('edit') >= 0)
    {
      this.employeeService.edit(formData, this.employeeId).subscribe((response) => {
        this.sharedService.notifyOther({ option: 'refresh', value: 'from form' });
        this.scrollFormToTop();
        this.snackBar.open(`Employee ${response.firstName} ${response.lastName} edited!`, 'OK', {
          duration: 1500
        });
      });
    }
    else
    {
      this.employeeService.add(formData).subscribe((response) => {
        this.sharedService.notifyOther({ option: 'refresh', value: 'from form' });
        this.scrollFormToTop();
        this.snackBar.open('Employee successfully created!', 'OK', {
          duration: 1500
        });
      });
    }
  }

}
