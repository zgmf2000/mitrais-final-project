import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { EmployeeService } from '../employee.service';
import { LocationService } from '../location.service';
import { GradeService } from '../grade.service';
import { DivisionService } from '../division.service';
import { RefreshService } from '../refresh-service.service';
import { UtilityToken } from '../providers';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CustomValidators } from 'ng2-validation';


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
      private refreshService: RefreshService,
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
      this.selectedEmployee.suspendDate = (this.selectedEmployee.suspendDate)?this.convertDate(this.selectedEmployee.suspendDate):null;
      this.getGrades(employee.division.divisionId);
      
      this.refreshService.notifyOther({ option: 'highlight', value: employee });
    });
  }

  sendCancel()
  {
    if (this.router.url.indexOf('edit') >= 0)
    {
      this.initializeForm();
      const formContainer : any = document.getElementsByClassName('content')[0].childNodes[3];
      formContainer.scrollTop = 0;
    }
    else
      this.router.navigate(['/']);
  }

  convertDate(milliseconds)
  {
    return this.datePipe.transform(milliseconds, 'yyyy-MM-dd');
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName     : this.formBuilder.control(''),
      lastName      : this.formBuilder.control(''),
      gender        : this.formBuilder.control(''),
      photo         : this.formBuilder.control(''),
      status        : this.formBuilder.control(''),
      locationId    : this.formBuilder.control(''),
      phoneNo       : this.formBuilder.control(''),
      email         : this.formBuilder.control('', [Validators.required, CustomValidators.email]),
      dob           : this.formBuilder.control(''),
      suspendDate   : this.formBuilder.control(''),
      hireDate      : this.formBuilder.control(''),
      nationality   : this.formBuilder.control(''),
      gradeId       : this.formBuilder.control(''),
      maritalStatus : this.formBuilder.control(''),
      divisionId    : this.formBuilder.control(''),
      subDivision   : this.formBuilder.control('')
    });
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
    var reader = new FileReader();
    
    reader.onload = (event: any) => 
    {
      this.setEmployeePicture(event.target.result);
    }
    
    reader.readAsDataURL(event.target.files[0]);
  }

  onSubmit(submittedFormData)
  {
    let formData : any = new FormData(document.getElementsByTagName("form")[0]);

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
        this.refreshService.notifyOther({ option: 'refresh', value: 'from form' });
        this.snackBar.open(`Employee ${response.firstName} ${response.lastName} edited!`, 'OK', {
          duration: 1500
        });
      });
    }
    else
    {
      this.employeeService.add(formData).subscribe((response) => {
        this.refreshService.notifyOther({ option: 'refresh', value: 'from form' });
        this.snackBar.open('Employee successfully deleted!', 'OK', {
          duration: 1500
        });
      });
    }
  }

}
