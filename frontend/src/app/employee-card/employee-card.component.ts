import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css']
})
export class EmployeeCardComponent {

  @Input() employee;
  @Input() selectedId;
  photoPath = "../../../assets";

  getPictureLink()
  {
    if (this.employee.photo)
      return `${ this.photoPath }/${ this.employee.photo }`;
    else
      return `${ this.photoPath }/user-icon.svg`;
  }

}
