class About
  constructor: ->
    @map_open_button = $ '.about__address'
    if @map_open_button.length == 0
      return
    @map_open_button.on 'click', @openMap

    if $('html').hasClass('no-backgroundsize')
      $(window).on 'resize', @images
      @images()

  images: (event)=>
    $('.about__logotype').getBackgroundImageSizeCover @reimg


  reimg: (w, h, ml, mt, wrapper)=>
    wrapper.find('.bgsc').css
      'margin-top': mt+'px'
      'margin-left': ml+'px'
      'width': w
      'height': h

  openMap: (event)=>
    if event
      event.preventDefault()
    $(document).trigger 'openMap'

$(document).ready ->
  new About
