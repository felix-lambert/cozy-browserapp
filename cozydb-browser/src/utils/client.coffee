eventListening = (action) ->
    return (e) ->
        window.removeEventListener 'message', eventListening
        action e.data
        return

getToken = (callback) ->
    
    window.parent.postMessage { action: 'getToken' }, '*'
    window.addEventListener 'message', eventListening((intent) ->
        xhr.setRequestHeader 'Authorization', 'Basic ' + btoa(intent.appName + ':' + intent.token)
        console.log 'callback'
        callback()
        return
    ), false

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
    xhr.setRequestHeader 'Content-Type', 'application/json'
    xhr.onload = ->
        return callback null, xhr.response, xhr

    xhr.onerror = (e) ->
        err = 'Request failed : #{e.target.status}'
        return callback err
    
    getToken xhr, method, path, () ->
        if attributes?
            xhr.send JSON.stringify(attributes)
        else
            xhr.send()