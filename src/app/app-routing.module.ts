import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LectureEditorComponent } from './components/lecture-editor/lecture-editor.component';
import { AnnouncementsCardComponent } from './components/announcements-card/announcements-card.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'editor',
    component: LectureEditorComponent
  },
  {
    path: 'course/:courseId',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'announcements',
        pathMatch: 'full'
      },
      {
        path: 'announcements',
        component: AnnouncementsCardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
