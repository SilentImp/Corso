class Collection
  constructor: ->
    @widget = $ '.collection'

    if @widget.length == 0
      return

    @next_button = @widget.find '.collection__next'
    @prev_button = @widget.find '.collection__prev'
    @wrapper = @widget.find '.collection__wrapper'
    @screens = @widget.find '.collection__screen'
    @book = @widget.find '.collection__book'
    @delay = @book.outerHeight()


    @time = 1500
    @pages = @screens.length;
    @page = 0

    if @pages < 2
      @prev_button.hide()
      @next_button.hide()
    else
      @scrolling = false

      first = $(@screens.get(0)).clone(true).addClass('collection__cloned')
      second = $(@screens.get(1)).clone(true).addClass('collection__cloned')

      last = $(@screens.get(@pages - 1)).clone(true).addClass('collection__cloned')
      prelast = $(@screens.get(@pages - 2)).clone(true).addClass('collection__cloned')

      @wrapper.append(first)
      @wrapper.append(second)



      @wrapper.prepend(last)
      @wrapper.prepend(prelast)


      @wrapper.css
        'top':'-'+2*@delay+'px'

      @screens = @widget.find '.collection__screen'
      @current = $ @screens.get @page+2

      @recurrent()
      $('.collection__inner').css
        'opacity': .4
        'transform': 'scale(0.8)'
      @current.find('.collection__inner').css
        'opacity': 1
        'transform': 'scale(1)'

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

    if @nexts
      @nexts.removeClass 'collection__nexts'

    @nexts = @current.next()

    if @nexts
      @nexts.addClass 'collection__nexts'

    if @prevs
      @prevs.removeClass 'collection__prevs'

    @prevs = @current.prev()

    if @prevs
      @prevs.addClass 'collection__prevs'

  reshape: =>

    # @screens.find('.collection__inner').css
    #   'opacity': .4
    #
    # @current.find('.collection__inner').css
    #   'opacity': 1

    $('.collection__inner').velocity({
      'properties': {
        'opacity': 0.4
        'scale': 0.8
      },
      'options': {
        'duration': @time/2
      }
    })

    @current.find('.collection__inner').velocity({
      'properties': {
        'opacity': 1
        'scale': 1
      },
      'options': {
        'duration': @time/2
      }
    })


  move: =>
    @reshape()
    @wrapper.velocity('stop').velocity({
      'properties': {
        'top': (@page*(-@delay)-2*@delay)+'px'
      },
      'options': {
        'duration': @time
        'easing': 'linear',
        'complete': =>

          jump = false

          if @page == -1
            @page = @pages-1
            jump = true

          if @page == @pages
            @page = 0
            jump = true

          @scrolling = false

          if jump
            @wrapper.velocity('stop').css
              'top': (@page*(-@delay)-2*@delay)+'px'

            @recurrent()

            $('.collection__inner').css
              'opacity': .4
              'transform': 'scale(0.8)'

            @current.find('.collection__inner').css
              'opacity': 1
              'transform': 'scale(1)'

            jump = false

        }
      })

$(document).ready ->
  new Collection
