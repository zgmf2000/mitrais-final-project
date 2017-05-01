import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdIconModule } from '@angular/material';

@Component({
  selector: 'app-employee-not-found',
  templateUrl: './employee-error.component.html',
  styleUrls: ['./employee-error.component.css']
})
export class EmployeeErrorComponent implements OnInit {

  errorTitle;
  errorMessage;
  errorHint;

  constructor(private activatedRoute: ActivatedRoute)
  {
    this.activatedRoute.params.subscribe(params => {
      switch(params['error_code'])
      {
        case '404':
          this.errorTitle = '404 Not Found';
          this.errorMessage = `Sorry, but we're unable to find the page you're looking for.`;
          this.errorHint = `Are you looking for employees? Start looking at the sidebar.`;
          break;
        case '504':
          this.errorTitle = '504 Gateway Timeout';
          this.errorMessage = `Sorry, but we're unable to get data from the host.`;
          this.errorHint = `Is your Internet connection working? This is usually caused by not having a working Internet connection.`;
          break;
      }
    });
  }

  ngOnInit() {
  }

}
