import { CommonModule } from '@angular/common';
import { Component, Input, inject, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  @Input() taskList: any[] = [];
  @Output() important = new EventEmitter<any>();
  markImportant(task: any) {
    task.completed=true
    this.important.emit(task);
  }

  @Output() complete = new EventEmitter<any>();
  markCompleted(task: any) {
    this.complete.emit(task);
  }
}
