import { Component, inject } from '@angular/core';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-important-tasks',
  standalone: true,
  imports: [PageTitleComponent, TaskListComponent],
  templateUrl: './important-tasks.component.html',
  styleUrl: './important-tasks.component.scss',
})
export class ImportantTasksComponent {
  newTask = '';
  taskList: any[] = [];

  ngOnInit() {
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
      this.taskList = result.filter((x: any) => x.important == true);
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
