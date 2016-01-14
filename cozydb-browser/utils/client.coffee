
module.exports =
    # get: (path, id, callback)->
    #   xhr = new XMLHttpRequest
    #   xhr.open 'GET', '/ds-api/#{path}/#{id}', true

    #   xhr.onload = ->
    #     callback null, xhr.response
    #     return

    #   xhr.onerror = (e) ->
    #     err = 'Request failed : #{e.target.status}'
    #     callback err
    #     return

    #   xhr.setRequestHeader 'Content-Type', 'application/json'
    #   xhr.send()

    post: (path, attributes, callback) ->
        location = window.location
        xhr = new XMLHttpRequest
        xhr.open 'POST', "/ds-api/#{path}", true

        xhr.onload = ->
            callback null, xhr.response

        xhr.onerror = (e) ->
            err = 'Request failed : #{e.target.status}'
            callback err


        intent = event.data
        xhr.setRequestHeader 'Content-Type', 'application/json'
        requestHeader = 'Basic ' + btoa "#{intent.appName}:#{intent.token}"
        xhr.setRequestHeader 'Authorization', requestHeader
        xhr.send JSON.stringify(attributes)
