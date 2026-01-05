import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-task-reports',
  standalone: true,
  imports: [
    FormsModule,
    MatRadioModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    HttpClientModule
  ],
  templateUrl: './task-reports.component.html',
  styleUrl: './task-reports.component.css'
})
export class TaskReportsComponent {
  emailRequired = false;
  feedback: any = {};

  constructor(private route: ActivatedRoute, private router: Router,
    private http: HttpClient) {
  }

  async oneOff() {
    console.log("one off task report");

    let body = new HttpParams();
    body = body.set('emailRequired', this.emailRequired);

    this.http.post(`retirementplanner/report/oneOffTaskReport`, body).subscribe({
      next: () => {
        this.feedback = { type: 'success', message: 'Report generated' };
        setTimeout(async () => {
          await this.router.navigate(['/tasks']);
        }, 1000);
      },
      error: () => {
        this.feedback = { type: 'error', message: 'Error report generation error' };
      }
    });
  }

  async repeatable() {
    console.log("repeatable task report");

    let body = new HttpParams();
    body = body.set('emailRequired', this.emailRequired);

    this.http.post(`retirementplanner/report/repeatableTaskReport`, body).subscribe({
      next: () => {
        this.feedback = { type: 'success', message: 'Report generated' };
        setTimeout(async () => {
          await this.router.navigate(['/tasks']);
        }, 1000);
      },
      error: () => {
        this.feedback = { type: 'error', message: 'Error report generation error' };
      }
    });
  }

  async expiring() {
    console.log("expiring task report");

    let body = new HttpParams();
    body = body.set('emailRequired', this.emailRequired);

    this.http.post(`retirementplanner/report/expiringTaskReport`, body).subscribe({
      next: () => {
        this.feedback = { type: 'success', message: 'Report generated' };
        setTimeout(async () => {
          await this.router.navigate(['/tasks']);
        }, 1000);
      },
      error: () => {
        this.feedback = { type: 'error', message: 'Error report generation error' };
      }
    });
  }
}
