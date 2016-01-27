module.exports =
    get: (auth, path, attributes, callback)->
        playRequest auth, 'GET', path, attributes, (error, body, response) ->
            callback error, body, response

    post: (auth, path, attributes, callback) ->
        playRequest auth, 'POST', path, attributes, (error, body, response) ->
            callback error, body, response

    put: (auth, path, attributes, callback) ->
        console.log 'put'
        playRequest auth, 'PUT', path, attributes, (error, body, response) ->
            callback error, body, response   

    del: (auth, path, attributes, callback) ->
        playRequest auth, 'DELETE', path, attributes, (error, body, response) ->
            callback error, body, response

playRequest = (auth, method, path, attributes, callback) ->
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
