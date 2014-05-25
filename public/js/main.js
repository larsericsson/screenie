var wesual = wesual || {};

wesual = {
	init: function() {
		this.initFont()
	},

	initFont: function() {
        var head = document.getElementsByTagName('head')[0];
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
}

$(function() {
	wesual.init();
});