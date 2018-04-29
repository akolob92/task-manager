import {Component, OnInit} from '@angular/core';
import {TaskService} from './task.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  scope: String;
  scopes: String[];

  constructor() {
    this.scopes = [
      'all',
      'coming',
      'expired',
      'closed',
    ];

    this.scope = 'all';
  }
}
