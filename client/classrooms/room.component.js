"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var index_1 = require("../_services/index");
var RoomComponent = (function () {
    function RoomComponent(classroomService, profileService, alertService, courseService, friendService) {
        this.classroomService = classroomService;
        this.profileService = profileService;
        this.alertService = alertService;
        this.courseService = courseService;
        this.friendService = friendService;
        this.hasInClass = false;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.roomInfo = {};
        this.languages = [];
        // private majors: any[] = [];
        this.hobbies = [];
        this.preference = {
            "nationality": "",
            "hobby": "",
            "language": ""
        };
    }
    RoomComponent.prototype.ngOnInit = function () {
        this.getEnrolledClasses();
        this.getAllChoices();
    };
    RoomComponent.prototype.getEnrolledClasses = function () {
        var _this = this;
        this.classroomService.getUserCourseList().subscribe(function (data) {
            _this.userClasses = data.courses;
        });
    };
    RoomComponent.prototype.getAllStudents = function () {
        var _this = this;
        this.courseService.getStudents(this.roomInfo.course, this.roomInfo.professor).subscribe(function (data) {
            _this.studentList = data;
        });
    };
    RoomComponent.prototype.getAllChoices = function () {
        var _this = this;
        this.profileService.getAllLanguages().subscribe(function (data) {
            _this.languages = data;
        });
        this.profileService.getAllHobbies().subscribe(function (data) {
            _this.hobbies = data;
        });
        // this.profileService.getAllMajors().subscribe(
        //     data => {
        //         this.majors = data.value;
        //     }
        // );
    };
    RoomComponent.prototype.filterStudents = function () {
        var _this = this;
        this.friendService.filterStudents(this.preference, this.currentUser.userName, this.roomInfo.course, this.roomInfo.professor)
            .subscribe(function (data) {
            _this.studentList = data;
        });
    };
    RoomComponent.prototype.getNumOfStudents = function () {
        var _this = this;
        this.courseService.getNumOfStudents(this.roomInfo.course, this.roomInfo.professor).subscribe(function (data) {
            _this.numOfStudents = data.number;
        });
    };
    RoomComponent.prototype.chat = function () {
        this.chatUrl = "/chat.html?name=" + this.currentUser.userName + "&room=" + this.roomInfo.course;
    };
    RoomComponent.prototype.update = function (room) {
        this.roomInfo = room;
        this.getAllStudents();
        this.getNumOfStudents();
        this.hasInClass = true;
    };
    RoomComponent.prototype.sendRequest = function (reciever) {
        var _this = this;
        this.friendService.sendFriendReq(this.currentUser.userName, reciever).subscribe(function (data) {
            _this.alertService.success("Sent Request!");
        }, function (error) {
            _this.alertService.error(error);
        });
    };
    return RoomComponent;
}());
RoomComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'room.component.html',
        styleUrls: ['room.component.css']
    }),
    __metadata("design:paramtypes", [index_1.ClassroomService,
        index_1.ProfileService,
        index_1.AlertService,
        index_1.CourseService,
        index_1.FriendService])
], RoomComponent);
exports.RoomComponent = RoomComponent;
//# sourceMappingURL=room.component.js.map