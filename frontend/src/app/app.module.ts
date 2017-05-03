import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
    MdInputModule,
    MdTooltipModule,
    MdSelectModule,
    MdCardModule,
    MdButtonModule,
    MdIconModule,
    MdTabsModule,
    MdChipsModule,
    MdDialogModule,
    MdSnackBarModule,
    MdMenuModule
} from '@angular/material';
import { DatePipe } from '@angular/common';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';

import { AppComponent, DeleteDialogComponent, FilterDialogComponent } from './app.component';
import { UtilityList, UtilityToken } from './providers';
import { EmployeeService } from './service/employee.service';
import { LocationService } from './service/location.service';
import { DivisionService } from './service/division.service';
import { SharedService } from './service/shared-service.service';
import { GradeService } from './service/grade.service';
import { EmployeeCardComponent } from './employee-card/employee-card.component';
import { EmployeeFormComponent, ErrorDialogComponent } from './employee-form/employee-form.component';
import { routing } from './app.routing';
import { EmployeeContainerPlaceholderComponent } from './employee-container-placeholder/employee-container-placeholder.component';
import { EmployeeErrorComponent } from './employee-error/employee-error.component';

@NgModule({
  imports: [
      Angular2FontawesomeModule,
      BrowserModule,
      BrowserAnimationsModule,
      ReactiveFormsModule,
      FormsModule,
      HttpModule,
      routing,
      MdInputModule,
      MdTooltipModule,
      MdSelectModule,
      MdCardModule,
      MdButtonModule,
      MdIconModule,
      MdTabsModule,
      MdChipsModule,
      MdDialogModule,
      MdSnackBarModule,
      MdMenuModule
  ],
  declarations: [
      AppComponent,
      DeleteDialogComponent,
      FilterDialogComponent,
      ErrorDialogComponent,
      EmployeeCardComponent,
      EmployeeFormComponent,
      EmployeeContainerPlaceholderComponent,
      EmployeeErrorComponent
  ],
  entryComponents: [
      DeleteDialogComponent,
      FilterDialogComponent,
      ErrorDialogComponent
  ],
  providers: [
      EmployeeService,
      LocationService,
      GradeService,
      DivisionService,
      SharedService,
      DatePipe,
      { provide: UtilityToken, useValue: UtilityList }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
