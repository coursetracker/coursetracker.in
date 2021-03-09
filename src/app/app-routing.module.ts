import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'auth';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseComponent } from './components/course/course.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'courses', component: CourseListComponent, canActivate: [AuthGuard] },
  { path: 'courses/:id', component: CourseComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
