import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { DndModule } from 'ng2-dnd';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { TaskComponent } from './task/task.component';
import { TaskService } from './task.service';

import { DateInputComponent } from './components/date-input.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    TaskComponent,
    DateInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DndModule.forRoot(),
    NgbModule.forRoot(),
  ],
  entryComponents: [
    TaskComponent
  ],
  providers: [
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
