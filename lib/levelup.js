'use strict';

var fetch = require('node-fetch');
var config = require('../config');

var LevelUp = function () {};

const fbProfile = (fbid) => {
  const qs = 'access_token=' + encodeURIComponent(config.FB_PAGE_TOKEN);
  return fetch('https://graph.facebook.com/v2.6/' + fbid + '?' + qs, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  })
  .then(rsp => rsp.json())
  .then(json => {
    if (json.error && json.error.message) {
      throw new Error(json.error.message);
    }
    return json;
  });
};

LevelUp.prototype.get_user = function (fbid) {
  return fetch(config.LUP_API_ENDPOINT + '/users?fb_id=' + fbid, {
    method: 'GET',
    headers: {
                'Content-Type'  : 'application/json',
                'Accept'        : 'application/json',
                'Authorization' : 'Token token=' + config.LUP_API_TOKEN
              }
  })
  .then(rsp => rsp.json())
  .then(json => {
    if (json.error && json.error.message) {
      throw new Error(json.error.message);
    }
    return json;
  });
};

LevelUp.prototype.init_user = function (fbid) {

  fbProfile(fbid).then(profile_info => {
    var body = JSON.stringify({
      user:{
        first_name: profile_info.first_name,
        last_name:  profile_info.last_name,
        locale:     profile_info.locale,
        timezone:   profile_info.timezone,
        gender:     profile_info.gender
      }
    });

    return fetch(config.LUP_API_ENDPOINT + '/users?fb_id=' + fbid, {
      method: 'POST',
      headers: {
                  'Content-Type'  : 'application/json',
                  'Accept'        : 'application/json',
                  'Authorization' : 'Token token=' + config.LUP_API_TOKEN
                },
      body,
    })
    .then(rsp => rsp.json())
    .then(json => {
      if (json.error && json.error.message) {
        throw new Error(json.error.message);
      }
      return json;
    });
  });
};

LevelUp.prototype.get_activation_state = function (fbid) {
  return fetch(config.LUP_API_ENDPOINT + '/schedules?fb_id=' + fbid, {
    method: 'GET',
    headers: {
                'Content-Type'  : 'application/json',
                'Accept'        : 'application/json',
                'Authorization' : 'Token token=' + config.LUP_API_TOKEN
              }
  })
  .then(rsp => rsp.json())
  .then(json => {
    if (json.error && json.error.message) {
      throw new Error(json.error.message);
    }
    return json.schedules[0];
  });
};

LevelUp.prototype.set_activation_state = function (fbid, state) {
  return (
    this.get_user(fbid)
      .then(user_profile => {
        const body = JSON.stringify({schedule:{schedule_on: state}});
        return fetch(config.LUP_API_ENDPOINT + '/schedules/' + user_profile.user.schedule.id, {
          method: 'PUT',
          headers: {
                      'Content-Type'  : 'application/json',
                      'Accept'        : 'application/json',
                      'Authorization' : 'Token token=' + config.LUP_API_TOKEN
                    },
          body
        })
        .then(rsp => rsp.json())
        .then(json => {
          if (json.error && json.error.message) {
            throw new Error(json.error.message);
          }
          return json;
        });
      })
  );
};


exports.LevelUp = new LevelUp();
