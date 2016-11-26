import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ng2-bootstrap/ng2-bootstrap';

import { ClassRegistration } from './class_registration.component';
import { CourseDetailsComponent } from './course_details.component'

import { FriendService, AlertService, CourseService } from '../_services/index';

export const routes = [
  {path: '', component: ClassRegistration, pathMatch: 'full'}
];

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    ClassRegistration,
    CourseDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    Ng2TableModule,
    PaginationModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    FriendService,
    AlertService,
    CourseService
  ]
})
export default class RegistrationModule {
  static routes = routes;
}