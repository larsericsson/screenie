var wesual = wesual || {};

wesual = {
  $sections: $('section'),

  sectionOffsets: [],

	init: function() {
    this.preloader.init();
    this.fonts.init();
    this.slider.init();
    this.bindEvents();
    this.getSectionOffsets();
    this.mailChimpForm.init();
	},

  bindEvents: function() {
    var self = this;

    setTimeout(function() {
      $(window).on('scroll', $.proxy(self.onScroll, self));
      $(window).trigger('scroll');
    }, 2000);
  },

  getSectionOffsets: function() {
    var self = this;

    this.$sections.each(function() {
      self.sectionOffsets.push($(this).offset().top);
    });
  },

  onScroll: function(e) {
    var tweakOffset = 250,
        viewportBottom = $(window).scrollTop() + $(window).innerHeight() - tweakOffset;

    for (var i = 0; i <= this.sectionOffsets.length; ++i) {
      if (viewportBottom >= this.sectionOffsets[i]) {
        this.$sections.not('.active').first().addClass('active');
        this.sectionOffsets.shift();
        break;
      }
    }

    if (!this.sectionOffsets.length) {
      $(window).off('scroll');
    }
  }
};

wesual.preloader = {
  images: [
    'img/tv.png',
    'img/mbp.png',
    'img/slide-1.jpg',
    'img/slide-2.jpg',
    'img/slide-3.jpg',
    'img/slide-4.jpg',
    'img/slide-5.jpg'
  ],

  init: function() {
    var pxLoader = new PxLoader();

    for (var i = 0; i < this.images.length; ++i) {
      pxLoader.addImage(this.images[i]);
    }

    pxLoader.addCompletionListener(function() {
      setTimeout(function() {
        $('.hero').addClass('active');
      }, 100);
    });

    pxLoader.start();
  }
};

wesual.fonts = {
  init: function() {
    this.initWebFontLoader();
  },

  initWebFontLoader: function() {
    WebFont.load({
      google: {
        families: ['Open Sans']
      },
      custom: {
        families: ['Grumpy Black 24']
      }
    });

    this.initMyFonts();
  },

  initMyFonts: function() {
    var head = document.getElementsByTagName('head')[0],
        path = '//easy.myfonts.net/v2/js?sid=196848(font-family=Grumpy+Black+24)&key=zYSUJW1plZ',
        protocol = ('https:' == document.location.protocol ? 'https:' : 'http:'),
        script = document.createElement('script');

    script.type = 'text/javascript';
    script.async = true;
    script.src = protocol + path;

    head.appendChild(script);

    var checkBanner = setInterval(function() {
      if ($('#mfPreviewBar, #mfPreviewBarShow').length) {
        $('#mfPreviewBar, #mfPreviewBarShow').remove();
        clearInterval(checkBanner);
      }
    }, 10);
  }
};

wesual.mailChimpForm = {
  init: function() {
    $('.js-mailchimp').on('submit', $.proxy(this.onFormPost, this));
  },

  onFormPost: function(e) {
    e.preventDefault();

    var $emailInput = $(e.target).find('input[name="EMAIL"]');
    var parser = document.createElement('a');
    parser.href = $('#mc-embedded-subscribe-form').attr('action');
    parser.pathname += '-json';

    $.ajax(parser.href, {
      'dataType': 'jsonp',
      'jsonp': 'c',
      'data': {
        'EMAIL': $emailInput.val()
      }
    }).done(function(data) {
      if (data.result == 'success') {
        $(e.target).after("Thanks! We'll keep you posted.").remove();
        ga('send', 'event', 'signup', 'success');
      } else if (data.result == 'error') {
        $emailInput.addClass('input-error');
      }
    });
  }
};

wesual.slider = {
  $el: $('.js-slider'),
  $slides: $('.js-slider-viewport').children(),
  $pagination: $('.js-slider-pagination'),

  currentIndex: 0,
  inTransition: false,

  init: function() {
    this.buildPagination();
    this.bindEvents();
  },

  bindEvents: function() {
    this.$pagination.on('click', 'li', $.proxy(this.onPaginationClick, this));
    this.$slides.on('click', $.proxy(this.showNextSlide, this));
  },

  buildPagination: function() {
    var $li = $('<li>');

    for (var i = 0; i < this.$slides.length; ++i) {
      this.$pagination.append($li.clone());
    }

    this.$pagination.children(':first').addClass('active');
  },

  onPaginationClick: function(e) {
    var $this = $(e.currentTarget),
        index = $this.index();

    if (this.currentIndex === index || this.inTransition) return false;

    this.goToSlideIndex(index);

    this.updatePagination(index);
  },

  updatePagination: function(index) {
    if (index > this.$slides.length - 1) index = 0;

    this.$pagination.find('.active').removeClass('active');
    this.$pagination.children().eq(index).addClass('active');
  },

  showNextSlide: function() {
    var currentIndex = this.$slides.filter('.active').index();

    if (this.inTransition) return false;

    this.goToSlideIndex(currentIndex + 1);

    this.updatePagination(currentIndex + 1);
  },

  goToSlideIndex: function(index) {
    var self = this;

    this.inTransition = true;

    if (index > this.$slides.length - 1) index = 0;

    this.currentIndex = index;

    this.$slides.filter('.active').addClass('remove');
    this.$slides.eq(index).addClass('is-next');

    setTimeout(function() {
      self.$slides.eq(index).addClass('active').removeClass('is-next');
      self.$slides.filter('.remove').removeClass('active remove');

      self.inTransition = false;
    }, 1200);
  }
};

$(function() {
	wesual.init();
});