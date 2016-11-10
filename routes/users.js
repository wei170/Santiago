'use strict';

var express = require('express');
var router = express.Router();
var db = require(__dirname + '/../db.js');
var _ = require('underscore');
var randomstring = require("randomstring");
var sendemail = require(__dirname + '/../helpers/mailer_helper.js').sendEmail;
var middleware = require(__dirname + '/../middleware.js')(db);
var Sequelize = require('sequelize');

/******************************************************
 *              Sign Up
 ******************************************************/
router.post('/', function(req, res, next) {
	/**
	 * JSON Format: {
	 * 		"userName": "...",
	 * 		"email": "...",
	 * 		"password": "..."
	 * }
	 */
    var body = _.pick(req.body, 'userName', 'email', 'password');

    db.user.create(body).then(function(user) {
        db.profile.create({
            user_id: user.id
        }).then(function(profile) {
			if (profile){
				res.status(200).json(user.toPublicJSON());
			}
			else {
				res.status(404).send({err: "Profile Creation Error"});
			}
        }, function(e) {
            res.status(400).send({err: e});
        });
    }, function(e) {
		//TODO: need to tell if it's invalid userName or email by frontend send request check if userName exists
        res.status(400).send({err: e});
    });
});

/******************************************************
 *            Reset Password Request
 ******************************************************/
router.post('/reset', function(req, res, next) {
    var query = req.query;
    var where = {};

    if (query.hasOwnProperty('email') && query.email.length > 0) {
        where.email = {
            $like: '%' + query.email + '%'
        };
    }
    db.user.findAll({
        where: where
    }).then(function(users) {
        var verificationcode = randomstring.generate(8);
        sendemail({
            'subject': 'iStudy Reset Your Password',
            'text': 'Hi, your verification code is ' + verificationcode
        }, query.email);
        users[0].update({
            'verificationcode': verificationcode
        }).then(function(user) {
            res.json(verificationcode);
        }, function(e) {
            res.status(400).send({err: e});
        });

    }, function(e) {
        res.status(500).send();
    });
});

/******************************************************
 *          Check Verification Code
 ******************************************************/
router.post('/checkcode', function(req, res) {
	/**
	 * JSON Format: {
	 * 		"email": "...",
	 * 		"verificationcode': "..."
	 * }
	 */
	var body = _.pick(req.body, 'email', 'verificationcode');
    db.user.findOne({
        where: {
            email: body.email
        },
        attributes: ['verificationcode']
    }).then(function(user) {
        if (body.verificationcode === user.getDataValue('verificationcode')) {
            res.status(200).send();

        } else {
            res.status(401).send({error: 'verification code invalid!'});
        }
    });
});

/******************************************************
 *              Set New Password
 ******************************************************/

router.put('/newpassword', function(req, res) {
	/**
	 * JSON Format: {
	 * 		"email": "..."
	 * 		"newpassword": "..."
	 * }
	 */
    var body = _.pick(req.body, 'email', 'newpassword');
    body.password = body.newpassword;

    var where = {};
    var attributes = {};
    db.user.authenticate(body).then(function(user) {
        //duplicate  passwordlog
        console.log('log in ');
        res.status(401).send();
    }, function() {
        console.log('fails ');
        if (body.hasOwnProperty('email')) {
            where.email = {
                $like: '%' + body.email + '%'
            };
        }
        if (body.hasOwnProperty('password')) {
            attributes.password = body.password;
        }
        db.user.findAll({
            where: where
        }).then(function(users) {
			if (users){
				users[0].update(
					attributes
				).then(function(user) {
					//new password set
					console.log('@@@@' + attributes.password);
					res.json(user.toPublicJSON());
				}, function(e) {
					res.status(400).json(e);
				});
				//users[0].setDataValue('password','66666');

			}
			else {
				//no such email in database
				res.status(404).send({err: "No Such User"});
			}

        }, function(e) {
            res.status(400).send({err: e});
        });

    });
});


