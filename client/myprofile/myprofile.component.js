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
var core_1 = require('@angular/core');
var index_1 = require('../_services/index');
var dashboard_component_1 = require('../dashboard/dashboard.component');
var MyProfileComponent = (function () {
    function MyProfileComponent(alertService, userService, profileService, dashboardComponent) {
        var _this = this;
        this.alertService = alertService;
        this.userService = userService;
        this.profileService = profileService;
        this.dashboardComponent = dashboardComponent;
        this.currentUser = {};
        this.myProfile = {};
        this.currentUser = this.dashboardComponent.currentUser;
        this.profileService.getProfile()
            .subscribe(function (data) {
            _this.myProfile = JSON.parse(localStorage.getItem('profile'));
            // todo: need to update this local storage method later
            // console.log(JSON.stringify(data));
            // console.log(JSON.parse(localStorage.getItem('profile')));
        }, function (error) {
            _this.alertService.error(error);
        });
    }
    MyProfileComponent.prototype.ngOnInit = function () { };
    MyProfileComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'myprofile.component.html'
        }), 
        __metadata('design:paramtypes', [index_1.AlertService, index_1.UserService, index_1.ProfileService, dashboard_component_1.DashboardComponent])
    ], MyProfileComponent);
    return MyProfileComponent;
}());
exports.MyProfileComponent = MyProfileComponent;
//# sourceMappingURL=myprofile.component.js.map