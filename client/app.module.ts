import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent} from './_directives/index';
import { AuthGuard } from './_guards/index';
import { ProfileService, AlertService, AuthenticationService, UserService, CourseService, PasswordService, FriendService, ClassroomService } from './_services/index';
import { RegisterComponent, LoginComponent, ForgotPasswordComponent } from './login/index';
import { DashboardComponent } from './dashboard/index';

import { MyProfileComponent, EditProfileComponent} from './myprofile/index';
import { SearchCourseComponent, CourseDetailsComponent } from './class_registration/index';
import { RoomComponent } from './classrooms/index';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        LoginComponent,
        RegisterComponent,
        ForgotPasswordComponent,
        DashboardComponent,

        MyProfileComponent,
        EditProfileComponent,
        SearchCourseComponent,
        CourseDetailsComponent,

        RoomComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        ProfileService,
        CourseService,
        PasswordService,
        FriendService,
        ClassroomService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
