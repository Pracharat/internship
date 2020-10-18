import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DisburseService } from '@app-services/disburse/disburse.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-eligible-person',
  templateUrl: './eligible-person.component.html',
  styleUrls: ['./eligible-person.component.scss']
})
export class EligiblePersonComponent implements OnInit, OnChanges {

  private urlEmployee = 'http://localhost:8080/apigw/api/v1/employee';

  @Input() id: string;
  personName: string;

  constructor(
    private disburseService: DisburseService,
  ) { }

  ngOnInit() {
    this.getEmployeeById();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getEmployeeById();
  }

  private getEmployeeById() {
    // console.log(id);
    if (!this.id) {
      this.personName = '';
      return;
    }

    this.disburseService.getEmployee(this.urlEmployee, this.id).pipe(
      // filter(employee => !!employee),
      map(employee => {
        return `${employee.firstname} ${employee.lastname}`;
      }),
    ).subscribe(name => {
      this.personName = name;
    });
  }

}
