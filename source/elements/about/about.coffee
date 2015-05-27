class About
  constructor: ->
    @map_open_button = $ '.about__address'
    if @map_open_button.length == 0
      return
    @map_open_button.on 'click', @openMap

  openMap: (event)=>
    if event
      event.preventDefault()
    $(document).trigger 'openMap'

$(document).ready ->
  new About
