import { Component } from '@angular/core';
import { Meal } from '../model/meal';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-meal-list',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatTableModule, MatIconModule, DatePipe, HttpClientModule],
  templateUrl: './meal-list.component.html',
  styleUrl: './meal-list.component.css'
})
export class MealListComponent {

  title = 'Meal List';
  loading = true;
  meals: Meal[] = [];
  displayedColumns = ['name', 'rating', 'easeOfPrep', 'lastUsedDate', 'actions'];
  feedback: any = {};

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.loading = true;
    this.http.get<Meal[]>('retirementplanner/meals').subscribe((data: Meal[]) => {
      this.meals = data;
      this.loading = false;
      this.feedback = {};
    });
  }

  delete(meal: Meal): void {
    if (confirm(`Are you sure you want to delete ${meal.name}?`)) {
      this.http.delete(`retirementplanner/meal/${meal.id}`).subscribe({
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

      this.http.get<Meal[]>('retirementplanner/meals').subscribe((data: Meal[]) => {
        this.meals = data;
        this.loading = false;
        this.feedback = {};
      });
    }
  }


}
