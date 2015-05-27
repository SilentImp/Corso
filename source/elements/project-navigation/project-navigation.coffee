class ProjectNavigation
  constructor: ->
    @menu = $ '.project-navigation'

    if @menu.length == 0
      return

    @lightbox = $ '.project-navigation__lightbox'
    @open_button = $ '.project-navigation__open'
    @close_button = $ '.project-navigation__close'

    @lightbox.on 'click', @close
    @close_button.on 'click', @close
    @open_button.on 'click', @open

    @animation = false
    @open = false

    @touch = $('html').hasClass 'touch'
    @toucher = null
    if @touch
      @toucher = new Hammer document.body
      @toucher.on 'swipedown', @toggle

  toggle: =>
    if @open
      @close()
    else
      @open()

  open: =>
    if @animation
      return
    @animation = true
    if Modernizr.mq('(max-width: 500px)') || Modernizr.mq('(max-height: 500px)')
      @close_button.stop().animate
          'right': 10
        ,
          'duration': 250

    @menu.stop().animate
        'top': 0
      ,
        'duration': 250
        'complete': =>
          @lightbox.show()
          @animation = false
          @open = true


  close: =>
    if @animation
      return
    @animation = true
    if Modernizr.mq('(max-width: 500px)') || Modernizr.mq('(max-height: 500px)')
      @close_button.stop().animate
          'right': -50
        ,
          'duration': 250
    @menu.stop().animate
        'top': '100vh'
      ,
        'duration': 250
        'complete': =>
          @lightbox.hide()
          @animation = false
          @open = false
          @menu.css
            'top': '-100vh'



$(document).ready ->
  new ProjectNavigation
