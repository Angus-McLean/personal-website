/**
 * Header Function..
 */
$(document).ready(function () {
	applyHeaderResize();
	applySmoothScroll();
	applySlideToggles();
});

function applyHeaderResize() {
	var adjustHeader = ()=>{$('.header').css({ height: ($(window).height()) +'px' });};
	adjustHeader();

	$(window).on('resize', function() {
		adjustHeader();
	});
}

function applySmoothScroll() {
	$('a[href*="#"]').on('click', function(e)
	{
		e.preventDefault();

		if( $( $.attr(this, 'href') ).length > 0 )
		{
			$('html, body').animate(
			{
				scrollTop: $( $.attr(this, 'href') ).offset().top
			}, 700);
		}
		return false;
	});
}

function applySlideToggles() {
	$(".slide-toggle").click(function() {
		var curShowing = $(`.slider:visible`)
		if (curShowing.attr('name') != this.getAttribute('name')) {
			curShowing.slideToggle("slow");
		}
		$(`.slider[name=${this.getAttribute('name')}]`).slideToggle("slow");
	});
}
