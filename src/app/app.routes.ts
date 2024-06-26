import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { MealListComponent } from './meal-list/meal-list.component';
import { MealEditComponent } from './meal-edit/meal-edit.component';
import { BackupComponent } from './backup/backup.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'tasks',
    component: TaskListComponent
  },
  {
    path: 'task/:id',
    component: TaskEditComponent
  },
  {
    path: 'meals',
    component: MealListComponent
  },
  {
    path: 'meal/:id',
    component: MealEditComponent
  },
  {
    path: 'backup',
    component: BackupComponent
  }
];