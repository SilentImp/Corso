class Brands
  constructor: ->
    @widget = $ '.brands'

    if @widget.length == 0
      return

    @next_button = @widget.find '.brands__next'
    @prev_button = @widget.find '.brands__prev'
    @wrapper = @widget.find '.brands__wrapper'
    @screens = @widget.find '.brands__screen'

    @pages = @screens.length;
    @page = 0

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
        'top': '-100%'
      });

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
        'top': (@page*(-100)-100)+'%'
      ,
        'duration': 250
        'complete': =>

          if @page == -1
            @page = @pages-1

          if @page == @pages
            @page = 0

          @wrapper.css
            'top': (@page*(-100)-100)+'%'

          @scrolling = false


$(document).ready ->
  new Brands
