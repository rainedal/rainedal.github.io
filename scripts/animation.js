$(document).ready(function() {
	console.log('(◕ ‿ ◕  ✿) Why hello there! Fancy meeting you here. This site is currently a labor of love in progress, but I think this might be helpful:', 'https://github.com/rainedal/rainedal.github.io');

	TweenMax.set('.work_guts', {display:"none", height:0});
	TweenMax.set('.work_list', {display:"none", autoAlpha:0});
	TweenMax.set('.work_content', {display:"none", height:0});
	TweenMax.set('.content', {display:"none", height:0, autoAlpha:0});

	$('#ux_header').click(function() {
		work_list_toggle("ux_header");
	});

		$('#mobile_thumb').click(function() {
			work_content_toggle("mobile_thumb");
		});	

		$('#prev_thumb').click(function() {
			work_content_toggle("prev_thumb");
		});		

		$('#cap_thumb').click(function() {
			work_content_toggle("cap_thumb");
		});		

		$('#vidgeo_thumb').click(function() {
			work_content_toggle("vidgeo_thumb");
		});		

		$('#trad_thumb').click(function() {
			work_content_toggle("trad_thumb");
		});								

	$('#proto_header').click(function() {
		work_list_toggle("proto_header");
	});

		$('#owm_thumb').click(function() {
			work_content_toggle("owm_thumb");
		});		

		$('#insta_thumb').click(function() {
			work_content_toggle("insta_thumb");
		});		

		$('#sprites_thumb').click(function() {
			work_content_toggle("sprites_thumb");
		});		

	$('#digi_header').click(function() {
		work_list_toggle("digi_header");
	});

		$('#pepsi_thumb').click(function() {
			work_content_toggle("pepsi_thumb");
		});		

		$('#fl_thumb').click(function() {
			work_content_toggle("fl_thumb");
		});		

		$('#pt_thumb').click(function() {
			work_content_toggle("pt_thumb");
		});					

		$('#carhartt_thumb').click(function() {
			work_content_toggle("carhartt_thumb");
		});	

	$('#print_header').click(function() {
		work_list_toggle("print_header");
	});

		$('#ub_thumb').click(function() {
			work_content_toggle("ub_thumb");
		});		

});

// WORK LIST ANIMATION

var header_list, 
	header_class,
	save_work_id = null, 
	save_work_id_list = null;
	save_work_class = null;

var work_list_toggle = function(header_id) {

	if (header_id == "ux_header") {
		header_list = ".ux.work_thumb_list";
		header_class =".ux";
	} else if (header_id == "proto_header") {
		header_list = ".proto.work_thumb_list";
		header_class =".proto";
	} else if (header_id == "digi_header") {
		header_list = ".digital.work_thumb_list";
		header_class =".digital";
	} else if (header_id == "print_header") {
		header_list = ".print.work_thumb_list";
		header_class =".print";
	}

	if ($(header_class + '.work_guts')[0].style.display == "none") {
		TweenMax.to($(header_class + '.work_guts'), 1, {display:"block", height:"auto"});
	} else if (save_id == header_id) {
		TweenMax.set($('.work_guts'), {display:"none", height:0});
	}

	$('.work_list').each(function() {
		if ($(this)[0].parentElement.parentElement.previousElementSibling.id == header_id) {
			if (save_work_id == header_id && $(this)[0].style.display == "block") {
				TweenMax.set($(this), {display:"none", autoAlpha:0});
				TweenMax.set($(header_class + ' .work_guts'), {display:"none", height:0});
				TweenMax.set($(header_class + ' .work_content'), {display:"none", height:0});
			} else {
				TweenMax.staggerTo($(header_list + ' .work_list'), .5, {display:"block", autoAlpha:1}, .2);	
			}
		} else {
			TweenMax.set($(this), {display:"none", autoAlpha:0});
			TweenMax.set($(save_work_class + ' .work_guts'), {display:"none", height:0});
			TweenMax.set($(save_work_class + ' .work_content'), {display:"none", height:0});			
		}
	});

	save_work_id = header_id;
	save_work_id_list = header_list;
	save_work_class = header_class;

}

// WORK CONTENT ANIMATION

var content_list,
	content_class,
	save_id = null;

var work_content_toggle = function(content_id) {

	if (content_id == "mobile_thumb") {
		content_list = "mobile_content";
		content_class = ".ux";
	} else if (content_id == "prev_thumb") {
		content_list = "prev_content";
		content_class = ".ux";
	} else if (content_id == "cap_thumb") {
		content_list = "cap_content";
		content_class = ".ux";
	} else if (content_id == "vidgeo_thumb") {
		content_list = "vidgeo_content";
		content_class = ".ux";
	} else if (content_id == "trad_thumb") {
		content_list = "trad_content";
		content_class = ".ux";
	} else if (content_id == "owm_thumb") {
		content_list = "owm_content";
		content_class = ".proto";
	} else if (content_id == "insta_thumb") {
		content_list = "insta_content";
		content_class = ".proto";
	} else if (content_id == "sprites_thumb") {
		content_list = "sprites_content";
		content_class = ".proto";
	} else if (content_id == "pepsi_thumb") {
		content_list = "pepsi_content";
		content_class = ".digital";
	} else if (content_id == "fl_thumb") {
		content_list = "fl_content";
		content_class = ".digital";
	} else if (content_id == "pt_thumb") {
		content_list = "pt_content";
		content_class = ".digital";
	} else if (content_id == "carhartt_thumb") {
		content_list = "carhartt_content";
		content_class = ".digital";
	} else if (content_id == "ub_thumb") {
		content_list = "ub_content";
		content_class = ".print";
	}

	if ($(content_class + '.work_content')[0].style.display == "none") {
		TweenMax.to($(content_class + '.work_content'), 1, {display:"block", height:"auto"});
	} else if (save_id == content_id) {
		TweenMax.set($('.work_content'), {display:"none", height:0});
	}

	$('.content').each(function() {
		if ($(this)[0].parentNode.id == content_list) {
            TweenMax.to($('.work_content ' + "#" + content_list + ' .content'), .5, {display:"block", height:"auto", autoAlpha:1})

            // console.log($('.work_content ' + "#" + content_list + ' .content.results.content_content')[0])
            // TweenMax.set($('.work_content ' + "#" + content_list + ' .content.results.content_content')[0], {height:250, display:"block", autoAlpha:1});
		} else {
			TweenMax.set($(this), {display:"none", height:0, autoAlpha:0})
		}
	});

	save_id = content_id;
}

