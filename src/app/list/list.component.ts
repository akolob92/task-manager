import {Component, OnInit, ViewChild} from '@angular/core';
import {Task} from '../task';
import {TaskService} from '../task.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {TaskComponent} from '../task/task.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  tasks: Task[];

  isExpired(date) {
    return (new Date(date)).valueOf() < (new Date()).valueOf();
  }

  isSoon(date) {
    const threeDaysInMs = 1000 * 60 * 60 * 24 * 3;
    const diff = ((new Date(date)).valueOf() - (new Date()).valueOf());
    return diff > 0 && diff < threeDaysInMs;
  }

  getTasks(): void {
    this.tasks = this.taskService.getTasks();
  }

  editTask(task): void {
    const modal = this.modalService.open(TaskComponent, {size: 'lg'});
    modal.componentInstance.task = Object.assign({}, task);

    modal.result.then((result) => {
      this.taskService.updateTask(task.id, result);
      this.taskService.saveTasks();
    }, () => {});
  }

  deleteTask(task): void {
    this.taskService.deleteTask(task);
  }

  createTask(): void {
    const newTask: Task = {header: 'New Task', closed: false, date: (new Date()).toISOString()};

    const modal = this.modalService.open(TaskComponent, {size: 'lg'});
    modal.componentInstance.task = newTask;

    modal.result.then((result) => {
      this.taskService.createTask(result);
    }, () => {});
  }

  closeTask(task): void {
    this.taskService.closeTask(task);
  }

  onMove(task: Task, position: number) {
    this.taskService.moveTask(task, position);
  }

  constructor(public taskService: TaskService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.getTasks();
  }
}


