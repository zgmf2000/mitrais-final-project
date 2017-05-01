import { Component, Inject, Input, OnInit } from '@angular/core';
import { EmployeeService } from './service/employee.service';
import { LocationService } from './service/location.service';
import { SharedService } from './service/shared-service.service';
import { Router } from '@angular/router';
import { MdDialogRef, MdDialog, MdSnackBar, MdDialogConfig } from '@angular/material';
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
  activeFilter = {
    location        : '0',
    location_string : 'Anywhere',
    gender          : 'All' 
  };
  private subscription: Subscription;

  constructor(
      private employeeService: EmployeeService,
      private router: Router,
      private sharedService: SharedService,
      public snackBar: MdSnackBar,
      public dialog: MdDialog
  ) 
  {}

  ngOnInit() {
    document.getElementById("sidebar-cover").addEventListener("click", this.hideSidebar);

    this.getEmployees();

    this.subscription = this.sharedService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'refresh') 
      {
        this.initiateFilter(false, false);
      }
      else if (res.hasOwnProperty('option') && res.option === 'highlight')
      {
        if (!this.selectedEmployee)
        {
          this.selectedEmployee = res.value;
          this.deleteTarget = this.selectedEmployee.employeeId;
        }
      }
      else if (res.hasOwnProperty('option') && res.option === 'unhighlight')
      {
        this.resetSelection();
      }
    });
  }

  hideSidebar()
  {
    const sidebar = document.getElementsByClassName("sidebar")[0];
    const sidebarCover = document.getElementById('sidebar-cover');

    if (sidebar.classList.contains('shown')) 
    {
      sidebar.classList.toggle('shown');
      sidebarCover.classList.toggle('shown');
    }
  }

  resetSelection(routeHome:boolean = true)
  {
    this.selectedEmployee = undefined;
    this.deleteTarget = undefined;

    if (routeHome)
      this.router.navigate(['/']);
  }

  getEmployees()
  {
    this.employeeService.getEmployees().subscribe
    (
        employees => {
          this.employeeList = employees;
        },
        error =>  {
          this.handleError(error);
        }
    );
  }

  handleError(error)
  {
    if (error.includes('504'))
    {
      this.router.navigate(['error/504']);
    }
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
      this.employeeService.delete(this.deleteTarget).subscribe(
          () => {
            this.resetSelection();
            this.initiateFilter(false, false);
            this.router.navigate(['/']);
            this.snackBar.open('Employee successfully deleted!', 'OK', {
              duration: 1500
            });
          }
      );
    }
  }

  initiateFilter(snackBar:boolean = true, routeHome:boolean = true)
  {
    this.employeeService.getEmployeesFiltered(this.activeFilter).subscribe(employees => {

      let searchForm = <HTMLInputElement>document.getElementById('search');
      searchForm.value = '';

      this.employeeList = employees;
      this.sortEmployees();

      if (this.selectedEmployee && this.employeeList.filter((e)=>e.employeeId === this.selectedEmployee.employeeId).length === 0)
        this.resetSelection(false);

      if (routeHome)
        this.router.navigate(["/"]);

      if (snackBar)
      {
        this.snackBar.open(`Filtered ${this.activeFilter.gender} employees located in ${this.activeFilter.location_string}`,'OK',{
          duration: 1500
        });
      };
    });
  }

  showAddEmployeeForm()
  {
    this.resetSelection();
    this.router.navigate(['add']);
    this.hideSidebar();
  }

  onCardClick(employee)
  {
    const employeeId = employee.employeeId;
    this.selectedEmployee = employee;
    this.deleteTarget = employeeId;
    this.router.navigate(['edit', employeeId]);
    this.hideSidebar();
  }

  openDeleteDialog()
  {
    let config = new MdDialogConfig();
    let dialogRef = this.dialog.open(DeleteDialogComponent, config);

    dialogRef.componentInstance.employeeName = `${this.selectedEmployee.firstName} ${this.selectedEmployee.lastName}`;

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.deleteEmployee();
    });
  }

  openFilterDialog()
  {
    let config = new MdDialogConfig();
    let dialogRef = this.dialog.open(FilterDialogComponent, config);

    dialogRef.componentInstance.gender_filter = this.activeFilter.gender;
    dialogRef.componentInstance.location_filter = this.activeFilter.location;
    dialogRef.componentInstance.location_string = this.activeFilter.location_string;

    dialogRef.afterClosed().subscribe(result => {
      if (result)
      {
        this.activeFilter = result;
        this.initiateFilter();
      }
    });
  }
}


@Component({
  selector: 'app-delete-dialog',
  templateUrl: './dialog/delete-dialog.component.html',
  styleUrls: ['./dialog/dialog.css']
})
export class DeleteDialogComponent {
  constructor(public dialogRef: MdDialogRef<DeleteDialogComponent>) {}
  employeeName;
}

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './dialog/filter-dialog.component.html',
  styleUrls: ['./dialog/dialog.css']
})
export class FilterDialogComponent{

  gender_filter;
  location_filter;
  location_string;
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

    console.log(this.location_string);
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
