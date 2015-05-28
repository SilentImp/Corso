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
    this.recount = bind(this.recount, this);
    var first, last;
    this.widget = $('.brands');
    if (this.widget.length === 0) {
      return;
    }
    this.next_button = this.widget.find('.brands__next');
    this.prev_button = this.widget.find('.brands__prev');
    this.wrapper = this.widget.find('.brands__wrapper');
    this.screens = this.widget.find('.brands__screen');
    this.book = this.widget.find('.brands__book');
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
      $(window).on('resize', this.recount);
      this.recount();
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

  Brands.prototype.recount = function() {
    var height;
    this.vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    height = this.book.outerHeight();
    this.prev_button.css({
      top: 'auto',
      bottom: height + (this.vh - height) / 2 - 24
    });
    return this.next_button.css({
      bottom: 'auto',
      top: height + (this.vh - height) / 2 - 24
    });
  };

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
    var options, props;
    props = {
      'top': (this.page * (-100) - 100) + '%'
    };
    options = {
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
    };
    return this.wrapper.velocity("stop").velocity(props, options);
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
    this.pos = bind(this.pos, this);
    this.recurrent = bind(this.recurrent, this);
    this.next = bind(this.next, this);
    this.prev = bind(this.prev, this);
    this.recount = bind(this.recount, this);
    var first, last, prelast, second;
    this.widget = $('.collection');
    if (this.widget.length === 0) {
      return;
    }
    this.next_button = this.widget.find('.collection__next');
    this.prev_button = this.widget.find('.collection__prev');
    this.buttons = this.widget.find('button');
    this.wrapper = this.widget.find('.collection__wrapper');
    this.screens = this.widget.find('.collection__screen');
    this.logotype = this.widget.find('.collection__logotype');
    this.time = 500;
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
      this.screens = this.widget.find('.collection__screen');
      this.current = $(this.screens.get(this.page + 2));
      this.recurrent();
      $(window).on('resize', this.recount);
      this.recount();
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

  Collection.prototype.recount = function() {
    var screen_offset, screen_width;
    this.vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    this.vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    screen_width = 1.0125 * this.vh;
    screen_offset = this.vw - screen_width - 30;
    $('.collection__screen').css({
      'height': 0.8 * this.vh,
      'width': 1.0125 * this.vh
    });
    this.pos();
    if (screen_width < .75 * this.vw) {
      this.logotype.css({
        display: 'block',
        width: screen_offset
      });
      this.widget.removeClass('collection_mobile');
      this.screens.css({
        left: screen_offset,
        right: 'auto'
      });
      this.buttons.css({
        left: screen_offset + screen_width / 2 - 60
      });
    }
    if (screen_width >= .75 * this.vw) {
      this.logotype.css({
        display: 'none'
      });
      this.widget.removeClass('collection_mobile');
      this.screens.css({
        left: 0,
        right: 0
      });
      this.buttons.css({
        left: .5 * this.vw - 60
      });
    }
    if (screen_width > this.vw) {
      this.logotype.css({
        display: 'none'
      });
      this.widget.addClass('collection_mobile');
      this.screens.css({
        left: 0,
        right: 0,
        width: '100%'
      });
      return this.buttons.css({
        left: .5 * this.vw - 20
      });
    }
  };

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
    if (typeof this.nexts !== 'undefined' && this.nexts.length === 1) {
      this.nexts.removeClass('collection__nexts');
    }
    this.nexts = this.current.next();
    this.nexts.addClass('collection__nexts');
    if (typeof this.prevs !== 'undefined' && this.prevs.length === 1) {
      this.prevs.removeClass('collection__prevs');
    }
    this.prevs = this.current.prev();
    this.prevs.addClass('collection__prevs');
    if (typeof this.preprev !== 'undefined' && this.preprev.length === 1) {
      this.preprev.removeClass('collection__pre-prevs');
    }
    this.preprev = this.prevs.prev();
    if (typeof this.preprev !== 'undefined' && this.preprev.length === 1) {
      this.preprev.addClass('collection__pre-prevs');
    }
    if (typeof this.prenext !== 'undefined' && this.prenext.length === 1) {
      this.prenext.removeClass('collection__pre-nexts');
    }
    this.prenext = this.nexts.next();
    if (typeof this.prenext !== 'undefined' && this.prenext.length === 1) {
      return this.prenext.addClass('collection__pre-nexts');
    }
  };

  Collection.prototype.pos = function() {
    var options, props;
    $('.collection__screen').velocity("finish");
    options = {
      duration: this.time
    };
    props = {
      top: -200 * this.vh / 100 + 'px',
      opacity: 0,
      scale: 0
    };
    $('.collection__screen:not(.collection__prevs, .collection__nexts, .collection__current, .collection__pre-nexts, .collection__pre-prevs)').velocity("stop").velocity(props, options).velocity("finish");
    if (typeof this.preprev !== 'undefined' && this.preprev.length === 1) {
      props = {
        top: -120 * this.vh / 100 + 'px',
        opacity: 0.4,
        scale: 0.2
      };
      this.preprev.velocity("stop").velocity(props, options).velocity("finish");
    }
    if (typeof this.prevs !== 'undefined' && this.prevs.length === 1) {
      props = {
        top: -40 * this.vh / 100 + 'px',
        opacity: 0.4,
        scale: 0.2
      };
      this.prevs.velocity("stop").velocity(props, options).velocity("finish");
    }
    props = {
      top: 10 * this.vh / 100 + 'px',
      opacity: 1,
      scale: 1
    };
    this.current.velocity("stop").velocity(props, options).velocity("finish");
    if (typeof this.nexts !== 'undefined' && this.nexts.length === 1) {
      props = {
        top: 60 * this.vh / 100 + 'px',
        opacity: 0.4,
        scale: 0.2
      };
      this.nexts.velocity("stop").velocity(props, options).velocity("finish");
    }
    if (typeof this.prenext !== 'undefined' && this.prenext.length === 1) {
      props = {
        top: 140 * this.vh / 100 + 'px',
        opacity: 0.4,
        scale: 0.2
      };
      this.prenext.velocity("stop").velocity(props, options).velocity("finish");
    }
    props = {
      top: 220 * this.vh / 100 + 'px'
    };
    return $('.collection__pre-nexts ~ .collection__screen').velocity("stop").velocity(props, options).velocity("finish");
  };

  Collection.prototype.move = function() {
    var options, props;
    options = {
      'duration': this.time
    };
    if (typeof this.preprev !== 'undefined' && this.preprev.length === 1) {
      props = {
        'top': -120 * this.vh / 100 + 'px',
        'opacity': 0.4,
        'scale': 0.2
      };
      this.preprev.velocity("stop").velocity(props, options);
    }
    if (typeof this.prevs !== 'undefined' && this.prevs.length === 1) {
      props = {
        'top': -40 * this.vh / 100 + 'px',
        'opacity': 0.4,
        'scale': 0.2
      };
      this.prevs.velocity("stop").velocity(props, options);
    }
    if (typeof this.nexts !== 'undefined' && this.nexts.length === 1) {
      props = {
        'top': 60 * this.vh / 100 + 'px',
        'opacity': 0.4,
        'scale': 0.2
      };
      this.nexts.velocity("stop").velocity(props, options);
    }
    if (typeof this.prenext !== 'undefined' && this.prenext.length === 1) {
      props = {
        'top': 140 * this.vh / 100 + 'px',
        'opacity': 0.4,
        'scale': 0.2
      };
      this.prenext.velocity("stop").velocity(props, options);
    }
    props = {
      'top': 10 * this.vh / 100 + 'px',
      'opacity': 1,
      'scale': 1
    };
    options = {
      'duration': this.time,
      'complete': (function(_this) {
        return function() {
          var jump;
          _this.scrolling = false;
          jump = false;
          if (_this.page === -1) {
            _this.page = _this.pages - 1;
            jump = true;
          }
          if (_this.page === _this.pages) {
            _this.page = 0;
            jump = true;
          }
          if (jump) {
            return window.setTimeout(function() {
              _this.recurrent();
              _this.pos();
              return _this.scrolling = false;
            }, 0);
          }
        };
      })(this)
    };
    return this.current.velocity("stop").velocity(props, options);
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
      this.screens = $('.landing__screen');
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
    var options, options_after, options_before, props, props_after, props_before;
    props_before = {
      'scale': 0.9
    };
    options_before = {
      'duration': 350
    };
    props_after = {
      'scale': 1
    };
    options_after = {
      'duration': 350
    };
    this.screens.velocity("stop").velocity(props_before, options_before).velocity(props_after, options_after);
    options = {
      'duration': 800,
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
    };
    props = {
      'left': (this.page * (-100) - 100) + '%'
    };
    return this.wrapper.velocity("stop").velocity(props, options);
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
    this.center = bind(this.center, this);
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
    $(window).on('resize', this.center);
  }

  Map.prototype.center = function() {
    return this.gm.setCenter(this.location);
  };

  Map.prototype.open = function(event) {
    var options, props;
    if (event) {
      event.preventDefault();
    }
    if (this.animation) {
      return;
    }
    this.animation = true;
    props = {
      'top': 0
    };
    options = {
      'duration': 250,
      'complete': (function(_this) {
        return function() {
          return _this.animation = false;
        };
      })(this)
    };
    return this.map_wrapper.velocity("stop").velocity(props, options);
  };

  Map.prototype.close = function(event) {
    var options, props;
    if (event) {
      event.preventDefault();
    }
    if (this.animation) {
      return;
    }
    props = {
      'top': '100%'
    };
    options = {
      'duration': 250,
      'complete': (function(_this) {
        return function() {
          _this.animation = false;
          return _this.map_wrapper.css({
            'top': '-100%'
          });
        };
      })(this)
    };
    return this.map_wrapper.velocity("stop").velocity(props, options);
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
    this.recount = bind(this.recount, this);
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
    $(window).on('resize', this.recount);
    this.recount();
  }

  ProjectNavigation.prototype.recount = function() {
    var options, props;
    if (Modernizr.mq('(max-width: 605px)') || Modernizr.mq('(max-height: 500px)')) {
      if (this.open) {
        props = {
          'right': '10px'
        };
        options = {
          'duration': 250
        };
        return this.close_button.velocity("stop").velocity(props, options);
      } else {
        props = {
          'right': '-50px'
        };
        options = {
          'duration': 250
        };
        return this.close_button.velocity("stop").velocity(props, options);
      }
    } else {
      return this.close_button.removeAttr('style');
    }
  };

  ProjectNavigation.prototype.toggle = function() {
    if (this.open) {
      return this.close();
    } else {
      return this.open();
    }
  };

  ProjectNavigation.prototype.open = function() {
    var options, props;
    if (this.animation) {
      return;
    }
    this.animation = true;
    if (Modernizr.mq('(max-width: 605px)') || Modernizr.mq('(max-height: 500px)')) {
      props = {
        'right': 10
      };
      options = {
        'duration': 250
      };
      this.close_button.velocity("stop").velocity(props, options);
    }
    props = {
      'top': 0
    };
    options = {
      'duration': 250,
      'complete': (function(_this) {
        return function() {
          _this.lightbox.show();
          _this.animation = false;
          return _this.open = true;
        };
      })(this)
    };
    return this.menu.velocity("stop").velocity(props, options);
  };

  ProjectNavigation.prototype.close = function() {
    var options, props;
    if (this.animation) {
      return;
    }
    this.animation = true;
    if (Modernizr.mq('(max-width: 605px)') || Modernizr.mq('(max-height: 500px)')) {
      props = {
        'right': -50
      };
      options = {
        'duration': 250
      };
      this.close_button.velocity("stop").velocity(props, options);
    }
    props = {
      'top': '100%'
    };
    options = {
      'duration': 250,
      'complete': (function(_this) {
        return function() {
          _this.lightbox.hide();
          _this.animation = false;
          _this.open = false;
          return _this.menu.css({
            'top': '-100%'
          });
        };
      })(this)
    };
    return this.menu.velocity("stop").velocity(props, options);
  };

  return ProjectNavigation;

})();

$(document).ready(function() {
  return new ProjectNavigation;
});
