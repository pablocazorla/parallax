$('document').ready(function(){
	hljs.configure({
	  'tabReplace': '  '
	});
	$('pre').each(function(i, block) {
		hljs.highlightBlock(block);
	});

	$('.parall').parallax();


	$('.carousel').carousel();





});