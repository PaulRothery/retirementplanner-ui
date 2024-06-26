import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Task } from '../model/task';

@Component({
  selector: 'app-backup',
  standalone: true,
  imports: [RouterLink, MatButtonModule, HttpClientModule],
  templateUrl: './backup.component.html',
  styleUrl: './backup.component.css'
})


export class BackupComponent {

  title = 'Task List';
  loading = true;
  result: String[] = [];
  feedback: any = {};


  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.loading = true;
    this.http.get<String[]>('retirementplanner/backup').subscribe((data: String[]) => {
      this.result = data;

      console.log(this.result)
    });
  }
}
