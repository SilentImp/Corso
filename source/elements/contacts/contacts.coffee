class Contacts
  constructor: ->
    @contacts = $ '.contacts'
    if @contacts.length == 0
      return
    @map_open_button = $ '.contacts__map'
    @map_open_button.on 'click', @openMap

  openMap: (event)=>
    if event
      event.preventDefault()
    $(document).trigger 'openMap'

$(document).ready ->
  new Contacts
