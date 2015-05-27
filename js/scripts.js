var About,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

About = (function() {
  function About() {
    this.openMap = bind(this.openMap, this);
    this.map_open_button = $('.about__address');
    if (this.map_open_button.length === 0) {
      return;
    }
    this.map_open_button.on('click', this.openMap);
  }

  About.prototype.openMap = function(event) {
    if (event) {
      event.preventDefault();
    }
    return $(document).trigger('openMap');
  };

  return About;

})();

$(document).ready(function() {
  return new About;
});

var Brands,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Brands = (function() {
  function Brands() {
    this.move = bind(this.move, this);
    this.next = bind(this.next, this);
    this.prev = bind(this.prev, this);
    var first, last;
    this.widget = $('.brands');
    if (this.widget.length === 0) {
      return;
    }
    this.next_button = this.widget.find('.brands__next');
    this.prev_button = this.widget.find('.brands__prev');
    this.wrapper = this.widget.find('.brands__wrapper');
    this.screens = this.widget.find('.brands__screen');
    this.pages = this.screens.length;
    this.page = 0;
    if (this.pages < 2) {
      this.prev_button.hide();
      this.next_button.hide();
    } else {
      this.scrolling = false;
      first = $(this.screens.get(0)).clone(true).addClass('landing__cloned');
      last = $(this.screens.get(this.pages - 1)).clone(true).addClass('landing__cloned');
      this.wrapper.append(first);
      this.wrapper.prepend(last);
      this.wrapper.css({
        'top': '-100%'
      });
      this.prev_button.on('click', this.prev);
      this.next_button.on('click', this.next);
      key('right', this.next);
      key('left', this.prev);
      this.touch = $('html').hasClass('touch');
      this.toucher = null;
      if (this.touch) {
        this.toucher = new Hammer(this.widget[0]);
        this.toucher.on('swipeleft', this.next);
        this.toucher.on('swiperight', this.prev);
      }
    }
  }

  Brands.prototype.prev = function() {
    if (this.scrolling) {
      return;
    }
    this.scrolling = true;
    this.page--;
    return this.move();
  };

  Brands.prototype.next = function() {
    if (this.scrolling) {
      return;
    }
    this.scrolling = true;
    this.page++;
    return this.move();
  };

  Brands.prototype.move = function() {
    return this.wrapper.stop().animate({
      'top': (this.page * (-100) - 100) + '%'
    }, {
      'duration': 250,
      'complete': (function(_this) {
        return function() {
          if (_this.page === -1) {
            _this.page = _this.pages - 1;
          }
          if (_this.page === _this.pages) {
            _this.page = 0;
          }
          _this.wrapper.css({
            'top': (_this.page * (-100) - 100) + '%'
          });
          return _this.scrolling = false;
        };
      })(this)
    });
  };

  return Brands;

})();

$(document).ready(function() {
  return new Brands;
});

var Contacts,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Contacts = (function() {
  function Contacts() {
    this.openMap = bind(this.openMap, this);
    this.contacts = $('.contacts');
    if (this.contacts.length === 0) {
      return;
    }
    this.map_open_button = $('.contacts__map');
    this.map_open_button.on('click', this.openMap);
  }

  Contacts.prototype.openMap = function(event) {
    if (event) {
      event.preventDefault();
    }
    return $(document).trigger('openMap');
  };

  return Contacts;

})();

$(document).ready(function() {
  return new Contacts;
});

var Landing,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Landing = (function() {
  function Landing() {
    this.move = bind(this.move, this);
    this.next = bind(this.next, this);
    this.prev = bind(this.prev, this);
    var first, last;
    this.widget = $('.landing');
    if (this.widget.length === 0) {
      return;
    }
    this.prev_button = $('.landing__prev');
    this.next_button = $('.landing__next');
    this.wrapper = $('.landing__wrapper');
    this.screens = $('.landing__screen');
    this.page = 0;
    this.pages = this.screens.length;
    if (this.pages < 2) {
      this.prev_button.hide();
      this.next_button.hide();
    } else {
      this.scrolling = false;
      first = $(this.screens.get(0)).clone(true).addClass('landing__cloned');
      last = $(this.screens.get(this.pages - 1)).clone(true).addClass('landing__cloned');
      this.wrapper.append(first);
      this.wrapper.prepend(last);
      this.wrapper.css({
        'left': '-100%'
      });
      this.prev_button.on('click', this.prev);
      this.next_button.on('click', this.next);
      key('right', this.next);
      key('left', this.prev);
      this.touch = $('html').hasClass('touch');
      this.toucher = null;
      if (this.touch) {
        this.toucher = new Hammer(this.widget[0]);
        this.toucher.on('swipeleft', this.next);
        this.toucher.on('swiperight', this.prev);
      }
    }
  }

  Landing.prototype.prev = function() {
    if (this.scrolling) {
      return;
    }
    this.scrolling = true;
    this.page--;
    return this.move();
  };

  Landing.prototype.next = function() {
    if (this.scrolling) {
      return;
    }
    this.scrolling = true;
    this.page++;
    return this.move();
  };

  Landing.prototype.move = function() {
    return this.wrapper.stop().animate({
      'left': (this.page * (-100) - 100) + '%'
    }, {
      'duration': 250,
      'complete': (function(_this) {
        return function() {
          if (_this.page === -1) {
            _this.page = _this.pages - 1;
          }
          if (_this.page === _this.pages) {
            _this.page = 0;
          }
          _this.wrapper.css({
            'left': (_this.page * (-100) - 100) + '%'
          });
          return _this.scrolling = false;
        };
      })(this)
    });
  };

  return Landing;

})();

