webpackJsonpac__name_([13],{

/***/ "./src/app/profile/profile.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var index_1 = __webpack_require__("./src/app/_services/index.ts");
var Profile = (function () {
    function Profile(alertService, profileService, friendService) {
        this.alertService = alertService;
        this.profileService = profileService;
        this.friendService = friendService;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.myProfile = {
            "extra": {
                "language": [],
                "hobby": []
            },
            "profile": {
                "major": "Unknown",
                "birthday": "",
                "nationality": "Unknown",
                "gender": "Unknown",
                "visibility": true,
            }
        };
        this.visibilities = [
            { value: true, display: "Public" },
            { value: false, display: "Private" }
        ];
        this.toEdit = false;
    }
    /* My Profile */
    Profile.prototype.ngOnInit = function () {
        this.getAllChoices();
        this.fetchProfile();
        this.fetchFriendList();
    };
    Profile.prototype.fetchProfile = function () {
        var _this = this;
        this.profileService.getProfile(this.currentUser.userName)
            .subscribe(function (data) {
            _this.myProfile = data;
            // console.log(this.myProfile.profile.major);
        }, function (error) {
            _this.alertService.error(error);
        });
    };
    Profile.prototype.fetchFriendList = function () {
        var _this = this;
        this.friendService.getFriends(this.currentUser.userName).subscribe(function (data) {
            _this.friendList = data;
        });
    };
    /* Edit Profile */
    Profile.prototype.editProfile = function () {
        var _this = this;
        console.log(this.myProfile);
        this.profileService.editProfile(this.currentUser.userName, this.myProfile)
            .subscribe(function (data) {
            // successfully edit the profile
            _this.toEdit = false;
            _this.alertService.success('Successfully edit the profile');
        }, function (err) {
            _this.alertService.error(err.message);
        });
    };
    Profile.prototype.edit = function () {
        this.toEdit = true;
    };
    Profile.prototype.getAllChoices = function () {
        var _this = this;
        this.profileService.getAllLanguages().subscribe(function (data) {
            _this.languages = data;
        });
        this.profileService.getAllHobbies().subscribe(function (data) {
            _this.hobbies = data;
        });
        this.profileService.getAllMajors().subscribe(function (data) {
            _this.majors = data.value;
        });
    };
    Profile = __decorate([
        core_1.Component({
            selector: '[profile]',
            moduleId: module.i,
            template: __webpack_require__("./src/app/profile/profile.template.html"),
            encapsulation: core_1.ViewEncapsulation.None,
            styles: [__webpack_require__("./src/app/profile/profile.style.scss")]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof index_1.AlertService !== 'undefined' && index_1.AlertService) === 'function' && _a) || Object, (typeof (_b = typeof index_1.ProfileService !== 'undefined' && index_1.ProfileService) === 'function' && _b) || Object, (typeof (_c = typeof index_1.FriendService !== 'undefined' && index_1.FriendService) === 'function' && _c) || Object])
    ], Profile);
    return Profile;
    var _a, _b, _c;
}());
exports.Profile = Profile;


/***/ },

