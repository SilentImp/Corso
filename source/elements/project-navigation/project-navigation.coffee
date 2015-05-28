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
      props =
        'right': 10
      options =
        'duration': 250
      @close_button.velocity("stop").velocity(props, options)

    props =
      'top': 0
    options =
      'duration': 250
      'complete': =>
        @lightbox.show()
        @animation = false
        @open = true
    @menu.velocity("stop").velocity(props, options)

  close: =>
    if @animation
      return
    @animation = true
    if Modernizr.mq('(max-width: 500px)') || Modernizr.mq('(max-height: 500px)')
      props =
        'right': -50
      options =
        'duration': 250
      @close_button.velocity("stop").velocity(props, options)

    props =
      'top': '100%'
    options =
      'duration': 250
      'complete': =>
        @lightbox.hide()
        @animation = false
        @open = false
        @menu.css
          'top': '-100%'
    @menu.velocity("stop").velocity(props, options)

$(document).ready ->
  new ProjectNavigation
