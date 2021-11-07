import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ProjectListComponent } from "./project/project-list/project-list.component";
import { ViewProjectComponent } from "./project/view-project/view-project.component";
import { MyProjectsComponent } from "./project/my-projects/my-projects.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ProjectComponent } from "./project/project/project.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HeaderBarComponent } from './theme/header-bar/header-bar.component';
import { LayoutComponent } from './theme/layout/layout.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProjectFeatureComponent } from './project/project-feature/project-feature.component';
import { LeaderboardComponent } from './course/leaderboard/leaderboard.component';
import { UserCourseReportComponent } from './course/user-course-report/user-course-report.component';
import { LoginComponent } from './auth/login/login.component';
import { ProjectSettingsComponent } from './project/project-settings/project-settings.component';
import { CommonModule } from "@angular/common";
import { ProjectHeaderComponent } from './project/project-header/project-header.component';
import { FeatureListComponent } from './project/feature-list/feature-list.component';
import { ProjectOverviewComponent } from './project/project-overview/project-overview.component';
import { ProjectTasksComponent } from './project/project-tasks/project-tasks.component';
import { MarkdownPipe } from './markdown.pipe';
import { ProjectBoardComponent } from './project/project-board/project-board.component';
import { RepoDetailsComponent } from './project/repo-details/repo-details.component';
import { MomenttimePipe } from './momenttime.pipe';
import { GithubHeaderComponent } from './project/github-header/github-header.component';
import { SonarCloudComponent } from "./project/sonarcloud/sonarcloud.component";
import { CodeSnippetComponent } from './code-snippet/code-snippet.component';
import { SafePipe } from './safe.pipe';
import { UserHeaderComponent } from './project/user-header/user-header.component';
import { BadgeComponent } from './badge/badge.component';
import { CurriculumListComponent } from './curriculum/curriculum-list/curriculum-list.component';
import { CurriculumViewComponent } from './curriculum/curriculum-view/curriculum-view.component';
import { CurriculumLeaderboardComponent } from './curriculum/curriculum-leaderboard/curriculum-leaderboard.component';
import { CurriculumComponent } from './curriculum/curriculum/curriculum.component';
import { CurriculumHeaderComponent } from './curriculum/curriculum-header/curriculum-header.component';
import { CurriculumMentorsComponent } from './curriculum/curriculum-mentors/curriculum-mentors.component';
import { CurriculumUsersComponent } from './curriculum/curriculum-users/curriculum-users.component';
import { CurriculumProvidersComponent } from './curriculum/curriculum-providers/curriculum-providers.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    ViewProjectComponent,
    MyProjectsComponent,
    DashboardComponent,
    ProjectComponent,
    HeaderBarComponent,
    LayoutComponent,
    ProjectFeatureComponent,
    LeaderboardComponent,
    UserCourseReportComponent,
    LoginComponent,
    ProjectSettingsComponent,
    ProjectHeaderComponent,
    FeatureListComponent,
    ProjectOverviewComponent,
    ProjectTasksComponent,
    MarkdownPipe,
    ProjectBoardComponent,
    RepoDetailsComponent,
    MomenttimePipe,
    GithubHeaderComponent,
    SonarCloudComponent,
    CodeSnippetComponent,
    SafePipe,
    UserHeaderComponent,
    BadgeComponent,
    CurriculumListComponent,
    CurriculumViewComponent,
    CurriculumLeaderboardComponent,
    CurriculumComponent,
    CurriculumHeaderComponent,
    CurriculumMentorsComponent,
    CurriculumUsersComponent,
    CurriculumProvidersComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(), 

    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[NO_ERRORS_SCHEMA]
})
export class AppModule {}
