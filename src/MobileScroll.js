define(['jquery', 'Gwa.Event.Dispatcher'], function( $, Dispatcher ) {
	return function( win ) {
		var _window = win,
			_wrap,
			_holder,
			_instance = new Dispatcher(),
			_y,
			_top = 0,
			_newtop,
			_min;

		function _wrapContent() {
			_holder = $('body').eq(0).wrapInner($('<div />')).children().first();
			_wrap = $('body').eq(0).wrapInner($('<div style="overflow: hidden" />')).children().first();
			_handleResize();
		}

		function _initListeners() {
			_window.on('resize', _handleResize);
			document.addEventListener('touchstart', _handleTouchStart, false);
			document.addEventListener('touchmove', _handleTouchMove, false);
			document.addEventListener('touchend', _handleTouchEnd, false);
		}

		function _handleResize() {
			_wrap.width(_window.width()).height(_window.height());
			_min = 0 - _holder.height() + _window.innerHeight();
		}

		function _handleTouchStart( ev ) {
			_y = ev.touches[0].pageY;
		}

		function _handleTouchMove( ev ) {
			ev.preventDefault();
			var diff = ev.touches[0].pageY - _y;
			_newtop = Math.max(
				Math.min(0, _top + diff),
				_min
			);
			_holder.css(
				{transform: 'translateY(' + _newtop + 'px)'}
			);
			_instance.dispatch('SCROLL', _newtop, _instance);
		}

		function _handleTouchEnd( ev ) {
			_top = _newtop;
		}

		_instance.init = function() {
			_wrapContent();
			_initListeners();
		};

		return _instance;
	}
});
