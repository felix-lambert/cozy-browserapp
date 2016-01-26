# eventListening = (event) -> 
#     intent = event.data
#     window.removeEventListener "message", eventListening
#     return intent


eventListening = 
    handleEvent: ->
        console.log this
        return
    dude: 'holla'


getToken = (callback) ->
    console.log 'getToken'
    window.parent.postMessage { action: 'getToken' }, '*'
    window.addEventListener 'message', eventListening
    console.log '///////////////////////'
    console.log eventListening
    console.log '///////////////////////'

module.exports =
    get: (path, attributes, callback)->
        playRequest 'GET', path, attributes, (error, body, response) ->
            callback error, body, response

    post: (path, attributes, callback) ->
        playRequest 'POST', path, attributes, (error, body, response) ->
            callback error, body, response

    put: (path, attributes, callback) ->
        console.log 'put'
        playRequest 'PUT', path, attributes, (error, body, response) ->
            callback error, body, response   

    del: (path, attributes, callback) ->
        playRequest 'DELETE', path, attributes, (error, body, response) ->
            callback error, body, response

playRequest = (method, path, attributes, callback) ->
    xhr = new XMLHttpRequest
    xhr.open method, "/ds-api/#{path}", true

    xhr.onload = ->
        console.log xhr.response
        return callback null, xhr.response, xhr

    xhr.onerror = (e) ->
        err = 'Request failed : #{e.target.status}'
        return callback err

    getToken (res) ->
        console.log 'addEventListener'
        xhr.setRequestHeader 'Content-Type', 'application/json'
        xhr.setRequestHeader 'Authorization', 'Basic ' + btoa(res.appName + ':' + res.token)
        if attributes?
            xhr.send JSON.stringify(attributes)
        else
            xhr.send()