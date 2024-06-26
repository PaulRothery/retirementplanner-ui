import { Component } from '@angular/core';
import { Task } from '../model/task';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatTableModule, MatIconModule, DatePipe, HttpClientModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  title = 'Task List';
  selected = 'All';
  loading = true;
  tasks: Task[] = [];
  displayedColumns = ['name', 'lastCompletedDate', 'expirationDate', 'targetDate', 'repeatCycle', 'completed', 'creationDate', 'actions'];
  feedback: any = {};

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    console.log("loading tasks...");
    this.loading = true;
    this.http.get<Task[]>('retirementplanner/tasks').subscribe((data: Task[]) => {
      this.tasks = data;
      this.loading = false;
      this.feedback = {};
    });
  }

  delete(task: Task): void {
    if (confirm(`Are you sure you want to delete ${task.name}?`)) {
      this.http.delete(`retirementplanner/task/${task.id}`).subscribe({
        next: () => {
          this.feedback = { type: 'success', message: 'Delete was successful!' };
          setTimeout(() => {
            this.ngOnInit();
          }, 1000);
        },
        error: () => {
          this.feedback = { type: 'warning', message: 'Error deleting.' };
        }
      });

      this.http.get<Task[]>('retirementplanner/tasks').subscribe((data: Task[]) => {
        this.tasks = data;
        this.loading = false;
        this.feedback = {};
      });
    }
  }

  inputChange() {

    let reportType = '';
    if (this.selected == 'all') {
      this.selected = '';
    }
    if (this.selected == 'repeatable') {
      reportType = '/repeatable';

    }
    if (this.selected == 'expiry') {
      reportType = '/expiry';
    }
    if (this.selected == 'one off') {
      reportType = '/oneoff';
    }

    this.http.get<Task[]>('retirementplanner/tasks' + reportType).subscribe((data: Task[]) => {
      this.tasks = data;
      this.loading = false;
      this.feedback = {};
    });

  }


}