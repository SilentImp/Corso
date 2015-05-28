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

      @screens = $ '.landing__screen'

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

    props_after =
      'scale': 1

    options_after =
      'duration': 350
      'complete': =>

        if @page == -1
          @page = @pages-1

        if @page == @pages
          @page = 0

        @wrapper.css
          'left': (@page*(-100)-100)+'%'

        @scrolling = false

    options_middle =
      'duration': 800
      'complete': =>
        @screens.velocity("stop").velocity(props_after, options_after)

    props_middle =
      'left': (@page*(-100)-100)+'%'

    props_before =
      'scale': .75

    options_before =
      'duration': 350
      'complete': =>
        @wrapper.velocity("stop").velocity(props_middle, options_middle)

    @screens.velocity("stop").velocity(props_before, options_before)




$(document).ready ->
  new Landing
