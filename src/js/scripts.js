/**
 * Header Function..
 */
$(document).ready(function () {
	applyHeaderResize();
	applySmoothScroll();
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
			}, 400);
		}
		return false;
	});
}