//
// PHOTOSWIPE GALLERY INITIALIZE
//

var initPhotoSwipeFromDOM = function(gallerySelector) {

    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        for(var i = 0; i < numNodes; i++) {

            figureEl = thumbElements[i];

            if(figureEl.nodeType !== 1) {
                continue;
            }

            linkEl = figureEl.children[0];

            size = linkEl.getAttribute('data-size').split('x');

            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };

            if(figureEl.children.length > 1) {
                item.title = figureEl.children[1].innerHTML; 
            }

            if(linkEl.children.length > 0) {
                item.msrc = linkEl.children[0].getAttribute('src');
            } 

            item.el = figureEl;
            items.push(item);
        }

        return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });

        if(!clickedListItem) {
            return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data-attribute
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) { 
                continue; 
            }

            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }

        if(index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};

        if(hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');  
            if(pair.length < 2) {
                continue;
            }           
            params[pair[0]] = pair[1];
        }

        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        options = {
        	focus: false,
        	history: false,

            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

			showHideOpacity:true, getThumbBoundsFn:false,
			hideAnimationDuration:0, showAnimationDuration:0

			// thumbnail transition animation -- for thumb + main image with matching aspect ratio
            // getThumbBoundsFn: function(index) {
            //     // See Options -> getThumbBoundsFn section of documentation for more info
            //     var thumbnail = items[index].el.getElementsByTagName('img')[0],
            //         pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
            //         rect = thumbnail.getBoundingClientRect(); 

            //     return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            // }

        };

        // PhotoSwipe opened from URL
        if(fromURL) {
            if(options.galleryPIDs) {
                // parse real index when custom PIDs are used 
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                // in URL indexes start from 1
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if( isNaN(options.index) ) {
            return;
        }

        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll( gallerySelector );

    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
};

// execute above function
initPhotoSwipeFromDOM('.my-gallery');

//
// PHOTOSWIPE END
//

//
// PAGE TRANSITION FUNCTIONS
//

var btns        = document.querySelectorAll('.nav-btn');
var duration    = .8;
var isAnimating = false;

addEventListenerList(btns, 'click', function (e) {
  if(!isAnimating) {
    switchPages(e.currentTarget.dataset.out, e.currentTarget.dataset.in);
  }
});

function switchPages(outFn, inFn) {
  isAnimating = true;
  TweenMax.set($('.work_guts'), {display:"none", height:0});
  window[outFn](document.querySelector('.is-current'));
  window[inFn](document.querySelector('.main-page:not(.is-current)'));
}

function scaleUp(el) {
  addClass(el, 'is-current');
  TweenLite.fromTo(el, duration, {
    opacity: 0, scale: .8
  }, {
    opacity: 1, scale: 1,
    clearProps: 'opacity, scale'
  });
}

function scaleDown(el) {
  addClass(el, 'is-current');
  TweenLite.fromTo(el, duration, {
    opacity: 1, scale: 1
  }, {
    opacity: 0, scale: .8,
    clearProps: 'opacity, scale',
    onComplete: function () {
      removeClass(el, ['is-onTop', 'is-current']);
    }
  });
}

function moveToRight(el) {
  addClass(el, ['is-onTop', 'is-current']);
  TweenLite.fromTo(el, duration, {
    xPercent: 0
  }, {
    xPercent: -100,
    clearProps: 'xPercent',
    onComplete: function () {
      removeClass(el, ['is-onTop', 'is-current']);
      isAnimating = false;
    }
  });
}

function moveFromRight(el) {
  addClass(el, ['is-onTop', 'is-current']);
  TweenLite.fromTo(el, duration, {
    xPercent: 100
  }, {
    xPercent: 0,
    clearProps: 'xPercent',
    onComplete: function () {
      removeClass(el, 'is-onTop');
      isAnimating = false;
    }
  });
}

// utils
function addClass(el, className) {
  [].concat(className).forEach(function (n) {
    el.classList.add(n);
  });
}

function removeClass(el, className) {
  [].concat(className).forEach(function (n) {
    el.classList.remove(n);
  });
}

function addEventListenerList(list, event, fn) {
  for (var i = 0, len = list.length; i < len; i++) {
    list[i].addEventListener(event, fn, false);
  }
}