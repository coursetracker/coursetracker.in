import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LeaderboardComponent } from "./course/leaderboard/leaderboard.component";
import { UserCourseReportComponent } from "./course/user-course-report/user-course-report.component";
import { FeatureListComponent } from "./project/feature-list/feature-list.component";
import { MyProjectsComponent } from "./project/my-projects/my-projects.component";
import { ProjectFeatureComponent } from "./project/project-feature/project-feature.component";
import { ProjectListComponent } from "./project/project-list/project-list.component";
import { ProjectOverviewComponent } from "./project/project-overview/project-overview.component";
import { ProjectSettingsComponent } from "./project/project-settings/project-settings.component";
import { ProjectTasksComponent } from "./project/project-tasks/project-tasks.component";
import { ProjectComponent } from "./project/project/project.component";
import { RepoDetailsComponent } from "./project/repo-details/repo-details.component";
import { ViewProjectComponent } from "./project/view-project/view-project.component";
import { SonarCloudComponent } from "./project/sonarcloud/sonarcloud.component";
import { CodeSnippetComponent } from "./code-snippet/code-snippet.component";
import { CurriculumListComponent } from "./curriculum/curriculum-list/curriculum-list.component";
import { CurriculumViewComponent } from "./curriculum/curriculum-view/curriculum-view.component";
import { CurriculumLeaderboardComponent } from "./curriculum/curriculum-leaderboard/curriculum-leaderboard.component";
import { CurriculumComponent } from "./curriculum/curriculum/curriculum.component";
import { CurriculumUsersComponent } from "./curriculum/curriculum-users/curriculum-users.component";
import { CurriculumMentorsComponent } from "./curriculum/curriculum-mentors/curriculum-mentors.component";

const routes: Routes = [
  { path: "", redirectTo: "courses", pathMatch: "full" },
  { path: "dashboard", component: DashboardComponent },
  { path: "courses", component: CurriculumListComponent },
  { path: "courses/:id", component: CurriculumComponent, children: [
    { path: "", component:CurriculumViewComponent },
    { path: "curriculum", component: CurriculumViewComponent },
    { path: "users", component: CurriculumUsersComponent },
    { path: "mentors", component: CurriculumMentorsComponent },
    { path: "leaderboard", component: CurriculumLeaderboardComponent },

  ] },
  { path: "login", component: LoginComponent },
  { path: "projects", component: ProjectListComponent },
  { path: "coursereport", component: LeaderboardComponent },
  { path: "coursereport/:userId", component: UserCourseReportComponent },
  { path: ":userId/projects", component: MyProjectsComponent },
  { path: "code", component: CodeSnippetComponent },
  {
    path: "projects/:id",
    component: ViewProjectComponent,
    children: [
      { path: "features/:featureId", component: ProjectFeatureComponent },
      { path: "settings", component: ProjectSettingsComponent },
      { path: "features", component: FeatureListComponent },
      { path: "tasks", component: ProjectTasksComponent },
      { path: "overview", component: ProjectOverviewComponent },
      { path: "repositories/:owner/:repo", component: RepoDetailsComponent },
      {
        path: "repositories/:owner/:repo/quality",
        component: SonarCloudComponent,
      },
      { path: "", redirectTo: "overview", pathMatch: "full" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
