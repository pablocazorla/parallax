/* Carousel Plugin
 * @author: Pablo Cazorla
 * @e-mail: pablo.david.cazorla@gmail.com
 * @date: 21/04/2016
 */
(function($) {
	$.fn.carousel = function(options) {

		var setting = $.extend({
			autoplayTime: 5000
		}, options);

		return this.each(function() {
			var $this = $(this),
				$img = $this.find('img'),
				length = $img.length,
				current = 0,
				change = function() {
					$img.eq(current).removeClass('current');
					current++;
					if (current >= length) {
						current = 0;
					}
					$img.eq(current).addClass('current');
				};
			$img.eq(current).addClass('current');

			setInterval(change,setting.autoplayTime);


		});
	}
})(jQuery);