class Landing
  constructor: ->
    @widget = $ '.landing'
    if @widget.length == 0
      return

    @prev_button = $ '.landing__prev'
    @next_button = $ '.landing__next'
    @wrapper = $ '.landing__wrapper'
    @screens = $ '.landing__screen'

    @page = 0
    @pages = @screens.length

    if @pages < 2
      @prev_button.hide()
      @next_button.hide()
    else
      @scrolling = false
      first = $(@screens.get(0)).clone(true).addClass('landing__cloned')
      last = $(@screens.get(@pages - 1)).clone(true).addClass('landing__cloned')
      @wrapper.append(first)
      @wrapper.prepend(last)
      @wrapper.css({
        'left': '-100%'
      });

      @prev_button.on 'click', @prev
      @next_button.on 'click', @next

      key 'right', @next
      key 'left', @prev

      @touch = $('html').hasClass 'touch'
      @toucher = null
      if @touch
        @toucher = new Hammer(@widget[0])
        @toucher.on 'swipeleft', @next
        @toucher.on 'swiperight', @prev



  prev: =>
    if @scrolling
      return

    @scrolling = true
    @page--
    @move()


  next: =>
    if @scrolling
      return

    @scrolling = true
    @page++
    @move()

  move: =>
    @wrapper.stop().animate
        'left': (@page*(-100)-100)+'%'
      ,
        'duration': 250
        'complete': =>

          if @page == -1
            @page = @pages-1

          if @page == @pages
            @page = 0

          @wrapper.css
            'left': (@page*(-100)-100)+'%'

          @scrolling = false


$(document).ready ->
  new Landing
