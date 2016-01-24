module.exports =
    get: (path, attributes, callback)->
        return playRequest 'GET', path, attributes, callback

    post: (path, attributes, callback) ->
        return playRequest 'POST', path, attributes, callback

    put: (path, attributes, callback) ->
        return playRequest 'PUT', path, attributes, callback    

    delete: (path, attributes, callback) ->
        return playRequest 'DELETE', path, attributes, callback


playRequest = (method, path, attributes, callback) ->
    xhr = new XMLHttpRequest
    xhr.open method, "/ds-api/#{path}", true

    xhr.onload = ->
        console.log xhr.response
        return callback null, xhr.response

    xhr.onerror = (e) ->
        err = 'Request failed : #{e.target.status}'
        return callback err
    xhr.setRequestHeader 'Content-Type', 'application/json'
    if attributes?
        xhr.send JSON.stringify(attributes)
    else
        xhr.send()