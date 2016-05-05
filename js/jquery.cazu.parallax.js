/* Parallax Plugin
 * @author: Pablo Cazorla
 * @e-mail: pablo.david.cazorla@gmail.com
 * @date: 21/04/2016
 */
(function($) {
	$.fn.parallax = function(options) {

		// Window reference
		var $window = $(window),
			// Settings
			setting = $.extend({
				backgroundClass: 'bg',
				backgroundColor: '#000',
				opacity: 0.7,
				vel: 0.3,
				backgroundElement: '*'
			}, options);

		return this.each(function() {
			var $this = $(this).css({
					'background': 'transparent none'
				}),
				$bg = $this.find('> .' + setting.backgroundClass).css({
					'position': 'absolute',
					'z-index': '-1',
					'top': 0,
					'bottom': 0,
					'left': 0,
					'right': 0,
					'padding': 0,
					'margin': 0,
					'overflow': 'hidden',
					'background-color': setting.backgroundColor
				}),
				$element = $bg.find('> ' + setting.backgroundElement).eq(0).css({
					'opacity': '0',
					'position': 'absolute'
				}),
				onLoadElement = function(callback) {
					var $img = $bg.find('img'),
						count = $img.length;
					if (count > 0) {
						var timer = setInterval(function() {
							var i = 0;
							$img.each(function() {
								if (this.complete) {
									i++;
								}
							});
							if (i >= count) {
								clearInterval(timer);
								callback();
							}
						}, 100);
					} else {
						var $vid = $bg.find('video').eq(0);
						if ($vid.length > 0) {
							var video = $vid[0],
								timer = setInterval(function() {
									if (video.readyState === 4) {
										clearInterval(timer);
										callback();
									}
								}, 100);
						} else {
							callback();
						}
					}
				},
				w = {
					A: 0,
					I: 0
				},
				h = {
					A: 0,
					Ap: 0,
					I: 0,
					dif: 0
				},
				m = {
					Ap: 1,
					I: 1
				},
				dy = 0,
				x = 0,
				y = 0,
				setPosition = function() {
					var k = $this[0].getBoundingClientRect().top / $window.height();
					y = -1 * (k * (2 * h.dif)) + dy;
					$element
						.css({
							'top': Math.round(y) + 'px'
						});
				},
				setSize = function() {
					w.A = $bg.width();
					h.A = $bg.height();
					w.I = $element.width();
					h.I = $element.height();
					h.dif = h.A * setting.vel;
					h.Ap = h.A + h.dif;
					m.Ap = w.A / h.Ap;
					m.I = w.I / h.I;


					//
					if (m.Ap > m.I) {
						w.I = w.A;
						h.I = w.A / m.I;
						dy = 0.5 * (h.Ap - h.I);
						x = 0;
					} else {
						h.I = h.Ap;
						w.I = h.Ap * m.I;
						dy = 0;
						x = 0.5 * (w.A - w.I);
					}
					$element
						.width(Math.round(w.I))
						.height(Math.round(h.I))
						.css({
							'left': Math.round(x) + 'px'
						});
					setPosition();
				};
			//
			if ($this.css('position') === 'static') {
				$this.css('position', 'relative');
			}
			onLoadElement(function() {
				setTimeout(function() {					
					setSize();
					$element.animate({
						'opacity': setting.opacity
					},500);
				}, 50);
			});
			//
			$window.resize(setSize).scroll(setPosition);
		});
	};
})(jQuery);