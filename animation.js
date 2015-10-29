$(document).ready(function() {
	console.log("dis page be comin' to life");

	// TweenMax.set([$('.portfolio .col-md-12'), $('.about .col-md-12'), $('.contact .col-md-12')], {display:"none", left:1000});
	TweenMax.set([$('.portfolio'), $('.about'), $('.contact')], {scaleX:0, transformOrigin:"left", display:"none"});
	TweenMax.set($('.work_item'), {left:"-100%"});
	// TweenMax.set($('.work_item'), {scaleY:0, transformOrigin:"top", display:"none"});
	// TweenMax.set($('.row .item_content'), {display:"none"})

	$('#home_menu').click(function() {
		home_show();
	});

	$('#work_menu').click(function() {
		portfolio_show();
	});

	$('#ux').click(function() {
		ux_work_toggle();
	});

		$('#ux_mobile').click(function() {
			// ux_work_toggle_tl.kill();
			console.log("mobile template click");
			TweenMax.to($('#ux_mobile'), .5, {width:"100%"});
			// TweenMax.to($('#ux .work_item'), .5, {top:500}, "-=.5")
		});

	// $('#prototype').click(function() {
	// 	prototype_work_toggle();
	// });

	// $('#digital').click(function() {
	// 	digital_work_toggle();
	// });

	// $('#print').click(function() {
	// 	print_work_toggle();
	// });

});

// NAV ANIMATION

var home_show = function() {

	var home_show_tl = new TimelineMax()
		// .to($('.portfolio .col-md-12'), .5, {left:1000})
		.to($('.portfolio'), .1, {scaleX:0, transformOrigin:"left", display:"none"})
		// .to($('.homepage .col-md-12'), .5, {left:0}, "-=.5")
		.to($('.homepage'), .1, {display:"block", scaleX:1, transformOrigin:"left"})
}

var portfolio_show = function() {

	var portfolio_show_tl = new TimelineMax()
		// .to($('.homepage .col-md-12'), .5, {left:-1000, display:"none"})
		.to($('.homepage'), .1, {scaleX:0, transformOrigin:"left", display:"none"})
		// .to($('.portfolio .col-md-12'), .5, {display:"block", left:0}, "-=.5")
		.to($('.portfolio'), .1, {display:"block", scaleX:1, transformOrigin:"left"})
}

// WORK PAGE ANIMATION

var ux_work_toggle_tl = new TimelineMax({paused:true})
	.staggerTo($('.work_item'), .5, {left:"0%"}, .2);
	// .staggerTo($('.work_item'), .2, {display:"block", scaleY:1, transformOrigin:"top"}, .1);

var ux_div = document.getElementById("ux");
var ux_item = $('.work_item')[0];
var ux_work_toggle = function() {
	if (ux_item.style.left == "-100%") {
		ux_work_toggle_tl.play();
	} else if (ux_item.style.left == "0%") {
		ux_work_toggle_tl.reverse();
	}
}

// var prototype_work_toggle_tl = new TimelineMax({paused:true})
// 	.to($('#prototype .col-md-12'), .1, {display:"block", scaleY:1, transformOrigin:"top"});

// var prototype_div = document.getElementById('prototype');
// var prototype_work_toggle = function() {
// 	if (prototype_div.childNodes[1].style.display == "none") {
// 		prototype_work_toggle_tl.play();
// 	} else if (prototype_div.childNodes[1].style.display == "block") {
// 		prototype_work_toggle_tl.reverse();
// 	}
// }

// var digital_work_toggle_tl = new TimelineMax({paused:true})
// 	.to($('#digital .col-md-12'), .1, {display:"block", scaleY:1, transformOrigin:"top"});

// var digital_div = document.getElementById('digital');
// var digital_work_toggle = function() {
// 	if (digital_div.childNodes[1].style.display == "none") {
// 		digital_work_toggle_tl.play();
// 	} else if (digital_div.childNodes[1].style.display == "block") {
// 		digital_work_toggle_tl.reverse();
// 	}
// }

// var print_work_toggle_tl = new TimelineMax({paused:true})
// 	.to($('#print .col-md-12'), .1, {display:"block", scaleY:1, transformOrigin:"top"});

// var print_div = document.getElementById('print');
// var print_work_toggle = function() {
// 	if (print_div.childNodes[1].style.display == "none") {
// 		print_work_toggle_tl.play();
// 	} else if (print_div.childNodes[1].style.display == "block") {
// 		print_work_toggle_tl.reverse();
// 	}
// }