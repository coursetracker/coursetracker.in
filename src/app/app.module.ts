import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule, ThemeModule } from '@nareshkumarh/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthModule, JwtInterceptor } from 'auth';
import { environment } from 'src/environments/environment';
import { SearchComponent } from './components/search/search.component';
import { CourseComponent } from './components/course/course.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    CourseComponent,
    CourseListComponent,
    AddCourseComponent,
  ],
  imports: [
    BrowserModule,
    ThemeModule,
    AuthModule.forRoot({
      API_ENDPOINT: environment.API_URL,
      USER_TYPE: 'T',
      ORG_ID: 'spinsoft',
    }),
    MaterialModule,
    MatCheckboxModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
