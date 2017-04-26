import { Routes, RouterModule } from '@angular/router';

import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeContainerPlaceholderComponent } from './employee-container-placeholder/employee-container-placeholder.component';

const appRoutes: Routes = [
    { path: '', component: EmployeeContainerPlaceholderComponent },
    { path: 'add', component: EmployeeFormComponent },
    { path: 'edit/:employee_id', component: EmployeeFormComponent }
];

export const routing = RouterModule.forRoot(appRoutes);