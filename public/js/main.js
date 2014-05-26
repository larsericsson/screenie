var wesual = wesual || {};

wesual = {
	init: function() {
		this.initMyFonts();
    this.slider.init();
    this.bindEvents();
	},

  bindEvents: function() {

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
    var self = this,
        goingFowards = (this.currentIndex < index) ? true : false;

    this.inTransition = true;

    this.currentIndex = index;

    if (goingFowards) {
      this.$slides.filter('.active').addClass('remove-forwards');
      this.$slides.eq(index).addClass('next');

      setTimeout(function() {
        self.$slides.eq(index).addClass('active').removeClass('next');
        self.$slides.filter('.remove-forwards').removeClass('active remove-forwards');

        self.inTransition = false;
      }, 1200);
    }
  }
};

$(function() {
	wesual.init();
});