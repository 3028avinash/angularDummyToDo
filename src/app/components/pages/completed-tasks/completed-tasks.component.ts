import { Component, inject } from '@angular/core';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';
import { HttpService } from '../../../services/http.service';
@Component({
  selector: 'app-completed-tasks',
  standalone: true,
  imports: [PageTitleComponent, TaskListComponent],
  templateUrl: './completed-tasks.component.html',
  styleUrl: './completed-tasks.component.scss',
})
export class CompletedTasksComponent {
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
      this.taskList = result.filter((x: any) => x.completed == true);
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
