import {Component, OnInit, Input, Output, EventEmitter, Injectable} from '@angular/core';
import {NgbDateStruct, NgbDateAdapter} from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class NgbDateNativeAdapter extends NgbDateAdapter<Date> {
  fromModel(date: Date): NgbDateStruct {
    date = new Date(date);
    return (date && date.getFullYear) ? {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()} : null;
  }

  toModel(date: NgbDateStruct): Date {
    return date ? new Date(date.year, date.month - 1, date.day) : null;
  }
}

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class DateInputComponent implements OnInit {
  constructor() {
  }

  @Input() date;
  @Output() change: EventEmitter<any> = new EventEmitter();

  onChange() {
    this.change.emit(this.date);
  }

  ngOnInit() {
  }
}
