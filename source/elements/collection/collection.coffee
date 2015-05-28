class Collection
  constructor: ->
    @widget = $ '.collection'

    if @widget.length == 0
      return

    @next_button = @widget.find '.collection__next'
    @prev_button = @widget.find '.collection__prev'
    @buttons = @widget.find 'button'

    @wrapper = @widget.find '.collection__wrapper'
    @screens = @widget.find '.collection__screen'
    @logotype = @widget.find '.collection__logotype'

    @time = 500
    @pages = @screens.length;
    @page = 0


    if @pages < 2

      @prev_button.hide()
      @next_button.hide()

    else

      @scrolling = false

      # Добавление обрамляющих элементов
      first = $(@screens.get(0)).clone(true).addClass('collection__cloned')
      second = $(@screens.get(1)).clone(true).addClass('collection__cloned')
      last = $(@screens.get(@pages - 1)).clone(true).addClass('collection__cloned')
      prelast = $(@screens.get(@pages - 2)).clone(true).addClass('collection__cloned')
      @wrapper.append(first)
      @wrapper.append(second)
      @wrapper.prepend(last)
      @wrapper.prepend(prelast)

      @screens = @widget.find '.collection__screen'
      @current = $ @screens.get @page+2

      @recurrent()
      $(window).on 'resize', @recount
      @recount()

      # Взаимодействие
      @prev_button.on 'click', @prev
      @next_button.on 'click', @next
      key 'down', @next
      key 'up', @prev
      @touch = $('html').hasClass 'touch'
      @toucher = null
      if @touch
        @toucher = new Hammer(@widget[0])
        @toucher.on 'swipedown', @next
        @toucher.on 'swipeup', @prev

  recount: =>
      @vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
      @vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
      screen_width = 1.0125*@vh
      screen_offset = @vw - screen_width - 30

      $('.collection__screen').css
        'height': 0.8*@vh
        'width': 1.0125*@vh
      @pos()

      if screen_width < .75*@vw

        @logotype.css
          display: 'block'
          width: screen_offset

        @widget.removeClass 'collection_mobile'

        @screens.css
          left: screen_offset
          right: 'auto'

        @buttons.css
          left: screen_offset + screen_width/2 - 60

      if screen_width >= .75*@vw
        @logotype.css
          display: 'none'

        @widget.removeClass 'collection_mobile'

        @screens.css
          left: 0
          right: 0

        @buttons.css
          left: .5*@vw - 60

      if screen_width > @vw
        @logotype.css
          display: 'none'

        @widget.addClass 'collection_mobile'

        @screens.css
          left: 0
          right: 0
          width: '100%'

        @buttons.css
          left: .5*@vw - 20







  prev: =>
    if @scrolling
      return

    @scrolling = true
    @page--
    @recurrent()
    @move()


  next: =>
    if @scrolling
      return

    @scrolling = true
    @page++
    @recurrent()
    @move()

  recurrent: =>

    @current.removeClass 'collection__current'
    @current = $ @screens.get @page+2
    @current.addClass 'collection__current'

    if typeof @nexts != 'undefined' && @nexts.length == 1
      @nexts.removeClass 'collection__nexts'

    @nexts = @current.next()
    @nexts.addClass 'collection__nexts'

    if typeof @prevs != 'undefined' && @prevs.length == 1
      @prevs.removeClass 'collection__prevs'

    @prevs = @current.prev()
    @prevs.addClass 'collection__prevs'

    if typeof @preprev != 'undefined' && @preprev.length == 1
      @preprev.removeClass 'collection__pre-prevs'
    @preprev = @prevs.prev()
    if typeof @preprev != 'undefined' && @preprev.length == 1
      @preprev.addClass 'collection__pre-prevs'

    if typeof @prenext != 'undefined' && @prenext.length == 1
      @prenext.removeClass 'collection__pre-nexts'
    @prenext = @nexts.next()
    if typeof @prenext != 'undefined' && @prenext.length == 1
      @prenext.addClass 'collection__pre-nexts'


  pos: =>

    $('.collection__screen').velocity("finish")

    options =
      duration: @time

    props =
      top: -200*@vh/100 +'px'
      opacity: 0
      scale: 0

    $('.collection__screen:not(.collection__prevs, .collection__nexts, .collection__current, .collection__pre-nexts, .collection__pre-prevs)').velocity("stop").velocity(props, options).velocity("finish")

    if typeof @preprev != 'undefined' && @preprev.length == 1
      props =
        top: -120*@vh/100 +'px'
        opacity: 0.4
        scale: 0.2
      @preprev.velocity("stop").velocity(props, options).velocity("finish")

    if typeof @prevs != 'undefined' && @prevs.length == 1
      props =
        top: -40*@vh/100 +'px'
        opacity: 0.4
        scale: 0.2
      @prevs.velocity("stop").velocity(props, options).velocity("finish")

    props =
      top: 10*@vh/100 +'px'
      opacity: 1
      scale: 1
    @current.velocity("stop").velocity(props, options).velocity("finish")

    if typeof @nexts != 'undefined' && @nexts.length == 1
      props =
        top: 60*@vh/100 +'px'
        opacity: 0.4
        scale: 0.2
      @nexts.velocity("stop").velocity(props, options).velocity("finish")

    if typeof @prenext != 'undefined' && @prenext.length == 1
      props =
        top: 140*@vh/100 +'px'
        opacity: 0.4
        scale: 0.2
      @prenext.velocity("stop").velocity(props, options).velocity("finish")

    props =
      top: 220*@vh/100 +'px'
    $('.collection__pre-nexts ~ .collection__screen').velocity("stop").velocity(props, options).velocity("finish")

  move: =>

    options =
      'duration': @time

    if typeof @preprev != 'undefined' && @preprev.length == 1
      props =
        'top': -120*@vh/100 +'px'
        'opacity': 0.4
        'scale': 0.2
      @preprev.velocity("stop").velocity(props, options)

    if typeof @prevs != 'undefined' && @prevs.length == 1
      props =
        'top': -40*@vh/100 +'px'
        'opacity': 0.4
        'scale': 0.2

      @prevs.velocity("stop").velocity(props, options)

    if typeof @nexts != 'undefined' && @nexts.length == 1
      props =
        'top': 60*@vh/100 +'px'
        'opacity': 0.4
        'scale': 0.2

      @nexts.velocity("stop").velocity(props, options)


    if typeof @prenext != 'undefined' && @prenext.length == 1
      props =
        'top': 140*@vh/100 +'px'
        'opacity': 0.4
        'scale': 0.2

      @prenext.velocity("stop").velocity(props, options)

    props =
      'top': 10*@vh/100 +'px'
      'opacity': 1
      'scale': 1

    options =
      'duration': @time
      'complete': =>
        @scrolling = false
        jump = false

        if @page == -1
          @page = @pages-1
          jump = true

        if @page == @pages
          @page = 0
          jump = true

        if jump
          window.setTimeout(=>
            @recurrent()
            @pos()
            @scrolling = false
          , 0)


    @current.velocity("stop").velocity(props, options)




$(document).ready ->
  new Collection
