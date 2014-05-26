var wesual = wesual || {};

wesual = {
	init: function() {
    this.preloader.init();
		this.fonts.init();
    this.slider.init();
    this.bindEvents();
	},

  bindEvents: function() {

  }
};

wesual.preloader = {
  images: [
    'img/tv.png',
    'img/mbr.png',
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
    var self = this;

    this.$pagination.on('click', 'li', $.proxy(this.onPaginationClick, this));
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

    this.$pagination.find('.active').removeClass('active');

    $this.addClass('active');

    this.goToSlideIndex(index);
  },

  goToSlideIndex: function(index) {
    var self = this, transitionOutClass, animMs,
        goingFowards = (this.currentIndex < index) ? true : false;

    this.inTransition = true;

    this.currentIndex = index;

    if (goingFowards) {
      transitionOutClass = 'remove-forwards';
      transitionInClass = 'next';
      animMs = 1300;
    } else {
      transitionOutClass = 'remove-backwards';
      transitionInClass = 'prev';
      animMs = 1300;
    }

    if (!goingFowards) {
      this.$slides.eq(index).addClass('prepare-prev');
    }

    this.$slides.filter('.active').addClass(transitionOutClass);
    this.$slides.eq(index).addClass(transitionInClass);

    setTimeout(function() {
      self.$slides.eq(index).addClass('active').removeClass('next prev prepare-prev');
      self.$slides.filter('.' + transitionOutClass).removeClass('active ' + transitionOutClass);

      self.inTransition = false;
    }, animMs);
  }
};

$(function() {
	wesual.init();
});