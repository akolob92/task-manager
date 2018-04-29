import {Component, Input, OnInit, OnChanges, ViewChild, Pipe, SimpleChange, SimpleChanges} from '@angular/core';
import {Task} from '../task';
import {TaskService} from '../task.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {TaskModalComponent} from '../task-modal/task-modal.component';
import {ScopedPipe} from '../pipes/scoped.pipe';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit, OnChanges {
  tasks: Task[] = [];

  @Input() scope: String;


  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => {
        this.tasks = this.scopedPipe.transform(tasks, this.scope);
      });
  }

  createTask(): void {
    const newTask: Task = new Task({closed: false, date: (new Date()).toISOString()});

    const modal = this.modalService.open(TaskModalComponent, {size: 'lg', windowClass: 'shadowed'});

    modal.componentInstance.task = newTask;

    modal.result.then((data) => {
      this.taskService.createTask(data);
    }, () => {
      // do nothing
    });
  }

  onMove() {
    this.taskService.saveTasks();
  }

  constructor(public taskService: TaskService,
              private modalService: NgbModal,
              private scopedPipe: ScopedPipe) {
  }

  ngOnChanges(changes: SimpleChanges) {
    const scope: SimpleChange = changes.scope;
    if (scope.previousValue !== scope.currentValue) {
      this.getTasks();
    }
  }

  ngOnInit() {
    this.getTasks();
  }
}


