import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, of, switchMap } from 'rxjs';
import { Meal } from '../model/meal';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-meal-edit',
  standalone: true,
  imports: [FormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
    MatTooltipModule,
    RouterLink],
  templateUrl: './meal-edit.component.html',
  styleUrl: './meal-edit.component.css'
})
export class MealEditComponent {

  meal!: Meal;
  feedback: any = {};

  constructor(private route: ActivatedRoute, private router: Router,
    private http: HttpClient) {
  }

  ngOnInit() {
    this.route.params.pipe(
      map(p => p['id']),
      switchMap(id => {
        if (id === 'new') {
          return of(new Meal());
        }
        return this.http.get<Meal>(`retirementplanner/meal/${id}`);
      })
    ).subscribe({
      next: meal => {
        this.meal = meal;
        this.feedback = {};
      },
      error: () => {
        this.feedback = { type: 'warning', message: 'Error loading' };
      }
    });
  }

  save() {
    const id = this.meal.id;
    const method = id ? 'put' : 'post';

    console.log("test");
    this.http[method](`/retirementplanner/meal${id ? '/' + id : ''}`, this.meal).subscribe({
      next: () => {
        this.feedback = { type: 'success', message: 'Save was successful!' };
        setTimeout(async () => {
          await this.router.navigate(['/meals']);
        }, 1000);
      },
      error: () => {
        this.feedback = { type: 'error', message: 'Error saving - possible duplicate' };
      }
    });
  }

  async cancel() {
    await this.router.navigate(['/meals']);
  }


}
