class Contacts
  constructor: ->
    @contacts = $ '.contacts'
    if @contacts.length == 0
      return
    @map_open_button = $ '.contacts__map'
    @map_open_button.on 'click', @openMap

    if $('html').hasClass('no-backgroundsize')
      $(window).on 'resize', @images
      @images()

  images: (event)=>
    $('.contacts__map').getBackgroundImageSizeCover @reimg


  reimg: (w, h, ml, mt, wrapper)=>
    wrapper.find('.bgsc').css
      'margin-left': ml+'px'
      'width': w
      'height': h

  openMap: (event)=>
    if event
      event.preventDefault()
    $(document).trigger 'openMap'

$(document).ready ->
  new Contacts
