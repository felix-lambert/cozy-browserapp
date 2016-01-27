

askForToken = ()->
    window.parent.postMessage { action: 'getToken' }, '*'

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
    auth = null
    askForToken()
    
    eventListening = (event) ->
        window.removeEventListener 'message', eventListening
        auth = event.data

    addListener = ()->
        window.addEventListener 'message', eventListening, false

    sendRequest = () ->
        xhr = new XMLHttpRequest
        xhr.open method, "/ds-api/#{path}", true
        xhr.onload = ->
        return callback null, xhr.response, xhr

        xhr.onerror = (e) ->
            err = 'Request failed : #{e.target.status}'
            return callback err
        xhr.setRequestHeader 'Content-Type', 'application/json'
        xhr.setRequestHeader 'Authorization', 'Basic ' + btoa(auth.appName + ':' + auth.token)
       
        if attributes?
            xhr.send JSON.stringify(attributes)
        else
            xhr.send()
        return

    executeAsynchronously = (functions, timeout) ->
        i = 0
        while i < functions.length
            setTimeout functions[i], timeout
            i++
        return

    executeAsynchronously([addListener, sendRequest], 10);    