$(document).ready(function() {
  return new Landing;
});

var Map,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Map = (function() {
  function Map() {
    this.close = bind(this.close, this);
    this.open = bind(this.open, this);
    this.map = $('.map');
    if (this.map.length === 0) {
      return;
    }
    this.animation = false;
    this.map_wrapper = $('.map__wrapper');
    this.map_close_button = $('.map__close');
    this.map_close_button.on('click', this.close);
    $(document).on('openMap', this.open);
    this.location = new google.maps.LatLng(50.46065, 30.510867);
    this.gm = new google.maps.Map(this.map.get(0), {
      center: this.location,
      zoom: 16,
      mapTypeControl: false,
      panControl: true,
      zoomControl: true,
      scaleControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    this.infowindow = new google.maps.InfoWindow({
      content: '<h2 class="marker__title">Via del Corso 88</h2><p class="marker__text">г. Киев, ул. Воздвиженская 21</p>'
    });
    this.marker = new google.maps.Marker({
      position: this.location,
      map: this.gm,
      title: 'Via del Corso 88'
    });
    this.infowindow.open(this.gm, this.marker);
    google.maps.event.addListener(this.marker, 'click', (function(_this) {
      return function() {
        return _this.infowindow.open(_this.gm, _this.marker);
      };
    })(this));
  }

  Map.prototype.open = function(event) {
    if (event) {
      event.preventDefault();
    }
    if (this.animation) {
      return;
    }
    this.animation = true;
    return this.map_wrapper.stop().animate({
      'top': 0
    }, {
      'duration': 250,
      'complete': (function(_this) {
        return function() {
          return _this.animation = false;
        };
      })(this)
    });
  };

  Map.prototype.close = function(event) {
    if (event) {
      event.preventDefault();
    }
    if (this.animation) {
      return;
    }
    return this.map_wrapper.stop().animate({
      'top': '100%'
    }, {
      'duration': 250,
      'complete': (function(_this) {
        return function() {
          _this.animation = false;
          return _this.map_wrapper.css({
            'top': '-100vh'
          });
        };
      })(this)
    });
  };

  return Map;

})();

$(document).ready(function() {
  return new Map;
});

var ProjectNavigation,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

ProjectNavigation = (function() {
  function ProjectNavigation() {
    this.close = bind(this.close, this);
    this.open = bind(this.open, this);
    this.toggle = bind(this.toggle, this);
    this.menu = $('.project-navigation');
    if (this.menu.length === 0) {
      return;
    }
    this.lightbox = $('.project-navigation__lightbox');
    this.open_button = $('.project-navigation__open');
    this.close_button = $('.project-navigation__close');
    this.lightbox.on('click', this.close);
    this.close_button.on('click', this.close);
    this.open_button.on('click', this.open);
    this.animation = false;
    this.open = false;
    this.touch = $('html').hasClass('touch');
    this.toucher = null;
    if (this.touch) {
      this.toucher = new Hammer(document.body);
      this.toucher.on('swipedown', this.toggle);
    }
  }

  ProjectNavigation.prototype.toggle = function() {
    if (this.open) {
      return this.close();
    } else {
      return this.open();
    }
  };

  ProjectNavigation.prototype.open = function() {
    if (this.animation) {
      return;
    }
    this.animation = true;
    if (Modernizr.mq('(max-width: 500px)')) {
      this.close_button.stop().animate({
        'right': 10
      }, {
        'duration': 250
      });
    }
    return this.menu.stop().animate({
      'top': 0
    }, {
      'duration': 250,
      'complete': (function(_this) {
        return function() {
          _this.lightbox.show();
          _this.animation = false;
          return _this.open = true;
        };
      })(this)
    });
  };

  ProjectNavigation.prototype.close = function() {
    if (this.animation) {
      return;
    }
    this.animation = true;
    if (Modernizr.mq('(max-width: 500px)')) {
      this.close_button.stop().animate({
        'right': -50
      }, {
        'duration': 250
      });
    }
    return this.menu.stop().animate({
      'top': '100vh'
    }, {
      'duration': 250,
      'complete': (function(_this) {
        return function() {
          _this.lightbox.hide();
          _this.animation = false;
          _this.open = false;
          return _this.menu.css({
            'top': '-100vh'
          });
        };
      })(this)
    });
  };

  return ProjectNavigation;

})();

$(document).ready(function() {
  return new ProjectNavigation;
});
