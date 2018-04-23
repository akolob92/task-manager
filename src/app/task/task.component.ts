import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../task';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  copy: Task;
  @Input() task: Task;
  constructor(
    public activeModal: NgbActiveModal,
  ) {}

  save() {
    this.activeModal.close(this.task);
  }
  cancel() {
    this.task = Object.assign({}, this.copy);
    this.activeModal.dismiss();
  }
  ngOnInit() {
    this.copy = Object.assign({}, this.task);
  }

}
