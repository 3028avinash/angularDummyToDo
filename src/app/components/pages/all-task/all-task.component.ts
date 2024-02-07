import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-all-task',
  standalone: true,
  imports: [FormsModule, DatePipe, PageTitleComponent, TaskListComponent],
  templateUrl: './all-task.component.html',
  styleUrl: './all-task.component.scss',
})
export class AllTaskComponent {
  newTask = '';
  initialTaskList: any[] = [];
  taskList: any[] = [];
  stateService = inject(StateService);
  ngOnInit() {
    this.stateService.searchSubject.subscribe((value) => {
      if (value) {
        this.taskList = this.initialTaskList.filter((x) =>
          x.title.toLowerCase().includes(value.toLowerCase())
        );
      } else {
        this.taskList = this.initialTaskList;
      }
    });
    this.getAllTask();
  }

  httpService = inject(HttpService);
  addTask() {
    console.log('AddTask', this.newTask);
    this.httpService.addTask(this.newTask).subscribe(() => {
      console.log('Added');
      this.newTask = '';
      this.getAllTask();
    });
  }

  getAllTask() {
    this.httpService.getAllTasks().subscribe((result: any) => {
      this.initialTaskList = this.taskList = result;
    });
  }

  onImportant(task: any) {
    task.important = true;
    this.httpService.updateTask(task).subscribe(() => {
      this.getAllTask();
    });
  }

  onComplete(task: any) {
    task.completed = true;
    this.httpService.updateTask(task).subscribe(() => {
      this.getAllTask();
    });
  }
}
