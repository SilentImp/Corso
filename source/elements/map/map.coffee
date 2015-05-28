class Map
  constructor: ->
    @map = $ '.map'
    if @map.length == 0
      return

    @animation = false
    @map_wrapper = $ '.map__wrapper'

    @map_close_button = $ '.map__close'
    @map_close_button.on 'click', @close

    $(document).on 'openMap',  @open

    @location = new google.maps.LatLng(50.46065, 30.510867)
    @gm = new google.maps.Map @map.get(0),
      center: @location
      zoom: 16
      mapTypeControl: false
      panControl: true
      zoomControl: true
      scaleControl: true
      mapTypeId: google.maps.MapTypeId.ROADMAP

    @infowindow = new google.maps.InfoWindow
      content: '<h2 class="marker__title">Via del Corso 88</h2><p class="marker__text">г. Киев, ул. Воздвиженская 21</p>'

    @marker = new google.maps.Marker
      position: @location
      map: @gm
      title: 'Via del Corso 88'

    @infowindow.open @gm, @marker

    google.maps.event.addListener @marker, 'click', =>
      @infowindow.open @gm, @marker

    $(window).on 'resize', @center

  center: =>
    @gm.setCenter @location

  open: (event)=>
    if event
      event.preventDefault()
    if @animation
      return
    @animation = true
    @map_wrapper.stop().animate
        'top': 0
      ,
        'duration': 250
        'complete': =>
          @animation = false

  close: (event)=>
    if event
      event.preventDefault()
    if @animation
      return
    @map_wrapper.stop().animate
        'top': '100%'
      ,
        'duration': 250
        'complete': =>
          @animation = false
          @map_wrapper.css
            'top': '-100vh'


$(document).ready ->
  new Map
