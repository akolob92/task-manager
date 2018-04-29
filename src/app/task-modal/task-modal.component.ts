import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

import {Task} from '../task';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css']
})
export class TaskModalComponent implements OnInit {

  taskForm: FormGroup;

  header: FormControl;
  description: FormControl;
  date: FormControl;

  copy: Task;
  @Input() task: Task;

  constructor(public activeModal: NgbActiveModal) {
  }

  save() {
    this.task.save(this.copy);
    this.copy = null;
    this.activeModal.close(this.task);
  }

  cancel() {
    this.copy = null;
    this.activeModal.dismiss();
  }

  ngOnInit() {
    this.copy = new Task(this.task);
    this.initForm();
  }

  initForm() {
    this.header = new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(255),
      Validators.required
    ]);

    this.description = new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(2048),
      Validators.required
    ]);

    this.date = new FormControl(
      Validators.required
    );

    this.taskForm = new FormGroup({
      header: this.header,
      description: this.description,
      date: this.date
    });
  }

}
