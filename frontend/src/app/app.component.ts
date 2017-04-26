import { Component, Inject, Input, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { LocationService } from './location.service';
import { RefreshService } from './refresh-service.service';
import { Router } from '@angular/router';
import { MdDialogRef, MdDialog, MdSnackBar } from '@angular/material';
import { UtilityToken } from './providers';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @Input() selectedTab = 0;
  selectedEmployee;
  deleteTarget;
  employeeList = [];
  employeeOriginalList;
  sortCode = 0;
  private subscription: Subscription;

  constructor(
      private employeeService: EmployeeService,
      private router: Router,
      private refreshService: RefreshService,
      public snackBar: MdSnackBar,
      public dialog: MdDialog
  ) 
  {}

  ngOnInit() {
    this.getEmployees();

    this.subscription = this.refreshService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'refresh') 
      {
        this.getEmployees();
        this.sortEmployees();
        this.resetSelection();
      }
      else if (res.hasOwnProperty('option') && res.option === 'highlight')
      {
        if (!this.selectedEmployee)
        {
          this.selectedEmployee = res.value;
          this.deleteTarget = this.selectedEmployee.employeeId;
        }
      }
    });
  }

  resetSelection()
  {
    this.selectedEmployee = undefined;
    this.router.navigate(['/']);
  }

  getEmployees()
  {
    this.employeeService.getEmployees().subscribe
    (
        employees => {
          this.employeeList = employees;
        }
    );
  }

  sortEmployees()
  {
    if (this.sortCode === 0)
    {
      this.employeeList.sort(function(a, b)
      {
        return a.employeeId - b.employeeId;
      });
    }
    else if (this.sortCode === 1)
    {
      this.employeeList.sort(function(a, b)
      {
        return a.lastName.localeCompare(b.lastName);
      });
    }
    else if (this.sortCode === 2)
    {
      this.employeeList.sort(function(a, b)
      {
        return b.lastName.localeCompare(a.lastName);
      });
    }
  }

  initiateSort()
  {
    let sortMeaning;

    this.sortCode++;
    if (this.sortCode > 2)
      this.sortCode = 0;

    switch (this.sortCode)
    {
      case 0:
        sortMeaning = 'Default';
        break;
      case 1:
        sortMeaning = 'Ascending';
        break;
      case 2:
        sortMeaning = 'Descending';
        break;
      default:
        break;
    }

    this.resetSelection();
    this.sortEmployees();

    this.snackBar.open(`Sorted By Last Name: ${sortMeaning}`, 'OK',
    {
      duration: 1500,
    });
  }


  initiateSearch($event)
  {
    const query = $event.target.value.toLowerCase();
    this.deleteTarget = undefined;
    this.resetSelection();

    if (!this.employeeOriginalList)
      this.employeeOriginalList = this.employeeList;
    else
      this.employeeList = this.employeeOriginalList;

    if (query)
    {
       this.employeeList = this.employeeList.filter(employee => {
         let employeeName = `${employee.firstName} ${employee.lastName}`;
         return employeeName.toLowerCase().includes(query);
       });
       this.sortEmployees();
    }
    else
    {
      this.employeeList = this.employeeOriginalList;
    }
  }

  deleteEmployee()
  {
    if (this.deleteTarget)
    {
      this.resetSelection();
      this.employeeService.delete(this.deleteTarget).subscribe(
          () => {
            this.getEmployees();
            this.router.navigate(['/']);
            this.snackBar.open('Employee successfully deleted!', 'OK', {
              duration: 1500
            });
          }
      );
    }
  }

  initiateFilter(filterQuery)
  {
    this.resetSelection();
    this.employeeService.getEmployeesFiltered(filterQuery).subscribe(employees => {
      this.employeeList = employees;
      this.deleteTarget = undefined;
      this.router.navigate(["/"]);
      this.snackBar.open(`Filtered ${filterQuery.gender} employees located in ${filterQuery.location_string}`,'OK',{
        duration: 1500
      });
    });
  }

  showAddEmployeeForm()
  {
    this.deleteTarget = undefined;
    this.resetSelection();
    this.router.navigate(['add']);
  }

  onCardClick(employee)
  {
    const employeeId = employee.employeeId;
    this.selectedEmployee = employee;
    this.deleteTarget = employeeId;
    this.router.navigate(['edit', employeeId]);
  }

  openDeleteDialog()
  {
    let dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.deleteEmployee();
    });
  }

  openFilterDialog()
  {
    let dialogRef = this.dialog.open(FilterDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result)
      {
        this.initiateFilter(result);
      }
    });
  }
}


@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
})
export class DeleteDialogComponent {
  constructor(public dialogRef: MdDialogRef<DeleteDialogComponent>) {}
}

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
})
export class FilterDialogComponent{

  gender_filter = 'All';
  location_filter = '0';
  location_string = 'Anywhere';
  locations;

  constructor(
      public dialogRef: MdDialogRef<FilterDialogComponent>,
      public locationService: LocationService,
      @Inject(UtilityToken) public utilityList
  )
  {
    this.locationService.get().subscribe(locations => {
      this.locations = locations;
    });
  }

  setGenderFilter($event)
  {
    this.gender_filter = $event.value;
  }

  setLocationFilter($event)
  {
    this.location_filter = $event.value;
    this.location_string = $event.source.selected.viewValue;
  }

  initiateFilter()
  {
    let filterQuery = {
      gender  : this.gender_filter,
      location: this.location_filter,
      location_string: this.location_string
    };
    this.dialogRef.close(filterQuery);
  }
}
