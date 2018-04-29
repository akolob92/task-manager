import {Component, Input, OnInit, ViewChild, Pipe} from '@angular/core';
import {Task} from '../task';
import {TaskService} from '../task.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {TaskModalComponent} from '../task-modal/task-modal.component';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  @Input() task: Task;

  editTask(task): void {
    const modal = this.modalService.open(TaskModalComponent, {size: 'lg', windowClass: 'shadowed'});
    modal.componentInstance.task = task;

    modal.result.then(() => {
      this.taskService.saveTasks();
    }, () => {
    });
  }

  deleteTask(task): void {
    this.taskService.deleteTask(task);
  }

  toggleTask(task): void {
    task.toggle();
    this.taskService.saveTasks();
  }

  onMove() {
    this.taskService.saveTasks();
  }

  constructor(public taskService: TaskService,
              private modalService: NgbModal) {
  }
}


