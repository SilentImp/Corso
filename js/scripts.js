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
      key('down', this.next);
      key('up', this.prev);
      this.touch = $('html').hasClass('touch');
      this.toucher = null;
      if (this.touch) {
        this.toucher = new Hammer(this.widget[0]);
        this.toucher.on('swipedown', this.next);
        this.toucher.on('swipeup', this.prev);
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

var Collection,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Collection = (function() {
  function Collection() {
    this.move = bind(this.move, this);
    this.reshape = bind(this.reshape, this);
    this.recurrent = bind(this.recurrent, this);
    this.next = bind(this.next, this);
    this.prev = bind(this.prev, this);
    var first, last, prelast, second;
    this.widget = $('.collection');
    if (this.widget.length === 0) {
      return;
    }
    this.next_button = this.widget.find('.collection__next');
    this.prev_button = this.widget.find('.collection__prev');
    this.wrapper = this.widget.find('.collection__wrapper');
    this.screens = this.widget.find('.collection__screen');
    this.book = this.widget.find('.collection__book');
    this.delay = this.book.outerHeight();
    this.time = 1500;
    this.pages = this.screens.length;
    this.page = 0;
    if (this.pages < 2) {
      this.prev_button.hide();
      this.next_button.hide();
    } else {
      this.scrolling = false;
      first = $(this.screens.get(0)).clone(true).addClass('collection__cloned');
      second = $(this.screens.get(1)).clone(true).addClass('collection__cloned');
      last = $(this.screens.get(this.pages - 1)).clone(true).addClass('collection__cloned');
      prelast = $(this.screens.get(this.pages - 2)).clone(true).addClass('collection__cloned');
      this.wrapper.append(first);
      this.wrapper.append(second);
      this.wrapper.prepend(last);
      this.wrapper.prepend(prelast);
      this.wrapper.css({
        'top': '-' + 2 * this.delay + 'px'
      });
      this.screens = this.widget.find('.collection__screen');
      this.current = $(this.screens.get(this.page + 2));
      this.recurrent();
      $('.collection__screen:not(.collection__current) .collection__inner').css({
        'opacity': .4,
        'transform': 'scale(0.8)'
      });
      $('.collection__screen.collection__current .collection__inner').css({
        'opacity': 1,
        'transform': 'scale(1)'
      });
      this.prev_button.on('click', this.prev);
      this.next_button.on('click', this.next);
      key('down', this.next);
      key('up', this.prev);
      this.touch = $('html').hasClass('touch');
      this.toucher = null;
      if (this.touch) {
        this.toucher = new Hammer(this.widget[0]);
        this.toucher.on('swipedown', this.next);
        this.toucher.on('swipeup', this.prev);
      }
    }
  }

  Collection.prototype.prev = function() {
    if (this.scrolling) {
      return;
    }
    this.scrolling = true;
    this.page--;
    this.recurrent();
    return this.move();
  };

  Collection.prototype.next = function() {
    if (this.scrolling) {
      return;
    }
    this.scrolling = true;
    this.page++;
    this.recurrent();
    return this.move();
  };

  Collection.prototype.recurrent = function() {
    this.current.removeClass('collection__current');
    this.current = $(this.screens.get(this.page + 2));
    this.current.addClass('collection__current');
    if (this.nexts) {
      this.nexts.removeClass('collection__nexts');
    }
    this.nexts = this.current.next();
    if (this.nexts) {
      this.nexts.addClass('collection__nexts');
    }
    if (this.prevs) {
      this.prevs.removeClass('collection__prevs');
    }
    this.prevs = this.current.prev();
    if (this.prevs) {
      return this.prevs.addClass('collection__prevs');
    }
  };

  Collection.prototype.reshape = function() {
    $('.collection__screen:not(.collection__current) .collection__inner').velocity({
      'properties': {
        'opacity': 0.4,
        'scale': 0.8
      },
      'options': {
        'duration': this.time / 2
      }
    });
    return $('.collection__screen.collection__current .collection__inner').velocity({
      'properties': {
        'opacity': 1,
        'scale': 1
      },
      'options': {
        'duration': this.time / 2
      }
    });
  };

  Collection.prototype.move = function() {
    this.reshape();
    return this.wrapper.velocity('stop').velocity({
      'properties': {
        'top': (this.page * (-this.delay) - 2 * this.delay) + 'px'
      },
      'options': {
        'duration': this.time,
        'easing': 'linear',
        'complete': (function(_this) {
          return function() {
            var jump;
            jump = false;
            if (_this.page === -1) {
              _this.page = _this.pages - 1;
              jump = true;
            }
            if (_this.page === _this.pages) {
              _this.page = 0;
              jump = true;
            }
            _this.scrolling = false;
            if (jump) {
              _this.wrapper.velocity('stop').css({
                'top': (_this.page * (-_this.delay) - 2 * _this.delay) + 'px'
              });
              _this.recurrent();
              $('.collection__screen:not(.collection__current) .collection__inner').css({
                'opacity': .4,
                'transform': 'scale(0.8)'
              });
              _this.current.find('.collection__inner').css({
                'opacity': 1,
                'transform': 'scale(1)'
              });
              return jump = false;
            }
          };
        })(this)
      }
    });
  };

  return Collection;

})();

$(document).ready(function() {
  return new Collection;
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
    if (Modernizr.mq('(max-width: 500px)') || Modernizr.mq('(max-height: 500px)')) {
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
    if (Modernizr.mq('(max-width: 500px)') || Modernizr.mq('(max-height: 500px)')) {
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