/******************************************************
 *                      LogIN
 ******************************************************/
router.post('/login', function(req, res) {
	/**
	 * JSON Format: {
	 * 		"email": "...",
	 * 		"password": "..."
	 * }
	 */
    var body = _.pick(req.body, 'email', 'password');
    //console.log(JSON.stringify(body));

    db.user.authenticate(body).then(function(user) {
        var token = user.generateToken('authentication');
        console.log('token= ' + token);
        if (token) {
            res.header('Auth', token).json(user.toPublicJSON());
        } else {
            res.status(401).send();
        }

    }, function(e) {
        res.status(400).send({err: e});

    });
});


/******************************************************
 *           Get User's Friend List
 ******************************************************/
router.post('/get-friends', middleware.requireAuthentication,function (req, res) {
	/**
	 * JSON Format: {
	 * 		"userName": "..."
	 * }
	 */
	var body = _.pick(req.body, 'userName');
	db.user.findOne({where: {userName: body.userName}}).then(function(user){
		if (user){
			user.getFriends().then(function (friends) {
				res.status(200).json(friends);
			});
		}
		else {
			res.status(404).send({err: "User Not Found"});
		}
	});
});

/******************************************************
 *           Send Friend Request
 ******************************************************/
router.post('/send-friend-request', middleware.requireAuthentication,function (req, res) {
	/**
	 * JSON Format: {
	 * 		"senderName": "...",
	 * 		"receiverName": "..."
	 * }
	 */
	var body = _.pick(req.body, 'senderName', 'receiverName');
	db.user.findOne({where: {userName: body.senderName}}).then(function(sender){
		if (sender){
			db.user.findOne({where: {userName: body.receiverName}}).then(function (receiver) {
				if (receiver){
					if (receiver.id === sender.id){
						res.status(400).send({err: "One can not send friend invitation to oneself"});
					}
					else {
						db.friend_request.create({sender_id: sender.id, receiver_id: receiver.id});
						res.status(200).send({res: "Sent Friend Request Successfully"});
					}
				}
				else {
					res.status(404).send({err: "Receiver Not Exist"});
				}
			});
		}
		else {
			res.status(404).send({err: "Sender Not Exist"});
		}
	});
});

/******************************************************
 *           Get Friend Invitations
 ******************************************************/
// Notes: Collect All the requests a user has received
router.post('/get-friend-invitations', middleware.requireAuthentication,function (req, res){
	/**
	 * JSON Format: {
	 * 		"userName": "...",
	 * }
	 */
	var sender_ids = [];
	var body = _.pick(req.body, 'userName');
	db.user.findOne({where: {userName: body.userName}}).then(function (user) {
		if (user){
			db.friend_request.findAll({where: {receiver_id: user.id}}).then(function (invitations) {
				if (invitations){
					invitations.map(function (invitation) {
						sender_ids.push(invitation.sender_id);
					});

					db.user.findAll({
						where: { id: { $in: sender_ids}},
						attributes: ['userName']
					}).then(function (senders) {
						res.status(200).json(senders);
					});
				}
				else {
					res.status(404).send({err: "No invitations received"});
				}
			});
		}
		else {
			res.status(404).send({err: "No Such User"});
		}
	})
});

/******************************************************
 *           Get Friend Requests
 ******************************************************/
// Notes: Collect All the requests one has sent out
router.post('/get-friend-requests', middleware.requireAuthentication,function (req, res){
	/**
	 * JSON Format: {
	 * 		"userName": "...",
	 * }
	 */
	var request_list = {};
	var rs = [];
	var receiver_ids = [];
	var request_statuses = [];
	request_list.requests = rs;
	var body = _.pick(req.body, 'userName');
	db.user.findOne({where: {userName: body.userName}}).then(function (user) {
		if (user){
			db.friend_request.findAll({where: {sender_id: user.id}}).then(function (requests){
				if (requests){
					requests.map(function(request){
						receiver_ids.push(request.receiver_id);
						request_statuses.push(request.status);
					});

					db.user.findAll({
						where: { id: { $in: receiver_ids}},
						attributes: ['userName']
					}).then(function (receivers) {
						for (var i = 0; i < receivers.length; i++){
							rs.push({
								"receiver": receivers[i].userName,
								"status": request_statuses[i]
							});
						}
						res.status(200).json(request_list);
					});
				}
				else {
					res.status(404).send({err: "No requests sent"});
				}
			});
		}
		else {
			res.status(404).send({err: "No Such User"});
		}
	});

});

