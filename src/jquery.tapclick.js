(function($) {
    $.tapClick = function(options) {
        var settings = {
            moveThreshold: 10
        };

        $.extend(settings, options);

        $.event.special.click = {
            add: function(handleObj) {
                var originalHandler = handleObj.handler;
                var $el = handleObj.selector ? $(handleObj.selector, this) : $(this);

                handleObj.handler = function(e, fire) {
                    e.preventDefault();
                    fire && originalHandler.apply(this, arguments);
                };

                $el.on('touchstart', start);
            },

            remove: function(handleObj) {
                var $el = handleObj.selector ? $(handleObj.selector, this) : $(this);
                $el.off('touchstart', start);
            }
        };

        var start = (function() {
            var startX,
                startY,
                moved;

            var move = function(e) {
                var x = e.originalEvent.touches[0].clientX;
                var y = e.originalEvent.touches[0].clientY;

                var t = settings.moveThreshold;

                moved = Math.abs(x - startX) > t || Math.abs(y - startY) > t;
            };

            var cancel = function(e) {
                var $this = $(this);

                $this.off('touchmove', move);
                $this.off('touchend', end);
                $this.off('touchcancel', cancel);
            };

            var end = function(e) {
                console.log('touchend');

                e.preventDefault();

                var $this = $(this);

                $this.off('touchmove', move);
                $this.off('touchend', end);
                $this.off('touchcancel', cancel);

                !moved && $this.trigger('click', true);
            };

            return function(e) {
                console.log('start');

                var $this = $(this);
                var touch = e.originalEvent.touches[0];

                startX = touch.clientX;
                startY = touch.clientY;
                moved = false;

                $this.on('touchmove', move);
                $this.on('touchend', end);
                $this.on('touchcancel', cancel);
            };
        })();

        $(document).on('touchstart', start);
    };
})(jQuery);

