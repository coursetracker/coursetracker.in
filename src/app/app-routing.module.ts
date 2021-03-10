import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'auth';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseComponent } from './components/course/course.component';
import { SearchComponent } from './components/search/search.component';
import { UsercoursesComponent } from './usercourses/usercourses.component';

const routes: Routes = [
  { path: 'search', component: SearchComponent, canActivate: [] },
  {
    path: 'courses',
    component: CourseListComponent,
    canActivate: [],
  },
  {
    path: ':username/courses',
    component: UsercoursesComponent,
    canActivate: [],
  },
  {
    path: ':username/courses/:id',
    component: CourseComponent,
    canActivate: [],
  },
  { path: '', redirectTo: 'search', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