/******************************************************
 *           Accept Or Decline Request
 ******************************************************/
router.post('/invitation-accept-or-not', middleware.requireAuthentication,function (req, res){
	/**
	 * JSON Format: {
	 * 		"sender": "...",
	 * 		"receiver": "..."
	 * 		"status_code": "..."
	 * }
	 */
	var attributes = {};
	var body = _.pick(req.body, 'sender', 'receiver', 'status_code');
	if (body.hasOwnProperty('status_code')){
		attributes.status = body.status_code;
	}
	db.user.findOne({where: {userName: body.receiver}}).then(function (receiver){
		if (receiver){
			db.user.findOne({where: {userName: body.sender}}).then(function (sender){
				if (sender){
					if (sender.id === receiver.id){
						res.status(400).send({err: "Not a valid request"});
					}
					else {
						db.friend_request.findOne({where: {sender_id: sender.id, receiver_id: receiver.id}})
							.then(function (request) {
								if (request){
									request.updateAttributes(attributes).then(function (request) {
										if (request){
											if (attributes.status === 1){
												// add request sender as friend of request receiver
												console.log("gonna make them friends");
												addFriend(sender.id, receiver.id, res)
													.then(function () {
														res.status(200).json(request);
													});
											}
										}
										else {
											res.status(400).send({err: "Fail to update the friend_request"});
										}
									}, function (e) {
										res.status(400).send({err: e});
									})
								}
								else {
									res.status(404).send({err: "Request does not exist"});
								}
							});
					}
				}
				else {
					res.status(404).send({err: "Sender does not exist"});
				}
			});
		}
		else {
			res.status(404).send({err: "Sender does not exist"});
		}
	});
});


/******************************************************
 *           	Find Friends
 ******************************************************/
// find friends in same class by country, hobby, language
router.post('/find-friends', middleware.requireAuthentication,function (req, res){
	/**
	 * JSON Format: {
	 * 		"nationality": "...",
	 * 		"hobby": [
	 * 			{name: "..."},
	 * 			{name: "..."}
	 * 			],
	 * 		"language": [
	 * 			{name: "..."},
	 * 			...
	 * 		]
	 * }
	 */
	var body = _.pick(req.body, 'nationality', 'hobby', 'language');
	var preference = {};
	if (body.hasOwnProperty('nationality')) {
		preference.nationality = body.nationality;
	}
	if (body.hasOwnProperty('hobby')){
		preference.hobby = body.hobby;
	}
	if (body.hasOwnProperty('language')){
		preference.language = body.language;
	}


});

/**
 * Add friendship of sender and receiver to db
 * Rerturn a promise
 * @param sender_id
 * @param receiver_id
 * @param res to send back info to frontend
 */
var addFriend = function (sender_id, receiver_id, res) {
	return new Promise(function (resolve, reject) {
		db.user.findById(sender_id).then(function (sender) {
			if (sender){
				db.user.findById(receiver_id).then(function (receiver) {
					if (receiver){
						receiver.addFriend(sender).then(function (success) {
							if (success){
								sender.addFriend(receiver).then(function (success) {
									if (success){
										resolve();
									}
								});
							}
						});
					}
					else {
						res.status(404).send({err: "Receiver Not Found"});
					}
				})
			}
			else {
				res.status(404).send({err: "Sender Not Found"});
			}
		});
	});
};

module.exports = router;
