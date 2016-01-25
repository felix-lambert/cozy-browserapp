(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.cozydb = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Generated by CoffeeScript 1.10.0
var client;

client = require('./utils/client');

module.exports.create = function(docType, attributes, callback) {
  var path;
  path = "data/";
  attributes.docType = docType;
  if (attributes.id != null) {
    path += attributes.id + "/";
    delete attributes.id;
    return callback(new Error('cant create an object with a set id'));
  }
  return client.post(path, attributes, function(error, body, response) {
    if (error) {
      return callback(error);
    } else {
      return callback(null, JSON.parse(body));
    }
  });
};

module.exports.find = function(id, callback) {
  return client.get("data/" + id + "/", null, function(error, body, response) {
    if (error) {
      return callback(error);
    } else if (response.status === 404) {
      return callback(null, null, null);
    } else {
      return callback(null, body);
    }
  });
};

module.exports.exists = function(id, callback) {
  return client.get("data/exist/" + id + "/", null, function(error, body, response) {
    if (error) {
      return callback(error);
    } else if ((body == null) || (body.exist == null)) {
      return callback(new Error("Data system returned invalid data."));
    } else {
      return callback(null, body.exist);
    }
  });
};

module.exports.updateAttributes = function(docType, id, attributes, callback) {
  console.log('updateAttributes');
  attributes.docType = docType;
  return client.put("data/merge/" + id + "/", attributes, function(error, body, response) {
    if (error) {
      return callback(error);
    } else if (response.status === 404) {
      return callback(new Error("Document " + id + " not found"));
    } else if (response.status !== 200) {
      return callback(new Error("Server error occured."));
    } else {
      return callback(null, JSON.parse(body));
    }
  });
};

module.exports.destroy = function(id, callback) {
  return client.del("data/" + id + "/", null, function(error, body, response) {
    console.log(response);
    if (error) {
      return callback(error);
    } else if (response.status === 404) {
      return callback(new Error("Document " + id + " not found"));
    } else if (response.status !== 204) {
      return callback(new Error("Server error occured."));
    } else {
      return callback(null);
    }
  });
};

},{"./utils/client":2}],2:[function(require,module,exports){
// Generated by CoffeeScript 1.10.0
var playRequest;

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
  xhr.setRequestHeader('Content-Type', 'application/json');
  if (attributes != null) {
    return xhr.send(JSON.stringify(attributes));
  } else {
    return xhr.send();
  }
};

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImxpYi9pbmRleC5qcyIsImxpYi91dGlscy9jbGllbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuMTAuMFxudmFyIGNsaWVudDtcblxuY2xpZW50ID0gcmVxdWlyZSgnLi91dGlscy9jbGllbnQnKTtcblxubW9kdWxlLmV4cG9ydHMuY3JlYXRlID0gZnVuY3Rpb24oZG9jVHlwZSwgYXR0cmlidXRlcywgY2FsbGJhY2spIHtcbiAgdmFyIHBhdGg7XG4gIHBhdGggPSBcImRhdGEvXCI7XG4gIGF0dHJpYnV0ZXMuZG9jVHlwZSA9IGRvY1R5cGU7XG4gIGlmIChhdHRyaWJ1dGVzLmlkICE9IG51bGwpIHtcbiAgICBwYXRoICs9IGF0dHJpYnV0ZXMuaWQgKyBcIi9cIjtcbiAgICBkZWxldGUgYXR0cmlidXRlcy5pZDtcbiAgICByZXR1cm4gY2FsbGJhY2sobmV3IEVycm9yKCdjYW50IGNyZWF0ZSBhbiBvYmplY3Qgd2l0aCBhIHNldCBpZCcpKTtcbiAgfVxuICByZXR1cm4gY2xpZW50LnBvc3QocGF0aCwgYXR0cmlidXRlcywgZnVuY3Rpb24oZXJyb3IsIGJvZHksIHJlc3BvbnNlKSB7XG4gICAgaWYgKGVycm9yKSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2soZXJyb3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgSlNPTi5wYXJzZShib2R5KSk7XG4gICAgfVxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzLmZpbmQgPSBmdW5jdGlvbihpZCwgY2FsbGJhY2spIHtcbiAgcmV0dXJuIGNsaWVudC5nZXQoXCJkYXRhL1wiICsgaWQgKyBcIi9cIiwgbnVsbCwgZnVuY3Rpb24oZXJyb3IsIGJvZHksIHJlc3BvbnNlKSB7XG4gICAgaWYgKGVycm9yKSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2soZXJyb3IpO1xuICAgIH0gZWxzZSBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDQpIHtcbiAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCBudWxsLCBudWxsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIGJvZHkpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5leGlzdHMgPSBmdW5jdGlvbihpZCwgY2FsbGJhY2spIHtcbiAgcmV0dXJuIGNsaWVudC5nZXQoXCJkYXRhL2V4aXN0L1wiICsgaWQgKyBcIi9cIiwgbnVsbCwgZnVuY3Rpb24oZXJyb3IsIGJvZHksIHJlc3BvbnNlKSB7XG4gICAgaWYgKGVycm9yKSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2soZXJyb3IpO1xuICAgIH0gZWxzZSBpZiAoKGJvZHkgPT0gbnVsbCkgfHwgKGJvZHkuZXhpc3QgPT0gbnVsbCkpIHtcbiAgICAgIHJldHVybiBjYWxsYmFjayhuZXcgRXJyb3IoXCJEYXRhIHN5c3RlbSByZXR1cm5lZCBpbnZhbGlkIGRhdGEuXCIpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIGJvZHkuZXhpc3QpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cy51cGRhdGVBdHRyaWJ1dGVzID0gZnVuY3Rpb24oZG9jVHlwZSwgaWQsIGF0dHJpYnV0ZXMsIGNhbGxiYWNrKSB7XG4gIGNvbnNvbGUubG9nKCd1cGRhdGVBdHRyaWJ1dGVzJyk7XG4gIGF0dHJpYnV0ZXMuZG9jVHlwZSA9IGRvY1R5cGU7XG4gIHJldHVybiBjbGllbnQucHV0KFwiZGF0YS9tZXJnZS9cIiArIGlkICsgXCIvXCIsIGF0dHJpYnV0ZXMsIGZ1bmN0aW9uKGVycm9yLCBib2R5LCByZXNwb25zZSkge1xuICAgIGlmIChlcnJvcikge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycm9yKTtcbiAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2sobmV3IEVycm9yKFwiRG9jdW1lbnQgXCIgKyBpZCArIFwiIG5vdCBmb3VuZFwiKSk7XG4gICAgfSBlbHNlIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKG5ldyBFcnJvcihcIlNlcnZlciBlcnJvciBvY2N1cmVkLlwiKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCBKU09OLnBhcnNlKGJvZHkpKTtcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMuZGVzdHJveSA9IGZ1bmN0aW9uKGlkLCBjYWxsYmFjaykge1xuICByZXR1cm4gY2xpZW50LmRlbChcImRhdGEvXCIgKyBpZCArIFwiL1wiLCBudWxsLCBmdW5jdGlvbihlcnJvciwgYm9keSwgcmVzcG9uc2UpIHtcbiAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgaWYgKGVycm9yKSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2soZXJyb3IpO1xuICAgIH0gZWxzZSBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDQpIHtcbiAgICAgIHJldHVybiBjYWxsYmFjayhuZXcgRXJyb3IoXCJEb2N1bWVudCBcIiArIGlkICsgXCIgbm90IGZvdW5kXCIpKTtcbiAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjA0KSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2sobmV3IEVycm9yKFwiU2VydmVyIGVycm9yIG9jY3VyZWQuXCIpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwpO1xuICAgIH1cbiAgfSk7XG59O1xuIiwiLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjEwLjBcbnZhciBwbGF5UmVxdWVzdDtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldDogZnVuY3Rpb24ocGF0aCwgYXR0cmlidXRlcywgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gcGxheVJlcXVlc3QoJ0dFVCcsIHBhdGgsIGF0dHJpYnV0ZXMsIGZ1bmN0aW9uKGVycm9yLCBib2R5LCByZXNwb25zZSkge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycm9yLCBib2R5LCByZXNwb25zZSk7XG4gICAgfSk7XG4gIH0sXG4gIHBvc3Q6IGZ1bmN0aW9uKHBhdGgsIGF0dHJpYnV0ZXMsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHBsYXlSZXF1ZXN0KCdQT1NUJywgcGF0aCwgYXR0cmlidXRlcywgZnVuY3Rpb24oZXJyb3IsIGJvZHksIHJlc3BvbnNlKSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2soZXJyb3IsIGJvZHksIHJlc3BvbnNlKTtcbiAgICB9KTtcbiAgfSxcbiAgcHV0OiBmdW5jdGlvbihwYXRoLCBhdHRyaWJ1dGVzLCBjYWxsYmFjaykge1xuICAgIGNvbnNvbGUubG9nKCdwdXQnKTtcbiAgICByZXR1cm4gcGxheVJlcXVlc3QoJ1BVVCcsIHBhdGgsIGF0dHJpYnV0ZXMsIGZ1bmN0aW9uKGVycm9yLCBib2R5LCByZXNwb25zZSkge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycm9yLCBib2R5LCByZXNwb25zZSk7XG4gICAgfSk7XG4gIH0sXG4gIGRlbDogZnVuY3Rpb24ocGF0aCwgYXR0cmlidXRlcywgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gcGxheVJlcXVlc3QoJ0RFTEVURScsIHBhdGgsIGF0dHJpYnV0ZXMsIGZ1bmN0aW9uKGVycm9yLCBib2R5LCByZXNwb25zZSkge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycm9yLCBib2R5LCByZXNwb25zZSk7XG4gICAgfSk7XG4gIH1cbn07XG5cbnBsYXlSZXF1ZXN0ID0gZnVuY3Rpb24obWV0aG9kLCBwYXRoLCBhdHRyaWJ1dGVzLCBjYWxsYmFjaykge1xuICB2YXIgeGhyO1xuICB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3Q7XG4gIHhoci5vcGVuKG1ldGhvZCwgXCIvZHMtYXBpL1wiICsgcGF0aCwgdHJ1ZSk7XG4gIHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZyh4aHIucmVzcG9uc2UpO1xuICAgIHJldHVybiBjYWxsYmFjayhudWxsLCB4aHIucmVzcG9uc2UsIHhocik7XG4gIH07XG4gIHhoci5vbmVycm9yID0gZnVuY3Rpb24oZSkge1xuICAgIHZhciBlcnI7XG4gICAgZXJyID0gJ1JlcXVlc3QgZmFpbGVkIDogI3tlLnRhcmdldC5zdGF0dXN9JztcbiAgICByZXR1cm4gY2FsbGJhY2soZXJyKTtcbiAgfTtcbiAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gIGlmIChhdHRyaWJ1dGVzICE9IG51bGwpIHtcbiAgICByZXR1cm4geGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkoYXR0cmlidXRlcykpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB4aHIuc2VuZCgpO1xuICB9XG59O1xuIl19
