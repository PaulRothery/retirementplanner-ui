import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, of, switchMap } from 'rxjs';
import { Task } from '../model/task';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerControl, MatDatepickerModule, MatDatepickerPanel } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatSelectModule,
    MatRadioModule,
    RouterLink
  ],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css'
})
export class TaskEditComponent implements OnInit {
  task!: Task;
  feedback: any = {};

  constructor(private route: ActivatedRoute, private router: Router,
    private http: HttpClient) {
  }

  ngOnInit() {
    this.route.params.pipe(
      map(p => p['id']),
      switchMap(id => {
        if (id === 'new') {
          return of(new Task());
        }
        return this.http.get<Task>(`retirementplanner/task/${id}`);
      })
    ).subscribe({
      next: task => {
        this.task = task;
        this.feedback = {};
      },
      error: () => {
        this.feedback = { type: 'warning', message: 'Error loading' };
      }
    });
  }

  save() {
    const id = this.task.id;
    const method = id ? 'put' : 'post';

    console.log("test");
    this.http[method](`/retirementplanner/task${id ? '/' + id : ''}`, this.task).subscribe({
      next: () => {
        this.feedback = { type: 'success', message: 'Save was successful!' };
        setTimeout(async () => {
          await this.router.navigate(['/tasks']);
        }, 1000);
      },
      error: () => {
        this.feedback = { type: 'error', message: 'Error saving - possible duplicate' };
      }
    });
  }

  async cancel() {
    await this.router.navigate(['/tasks']);
  }


}