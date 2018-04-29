import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { DndModule } from 'ng2-dnd';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { TaskComponent } from './task/task.component';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { TaskService } from './task.service';

import { ScopedPipe } from './pipes/scoped.pipe';
import { EllipsisPipe } from './pipes/ellipsis.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    TaskComponent,
    TaskModalComponent,

    ScopedPipe,
    EllipsisPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    DndModule.forRoot(),
    NgbModule.forRoot(),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  entryComponents: [
    TaskComponent,
    TaskModalComponent
  ],
  providers: [
    TaskService,
    ScopedPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
