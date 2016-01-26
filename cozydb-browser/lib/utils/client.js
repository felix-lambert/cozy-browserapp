// Generated by CoffeeScript 1.10.0
var getToken, playRequest;

getToken = function(cb) {
  console.log('getToken');
  window.parent.postMessage({
    action: 'getToken'
  }, '*');
  return window.addEventListener('message', function(event, callback) {
    var intent;
    intent = event.data;
    return cb(intent);
  });
};

module.exports = {
  get: function(path, attributes, callback) {
    return playRequest('GET', path, attributes, function(error, body, response) {
      return callback(error, body, response);
    });
  },
  post: function(path, attributes, callback) {
    return playRequest('POST', path, attributes, function(error, body, response) {
      return callback(error, body, response);
    });
  },
  put: function(path, attributes, callback) {
    console.log('put');
    return playRequest('PUT', path, attributes, function(error, body, response) {
      return callback(error, body, response);
    });
  },
  del: function(path, attributes, callback) {
    return playRequest('DELETE', path, attributes, function(error, body, response) {
      return callback(error, body, response);
    });
  }
};

playRequest = function(method, path, attributes, callback) {
  var xhr;
  xhr = new XMLHttpRequest;
  xhr.open(method, "/ds-api/" + path, true);
  xhr.onload = function() {
    console.log(xhr.response);
    return callback(null, xhr.response, xhr);
  };
  xhr.onerror = function(e) {
    var err;
    err = 'Request failed : #{e.target.status}';
    return callback(err);
  };
  return getToken(function(res) {
    console.log('addEventListener');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(res.appName + ':' + res.token));
    if (attributes != null) {
      return xhr.send(JSON.stringify(attributes));
    } else {
      return xhr.send();
    }
  });
};
