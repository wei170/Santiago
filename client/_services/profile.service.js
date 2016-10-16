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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var ProfileService = (function () {
    function ProfileService(http) {
        this.http = http;
    }
    ProfileService.prototype.getProfile = function () {
        var _this = this;
        var profileUrl = '/profile';
        var headers = new http_1.Headers();
        headers.append('Auth', localStorage.getItem('token'));
        return this.http.get(profileUrl, {
            headers: headers
        })
            .map(function (res) { return _this.extractData(res); });
    };
    ProfileService.prototype.editProfile = function (model) {
        var _this = this;
        var url = '/profile';
        var headers = new http_1.Headers();
        headers.append('Auth', localStorage.getItem('token'));
        var body = { "language": model.language, "major": model.major, "hobby": model.hobby, "visibility": model.visibility };
        return this.http.put(url, body, {
            headers: headers
        })
            .map(function (res) { return _this.extractData(res); });
    };
    ProfileService.prototype.extractData = function (res) {
        var body = res.json();
        localStorage.setItem('profile', JSON.stringify(body));
        return body.data || {};
    };
    ProfileService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ProfileService);
    return ProfileService;
}());
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map