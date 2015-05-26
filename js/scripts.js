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
        'left': '-100vw'
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
      'left': (this.page * (-100) - 100) + 'vw'
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
            'left': (_this.page * (-100) - 100) + 'vw'
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