/***/ "./src/app/profile/profile.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var common_1 = __webpack_require__("./node_modules/@angular/common/index.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/index.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/index.js");
var profile_component_1 = __webpack_require__("./src/app/profile/profile.component.ts");
var index_1 = __webpack_require__("./src/app/_services/index.ts");
exports.routes = [
    { path: '', component: profile_component_1.Profile, pathMatch: 'full' }
];
var FormModule = (function () {
    function FormModule() {
    }
    FormModule.routes = exports.routes;
    FormModule = __decorate([
        core_1.NgModule({
            declarations: [
                // Components / Directives/ Pipes
                profile_component_1.Profile
            ],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                router_1.RouterModule.forChild(exports.routes),
            ],
            providers: [
                index_1.UserService,
                index_1.ProfileService,
                index_1.FriendService,
                index_1.AlertService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], FormModule);
    return FormModule;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FormModule;


/***/ },

/***/ "./src/app/profile/profile.style.scss":
/***/ function(module, exports) {

module.exports = "/***********************************/\n/**          Post Links           **/\n/***********************************/\n.post-links {\n  margin-bottom: 0;\n  font-size: 0.875rem;\n  padding-left: 0; }\n  .post-links::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n  .post-links > li {\n    float: left;\n    list-style: none; }\n    .post-links > li + li:before {\n      color: #999;\n      content: \"\\25cf\";\n      padding: 0 8px; }\n    .post-links > li > a {\n      text-decoration: none;\n      color: #999999; }\n      .post-links > li > a:hover {\n        color: #999999; }\n  .post-links.no-separator > li + li {\n    margin-left: 12px; }\n    .post-links.no-separator > li + li:before {\n      content: normal; }\n\n/***********************************/\n/**          Post Comments           **/\n/***********************************/\n.post-comments {\n  font-size: 0.875rem;\n  padding-left: 0; }\n  .post-comments::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n  .post-links + .post-comments {\n    margin-top: 0.5rem; }\n  .post-comments > li {\n    padding: 10px;\n    border-top: 1px solid #e7e7e7;\n    list-style: none; }\n    .post-comments > li::after {\n      content: \"\";\n      display: table;\n      clear: both; }\n    .post-comments > li:last-child {\n      padding-bottom: 0; }\n  .post-comments p:last-child {\n    margin-bottom: 0; }\n  .post-comments .avatar {\n    margin-top: 1px; }\n  .post-comments .author {\n    margin-top: 0;\n    margin-bottom: 2px;\n    color: #7ca9dd; }\n  .post-comments .comment-body {\n    overflow: auto; }\n  .post-comments h6.author > small {\n    font-size: 11px; }\n  .widget > footer .post-comments {\n    margin-left: -20px;\n    margin-right: -20px; }\n\n/***********************************/\n/**           Post User           **/\n/***********************************/\n.post-user {\n  position: relative; }\n  .post-user::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n  .post-user img {\n    border: 3px solid white; }\n\n/***********************************/\n/**           Profile             **/\n/***********************************/\n.user-profile .label {\n  padding: 5px; }\n\n.post-user-profile {\n  margin-top: -75px; }\n  .post-user-profile .contacts {\n    display: block;\n    margin-top: 25px;\n    margin-left: -10px;\n    margin-right: -10px;\n    padding-left: 0;\n    text-align: center; }\n    .post-user-profile .contacts > li {\n      display: inline-block;\n      line-height: 2.2;\n      list-style: none;\n      text-align: left;\n      margin: 0 10px; }\n      @media (min-width: 992px) {\n        .post-user-profile .contacts > li {\n          width: 150px;\n          white-space: nowrap; } }\n      .post-user-profile .contacts > li > a {\n        color: #a2a2a2;\n        text-decoration: none; }\n        .post-user-profile .contacts > li > a:hover, .post-user-profile .contacts > li > a:focus {\n          color: #555555; }\n    .post-user-profile .contacts .fa {\n      font-size: 1.25rem;\n      vertical-align: middle; }\n\n.stats-row-profile .stat-item {\n  border-left: 0;\n  padding-left: 15px;\n  text-align: center; }\n  @media (min-width: 992px) {\n    .stats-row-profile .stat-item {\n      padding-right: 0; } }\n  .stats-row-profile .stat-item .value {\n    font-size: 28px;\n    font-weight: 300; }\n\n.activities h3 {\n  margin-left: 20px; }\n\n.activities .event {\n  margin-top: 1rem;\n  width: 100%; }\n\n.event {\n  background: #fff;\n  border-radius: 0.25rem;\n  padding: 20px 20px 0;\n  position: relative; }\n  .event .post-comments {\n    margin-left: -20px;\n    margin-right: -20px; }\n  .event > footer {\n    margin: 20px -20px 0;\n    padding: 10px 20px;\n    border-bottom-left-radius: 0.25rem;\n    border-bottom-right-radius: 0.25rem;\n    background-color: #f3f3f3; }\n    .event > footer::after {\n      content: \"\";\n      display: table;\n      clear: both; }\n    .event > footer .thumb {\n      margin-left: 10px; }\n\n.event-heading {\n  margin: 0 0 2px;\n  font-weight: 600; }\n  .event-heading > a {\n    text-decoration: none;\n    color: #7ca9dd; }\n  .event-heading > small {\n    font-weight: 600; }\n    .event-heading > small > a {\n      text-decoration: none;\n      color: #999999; }\n\n.event-map {\n  display: block;\n  height: 200px;\n  margin: 0 -20px -20px;\n  overflow: visible !important; }\n\n.event-image {\n  margin: 0 -20px -20px;\n  max-height: 260px;\n  overflow: hidden; }\n  .event-image > img {\n    max-width: 100%; }\n"

/***/ },

/***/ "./src/app/profile/profile.template.html":
/***/ function(module, exports) {

module.exports = "<ol class=\"breadcrumb\">\r\n  <li class=\"breadcrumb-item\">YOU ARE HERE</li>\r\n  <li class=\"active breadcrumb-item\">Profile</li>\r\n</ol>\r\n<h1 class=\"page-title\">User - <span class=\"fw-semi-bold\">Profile</span></h1>\r\n<div class=\"row profile\">\r\n  <div class=\"col-lg-6 col-xs-12\">\r\n    <section class=\"widget\">\r\n      <div class=\"widget-body\">\r\n        <div class=\"widget-top-overflow text-white\">\r\n          <div class=\"height-250 overflow-hidden\">\r\n            <img class=\"img-fluid\" src=\"assets/img/pictures/19.jpg\">\r\n          </div>\r\n          <div class=\"btn-toolbar\">\r\n            <a href=\"#\" class=\"btn btn-outline btn-sm pull-right\">\r\n              <i class=\"fa fa-twitter mr-xs\"></i>\r\n              Follow\r\n            </a>\r\n          </div>\r\n        </div>\r\n        <div class=\"row\">\r\n          <div class=\"col-md-5 col-xs-12 text-xs-center\">\r\n            <div class=\"post-user post-user-profile\">\r\n              <span class=\"thumb-xlg\">\r\n                <img class=\"img-circle\" src=\"assets/img/people/a5.jpg\" alt=\"...\">\r\n              </span>\r\n              <h5 class=\"fw-normal\"><span class=\"fw-semi-bold\">{{currentUser.userName}}</span></h5>\r\n              <p>UI/UX designer</p>\r\n              <a href=\"#\" class=\"btn btn-danger btn-sm mt\">\r\n                &nbsp;Send\r\n                <i class=\"fa fa-envelope ml-xs\"></i>&nbsp;\r\n              </a>\r\n              <ul class=\"contacts\">\r\n                <li><i class=\"fa fa-phone fa-fw mr-xs\"></i><a href=\"#\"> +375 29 555-55-55</a></li>\r\n                <li><i class=\"fa fa-envelope fa-fw mr-xs\"></i><a href=\"#\"> {{currentUser.email}} </a></li>\r\n                <li><i class=\"fa fa-map-marker fa-fw mr-xs\"></i><a href=\"#\"> West Lafayette, IN </a></li>\r\n              </ul>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-7 col-xs-12\">\r\n            <div class=\"stats-row stats-row-profile mt text-xs-right\">\r\n              <div class=\"stat-item\">\r\n                <p class=\"value text-xs-right\">251</p>\r\n                <h6 class=\"name\">Posts</h6>\r\n              </div>\r\n              <div class=\"stat-item\">\r\n                <p class=\"value text-xs-right\">9.38%</p>\r\n                <h6 class=\"name\">Conversion</h6>\r\n              </div>\r\n              <div class=\"stat-item\">\r\n                <p class=\"value text-xs-right\">842</p>\r\n                <h6 class=\"name\">Followers</h6>\r\n              </div>\r\n            </div>\r\n            <p class=\"text-xs-right mt-lg\">\r\n              <a href=\"#\" class=\"tag tag-warning\"> UI/UX </a>\r\n              <a href=\"#\" class=\"tag tag-danger ml-xs\"> Web Design </a>\r\n              <a href=\"#\" class=\"tag tag-default ml-xs\"> Mobile Apps </a>\r\n            </p>\r\n            <p class=\"lead mt-lg\">\r\n              My name is Adam Johns and here is my new Sing user profile page.\r\n            </p>\r\n            <p>\r\n              I love reading people's summaries page especially those who are in the same industry as me.\r\n              Sometimes it's much easier to find your concentration during the night.\r\n            </p>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </section>\r\n  </div>\r\n  <div class=\"col-lg-6 col-xs-12\">\r\n    <section class=\"activities\">\r\n      <h2 class=\"m-l-1\">Activities</h2>\r\n      <section class=\"event\">\r\n        <span class=\"thumb-sm avatar pull-left mr-sm\">\r\n          <img class=\"img-circle\" src=\"assets/img/people/a5.jpg\" alt=\"...\">\r\n        </span>\r\n        <h5 class=\"event-heading\"><a href=\"#\">Bob Nilson</a> <small><a href=\"#\">@nils</a></small></h5>\r\n        <p class=\"text-muted\">February 22, 2014 at 01:59 PM</p>\r\n        <p class=\"fs-mini\">\r\n          There is no such thing as maturity. There is instead an ever-evolving process of maturing.\r\n          Because when there is a maturity, there is ...\r\n        </p>\r\n        <footer>\r\n          <ul class=\"post-links\">\r\n            <li><a href=\"#\">1 hour</a></li>\r\n            <li><a href=\"#\"><span class=\"text-danger\"><i class=\"fa fa-heart\"></i> Like</span></a></li>\r\n            <li><a href=\"#\">Comment</a></li>\r\n          </ul>\r\n        </footer>\r\n      </section>\r\n      <section class=\"event\">\r\n        <h5 class=\"event-heading\"><a href=\"#\">Jessica Smith</a> <small>@jess</small></h5>\r\n        <p class=\"text-muted\">February 22, 2014 at 01:59 PM</p>\r\n        <p class=\"fs-mini\">\r\n          Check out this awesome photo I made in Italy last summer. Seems it was lost somewhere deep inside\r\n          my brand new HDD 40TB. Thanks god I found it!\r\n        </p>\r\n        <footer>\r\n          <div class=\"clearfix\">\r\n            <ul class=\"post-links mt-sm pull-left\">\r\n              <li><a href=\"#\">1 hour</a></li>\r\n              <li><a href=\"#\"><span class=\"text-danger\"><i class=\"fa fa-heart-o\"></i> Like</span></a></li>\r\n              <li><a href=\"#\">Comment</a></li>\r\n            </ul>\r\n\r\n            <span class=\"thumb thumb-sm pull-right\">\r\n              <a href=\"#\">\r\n                <img class=\"img-circle\" src=\"assets/img/people/a1.jpg\">\r\n              </a>\r\n            </span>\r\n            <span class=\"thumb thumb-sm pull-right\">\r\n              <a href=\"#\"><img class=\"img-circle\" src=\"assets/img/people/a5.jpg\"></a>\r\n            </span>\r\n            <span class=\"thumb thumb-sm pull-right\">\r\n              <a href=\"#\"><img class=\"img-circle\" src=\"assets/img/people/a3.jpg\"></a>\r\n            </span>\r\n          </div>\r\n          <ul class=\"post-comments mt-sm\">\r\n            <li>\r\n              <span class=\"thumb-xs avatar pull-left mr-sm\">\r\n                <img class=\"img-circle\" src=\"assets/img/people/a1.jpg\" alt=\"...\">\r\n              </span>\r\n              <div class=\"comment-body\">\r\n                <h6 class=\"author fs-sm fw-semi-bold\">Ignacio Abad <small>6 mins ago</small></h6>\r\n                <p>Hey, have you heard anything about that?</p>\r\n              </div>\r\n            </li>\r\n            <li>\r\n              <span class=\"thumb-xs avatar pull-left mr-sm\">\r\n                <img class=\"img-circle\" src=\"assets/img/avatar.png\" alt=\"...\">\r\n              </span>\r\n              <div class=\"comment-body\">\r\n                <input class=\"form-control form-control-sm\" type=\"text\" placeholder=\"Write your comment...\">\r\n              </div>\r\n            </li>\r\n          </ul>\r\n        </footer>\r\n      </section>\r\n      <form class=\"mt\" action=\"#\">\r\n        <div class=\"form-group mb-0\">\r\n          <label class=\"sr-only\" for=\"new-event\">New event</label>\r\n          <textarea class=\"form-control\" id=\"new-event\" placeholder=\"Post something...\" rows=\"3\"></textarea>\r\n        </div>\r\n        <div class=\"btn-toolbar\">\r\n          <div class=\"btn-group\">\r\n            <a href=\"#\" class=\"btn btn-sm btn-gray\">\r\n              <i class=\"fa fa-camera fa-lg\"></i>\r\n            </a>\r\n            <a href=\"#\" class=\"btn btn-sm btn-gray\">\r\n              <i class=\"fa fa-map-marker fa-lg\"></i>\r\n            </a>\r\n          </div>\r\n          <button type=\"submit\" class=\"btn btn-danger btn-sm pull-right\">Post</button>\r\n        </div>\r\n      </form>\r\n    </section>\r\n  </div>\r\n\r\n    <div class=\"col-lg-6\">\r\n    <section class=\"widget\" widget>\r\n      <header>\r\n        <h6>\r\n          Inputs\r\n        </h6>\r\n        <div class=\"widget-controls\">\r\n          <a href=\"#\"><i class=\"glyphicon glyphicon-cog\"></i></a>\r\n          <a href=\"#\"><i class=\"fa fa-refresh\"></i></a>\r\n          <a href=\"#\" data-widgster=\"close\"><i class=\"glyphicon glyphicon-remove\"></i></a>\r\n        </div>\r\n      </header>\r\n      <div class=\"widget-body\">\r\n        <form class=\"form-horizontal\" role=\"form\">\r\n          <fieldset>\r\n            <legend><strong>Profile</strong> form</legend>\r\n\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-md-4  col-form-label text-md-right\" for=\"simple-select\">Major</label>\r\n              <div class=\"col-md-7 \">\r\n                <select class=\"form-control\" id=\"simple-select\"\r\n                    [(ngModel)]=\"myProfile.profile.major\" \r\n                    [disabled]=\"!toEdit\" name=\"major\">\r\n                  <option *ngFor=\"let major of majors\" [value]=\"major.Abbreviation\">\r\n                    {{major.Abbreviation}}\r\n                  </option>\r\n                </select>\r\n              </div>\r\n            </div>\r\n            \r\n            <div class=\"form-group row\">\r\n              <label for=\"normal-field\" class=\"col-md-4  col-form-label text-md-right\">Language</label>\r\n              <div class=\"col-md-7 \">\r\n                <span class=\"help-block\" *ngFor=\"let language of myProfile.extra.language\"></span>\r\n                <input type=\"text\" id=\"normal-field\" [disabled]=\"!toEdit\" class=\"form-control\" placeholder=\"New language\">\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label for=\"normal-field\" class=\"col-md-4  col-form-label text-md-right\">Hobby</label>\r\n              <div class=\"col-md-7 \">\r\n                <span id=\"helpBlock\" class=\"help-block\" *ngFor=\"let hobby of myProfile.extra.hobby\"></span>\r\n                <input type=\"text\" id=\"normal-field\" [disabled]=\"!toEdit\" class=\"form-control\" placeholder=\"New hobby\">\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label for=\"normal-field\" class=\"col-md-4  col-form-label text-md-right\">Birthday</label>\r\n              <div class=\"col-md-7 \">\r\n                <input type=\"date\" id=\"normal-field\" [disabled]=\"!toEdit\" class=\"form-control\" placeholder=\"{{myProfile.profile.birthday}}\">\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label for=\"normal-field\" class=\"col-md-4  col-form-label text-md-right\">Gender</label>\r\n              <div class=\"col-md-7 \">\r\n                <input type=\"text\" id=\"normal-field\" [disabled]=\"!toEdit\" class=\"form-control\" placeholder=\"{{myProfile.profile.gender}}\">\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label for=\"normal-field\" class=\"col-md-4  col-form-label text-md-right\">Nationality</label>\r\n              <div class=\"col-md-7 \">\r\n                <input type=\"text\" id=\"normal-field\" [disabled]=\"!toEdit\" class=\"form-control\" placeholder=\"{{myProfile.profile.nationality}}\">\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label for=\"normal-field\" class=\"col-md-4  col-form-label text-md-right\">Visibility</label>\r\n              <div class=\"col-md-7 \">\r\n                <input type=\"text\" id=\"normal-field\" [disabled]=\"!toEdit\" class=\"form-control\" placeholder=\"{{myProfile.profile.visibility}}\">\r\n              </div>\r\n            </div>\r\n          </fieldset>\r\n          <div class=\"form-actions\">\r\n            <div class=\"row\">\r\n              <div class=\"offset-md-4 col-md-7 \">\r\n                <button type=\"submit\" *ngIf=\"toEdit === false\" class=\"btn btn-primary\" (click)=\"edit()\">Edit Profile</button>\r\n                <button type=\"submit\" *ngIf=\"toEdit === true\" class=\"btn btn-primary\" (click)=\"editProfile()\">Save Changes</button>\r\n                <button type=\"button\" class=\"btn btn-inverse\">Cancel</button>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </section>\r\n  </div>\r\n</div>\r\n"

/***/ }

});
//# sourceMappingURL=13.map