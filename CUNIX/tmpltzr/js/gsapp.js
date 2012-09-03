/**
 * Namespacing
 */
var gsapp = {};
var gsappMobile = {};


gsappMobile.menuScroll;
gsappMobile.contentScroll;

gsappMobile.initContentIScroll = function(time){
	setTimeout(function(){
		gsappMobile.contentScroll = new iScroll('wrapper');
		gsappMobile.iscrollInit = true;
		
	},time);
}


gsappMobile.initMenuIScroll = function(time){
	setTimeout(function(){
		gsappMobile.menuScroll = new iScroll('navigation', {
			fixedScrollbar: true
		});
	},time);
}

gsapp.LOG = false;
var TMPLTZR = true;
var safelog = function(msg){
	if(gsapp.LOG === true && msg != undefined){
		console.log(msg);
	}
}

var HOME_URL = 'http://templatizer.gsapp.org';

var MENU_TOGGLE = 'shown';

var setMenuToggle = function(state){
	MENU_TOGGLE = state;
}

var getMenuToggle = function(){
	return MENU_TOGGLE;
}

$.fn._is_redirect_child = function(){
	var returnVal = false;
	var $parent = $(this).parent('li').parent('.menu').parent('li');
	if($parent.length > 0){
		var parentHREF = $parent.children('a:eq(0)').attr('href');
		$parent.children('.menu').children('li').each(function(){
			if( parentHREF == $(this).children('a:eq(0)').attr('href') ){
				returnVal = true;
			}
		});	
	}
	return returnVal;
}

var CURRENT_LEVEL = 0;
var CURRENT_STATE_INDEX = 0;
var CURRENT_STATES = Array();
CURRENT_STATES[0] = 'home';
CURRENT_STATES[1] = 'menu';
CURRENT_STATES[3] = 'redirected';

var CURRENT_STATE = CURRENT_STATES[CURRENT_STATE_INDEX];


var initCurrentState = function(state_index){
	if(state_index != undefined){
		CURRENT_STATE = CURRENT_STATES[state_index];
	}else{
		CURRENT_STATE = CURRENT_STATES[CURRENT_STATE_INDEX];
	}
}

var setCurrentState = function(state_index){
	try{
		CURRENT_STATE = CURRENT_STATES[state_index];
	}catch(e){
		safelog('error: ' + e.message);
	}
}

var getCurrentState = function(){
	return CURRENT_STATE;
}

var getCurrentStateIndex = function(){
	return CURRENT_STATE_INDEX;
}

var initCurrentLevel = function(){
	CURRENT_LEVEL = 0;
}

var setCurrentLevel = function(newLevel){
	CURRENT_LEVEL = newLevel;
}

var getCurrentLevel = function(){
	return CURRENT_LEVEL;
}

var getElementLevel = function($element){
	var classes = $element.attr('class');
	if( classes.indexOf('level-').length > 0 ){
		var levelIdx = classes.indexOf('level-') + 6;
		var level = classes.substring(levelIdx, levelIdx+1);
		return level;
	}else{
		return -1;
	}
}

initCurrentLevel();

/* 	function: level()
 *	Returns the menu level of the item
*/
$.fn.level = function(){
	var classes = $(this).closest('.menu').attr('class');
	var levelIdx = classes.indexOf('level-') + 6;
	return classes.substring(levelIdx, levelIdx+1);
}
		

var getOffset = function( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.parentNode;
    }
    return { top: _y, left: _x };
}

gsapp.buildWall = function(){
	var $container = $('#tmpltzr #main .view .view-content');
	$container.imagesLoaded( function(){
		$container.masonry({
			itemSelector: '.views-row',
			columnWidth: 240,
			isAnimated: false,
			gutterWidth: 20,
			isFitWidth: true,
		});
	});
}


function externalLinkAppendImg(m){
	$('li',m).each(function(){
		var anchor = $('a', this);
		var href = anchor.attr('href');
		href = href.substring(0,4);
		if(href == 'http'){
			offsite = '<img class="hover-only" src="http://www.columbia.edu/cu/arch/tmpltzr-postfog/assets/offsite.png" />';
			anchor.append(offsite);
			anchor.attr("target", "_blank"); //make sure it opens in a new tab/window
		}
	});
}


/*************************** RESIZE ***************************/
/*
	Resizes the height of the menu based on the actual page size
*/
var resizeMenu = function(){
	var wh = window.innerHeight;
	var hh = $("#header").height();
	$("#navigation").css('height', wh-hh);
}


gsapp.resizeFunc = function(){
	if(gsapp.iscroll == false){
		resizeMenu(); //resize the height of the menu
		$('header').css('color','blue');
	}else{
		$('#header').css('color','green');
	}
	var ww = window.innerWidth;
	if(ww >= 1270){
		$('#wrapper').css('width', '800px');

		var id ='';
		$('#tmpltzr #main .view .views-row').each(function(i){
			if($('.tmpltzr-secondary-float', this).length != 0){
				id = $('.tmpltzr-secondary-float', this).attr('id');
				$(this).addClass(id).addClass('empty');
				$('#tmpltzr #right-sidebar').append($('.tmpltzr-secondary-float', this));
				
			}
		});					
	}else{
		$('#wrapper').css('width', '520px');
		
		var insertClass = '';
		$('#tmpltzr #right-sidebar .tmpltzr-secondary-float').each(function(){
			insertClass = '#tmpltzr #main .view .views-row.' + $(this).attr('id');
			
			$(insertClass).append($(this)).removeClass('empty');
		});			
	}
	if(window.location.href == HOME_URL){
	//	gsappFetcher.ccWidgetCarousel();
	//	gsappFetcher.eventsWidgetCarousel();
	}
	//setTimeout(iscrollFunc, 100);
	gsapp.buildWall();
	//evenColumnsCourseBlogsIndex(resized); //even out columns in course blog index TODO tct2003 reinstate this
	//resized = true; //set to true after the resize function has run once
}

var force_expanded = Array();
force_expanded.push('/studio-x-global/locations');
force_expanded.push('/studio-x-global/locations/studio-x-beijing');
force_expanded.push('/studio-x-global/locations/studio-x-rio-de-janiero');



var adjustPrimaryLinksMenu = function(path){
	$('#navigation .menu li').addClass('collapsed menu-item').removeClass('expanded');
	$('#navigation .menu:eq(0)').children('li').addClass('branch');
	var selector = '',
		$selected;
	for(i in force_expanded){
		selector = '#navigation a:[href="' + force_expanded[i] + '"]';		
		$(selector).parent('li').removeClass('collapsed').addClass('force-expanded');
		$(selector).parent('li').children('.menu').children('li').removeClass('collapsed').addClass('force-expanded');
	} 
	
	/* if not the homepage, where path = '/' */
	safelog('path: ' + path);
	if( (path.length > 1) && (path.substring(1,7) != 'search') ){
		safelog('Not the homepage. Path is:  ' + path.substring(1));
		selector = '#navigation a:[href="' + path + '"]';
		'#navigation a:[href="/studio-x-global"]'
		var selLen = $(selector).length;
		if( selLen < 0 ){//the page doesn't exist on the site
			window.location.href = HOME_URL;//redirect to homepage
		}else{//page exists
			if( selLen == 1 ){
				safelog('single selector');
				$selected = $(selector);
				if( $selected._is_redirect_child() ){
					safelog('is a redirect child');
					$selected.closest('.menu').parent('li').addClass('redirect-active');
					setCurrentState(3);
				}else{
					safelog('is NOT a redirect child');
					setCurrentState(1);
				}
			}else if(selLen > 1){//redirect, internal or not
				
				if( $('#navigation a:[href="' + path + '"]:eq(0)').parent('li').children('.menu').find('li a:[href="' + path + '"]:eq(0)').length > 0 ){//redirect
					$selected = $('#navigation a:[href="' + path + '"]:eq(0)').parent('li').children('.menu').find('li a:[href="' + path + '"]:eq(0)');
					$('#navigation a:[href="' + path + '"]:eq(0)').parent('li').addClass('redirect-active');
					$('#navigation a:[href="' + path + '"]:eq(0)').removeClass('active');
					
					safelog('redirected at birth');
					setCurrentState(3);
				}else{//internal redirect
					$(selector).each(function(){
						if($(this).closest('.menu').parent('li').length > 0){
							var stub = $(this).closest('.menu').parent('li').children('a:eq(0)').attr('href');
						}else{//level-0
							var stub = path;
						}
						stub = stub.substring(1, 6);
						safelog('stub: ' + stub);
						safelog('path stub: ' + path.substring(1, 6));
						if( stub == path.substring(1, 6) ){
							$selected = $(this);
						}else{
							$(this).removeClass('active');
						}
						
					});	
					setCurrentState(1);
				}
			}
			safelog('addddddd');
			$selected.parents('li').removeClass('collapsed').addClass('expanded active-trail');
			//$selected.parents('li.forced-expanded').addClass('active-trail');
			$('.active-trail').each(function(){
				$('a:eq(0)', this).css('color', 'white');
			});
			$selected.addClass('active').css('color', 'white');
			$selected.parents('.menu').show();
			$selected.parent('li').children('.menu').show();
			
		}
	}
}



/*
	Adds a span to be filled with triangles for hover and menu expand effects.
*/
var MAX_MENU_LEVELS = 6;
function menuAddTriangles(){
	if(gsapp.mobile){
		var liW = 590;
	}else{
		var liW = 340;
	}
	var aW = liW - 25;
	var liWStr = liW + 'px';
	var aWStr = aW + 'px';
	var selector = '#navigation #menu > .menu > li';
	
	$('#navigation #menu > .menu').addClass('level-0');
	$(selector).css('width', liWStr).prepend('<span class="menu-arrow-large"></span>');
	$(selector).each(function(){
		$(this).children('a').css('width',aWStr);
	});
	
	
	for(var i = 1; i < MAX_MENU_LEVELS; i++){
		selector += ' > ul.menu';
		$(selector).addClass('level-'+i);
		selector += ' > li';
		liW = aW;
		liWStr = liW + 'px';
		aW = liW - 19;
		aWStr = aW + 'px';
		
		$(selector).each(function(){
			if( !($(this).hasClass('force-expanded')) ){//don't add the arrow for force-expanded
				$(this).css('width', liWStr).prepend('<span class="menu-arrow-small"></span>');
			}
			$(this).children('a').css('width',aWStr);
		});
		
	}
	
}


var setMasonryBrickWidths = function(){	
	$('#tmpltzr #main .view .view-content .views-row').each(function(){
		if($(this).children('.node').hasClass('tmpltzr-module-500')){
			$(this).css('width', '500px');
		}else{
			$(this).css('width', '240px');
		}
	});
 }  
 
gsapp._remove_flash_content = function(){
	if(gsapp.iscroll){
		if($('object').length > 0){
			$('object').each(function(){
				if($(this).attr('type') == "application/x-shockwave-flash"){
					$(this).css('display', 'none').remove();
				}
			});	
		}
		if($('object embed').length > 0){
			$('object embed').each(function(){
				if($(this).attr('type') == "application/x-shockwave-flash"){
					$(this).parent('object').remove();
				}
			});	
		}
	}
}

var initPhotoset = function(){
	if($('.tmpltzr-photoset').exists()){
		$('.tmpltzr-photoset').each(function(){
			var id = $(this).attr('id');
			id = '#' + id;
			
			$(id).jcarousel({
    			scroll: 1,
    			visible: 1,
    			start: 1,
    			width: 500,
    			buttonPrevHTML: '<div></div>',
    			buttonNextHTML: '<div></div>'
    		});
		});
    }
}

/*
	Hover effect for menu - shows offsite.png if offsite link on hover
*/
var menuHoverOn = function(){
	$(".hover-only", this).toggle(); //hover effect for offsite.png to appear on external links
	$(this).parent('li.collapsed').children(".menu-arrow-large").css('backgroundPosition', '-15px 0');
	$(this).parent('li.collapsed:not(.active-trail.leaf)').children(".menu-arrow-small").css('backgroundPosition', '-9px 0');
}

var menuHoverOff = function(){
	$(".hover-only", this).toggle(); //hover effect for offsite.png to appear on external links
	$(this).parent('li.collapsed').find(".menu-arrow-large").css('background-position', '-15px -50px');
	$(this).parent('li.collapsed').find(".menu-arrow-small").css('background-position', '-9px -50px');
}

/*************************** COURSE BLOGS INDEX ***************************/
/*
	Evenly arranges columns of links to course blogs based on screen width
*/
var evenColumnsCourseBlogsIndex = function(wrapped){
	$('.view-courseblogs').each( function(i){ 
		if(wrapped){ $('.view-content .views-row', this).unwrap(); }
		var count = $('.view-content .views-row', this).length;
		switch($('.wrapper #content').css('width')){
			case "520px":
				$("#fixed-header").css('width', '500px');
				var colCount = Math.max(1,Math.floor(count/2));
				$('.view-content .views-row', this).slice(0, colCount).wrapAll('<div class="col" />');
				$('.view-content .views-row', this).slice(colCount, count).wrapAll('<div class="col" />');
				break;
			case "800px":
				$("#fixed-header").css('width', '750px');
				var colCount = Math.max(1,Math.floor(count/3));
				$('.view-content .views-row', this).slice(0, colCount).wrapAll('<div class="col" />');
				$('.view-content .views-row', this).slice(colCount, (2*colCount)).wrapAll('<div class="col" />');
				$('.view-content .views-row', this).slice((2*colCount), count).wrapAll('<div class="col" />');
				break;
			default:
				break;
		}
	});
}

var unbindRegionCourseBlogIndexFilter = function(){	
	link = $(this);
	link.removeClass('selected');
	var region = link.attr('id');
	region = '.'+region;
	$(region).addClass('unselected');
	link.unbind('click').bind('click', bindRegionCourseBlogIndexFilter($(this)) );
	return false;
};

var bindRegionCourseBlogIndexFilter = function(){
	$('.term-list a.term-index-term').removeClass('selected');	
	$('.view-courseblogs a.term-index-term').addClass('unselected').removeClass("program");
	var region = $(this).attr('id');
	region = '.'+region;
	$(region).removeClass('unselected');
	$(this).addClass('selected');
	$(this).unbind('click').bind('click', unbindRegionCourseBlogIndexFilter);
	return false;
};

var unbindProgramCourseBlogIndexFilter = function(){
	link = $(this);
	link.removeClass('selected');
	var program = link.attr('id');
	program = '.'+program;
	$(program).removeClass('program');
	link.unbind('click').bind('click', bindProgramCourseBlogIndexFilter );
	return false;
}

var bindProgramCourseBlogIndexFilter = function(){
	$('.term-list a.term-index-term').removeClass('selected');
	$('.view-courseblogs a.term-index-term').addClass('unselected').removeClass("program");
	
	var program = $(this).attr('id');
	program = '.'+program;
	$(program).addClass('program');
	$(this).addClass('selected');
	$(this).unbind('click').bind('click', unbindProgramCourseBlogIndexFilter);
	return false;
}


$(document).ready(function () {
	if($('body').hasClass('iscroll') || $('body').hasClass('mobile') ){
		gsapp.iscroll = true;
		if($('body').hasClass('mobile')){
			gsapp.mobile = true;
			gsappMobile.initMenuIScroll(0);
			window.scrollTo(0,0);
		}else{
			gsapp.mobile = false;
		}
	}else{
		gsapp.iscroll = false;
		gsapp.mobile = false;
	}
	
	var mww = window.innerWidth;
	$('#header #gsapp-login a').text('w: '+mww);
	
	safelog('---------------------------DOCUMENT READY FUNCTION STARTING with iscroll='+gsapp.iscroll+'---------------------------');
	adjustPrimaryLinksMenu( window.location.pathname );
	menuAddTriangles();

	/*************************** UTILITIES ***************************/
	jQuery.fn.exists = function(){return this.length>0;}
	
	$('#gsapp-news').bind('click',function(){
		setTimeout(function(){
			gsappMobile.contentScroll.refresh();
		}, 0);
		return false;
	});


	setMasonryBrickWidths();
    
    /*************************** NON-MOBILE FRIENDLY EMBEDDED CONTENT ***************************/
	/* if viewing the stock site on a mobile device, like an iPad or other tablet,
	   this function will remove any non-mobile friendly embeds, like the flickr
	   image set flash-based <object>
	*/
	if($('body').hasClass('mobile') || $('body').hasClass('iscroll') ){
		gsapp._remove_flash_content();
	}
	
	initPhotoset();
	  
    /*************************** MENU ***************************/
	var menu = $("#navigation #menu ul.menu");
	externalLinkAppendImg(menu);
	
	if(gsapp.iscroll == false){//no hover effects for mobile
		$(".menu a").bind('mouseenter', menuHoverOn).bind('mouseleave', menuHoverOff);
	}

	$('#semester-list .term-list a.term-index-term').each(function(){
		$(this).bind('click',function(){
			var href1 = $(this).attr('href');
			href1 = "#" + href1;
			$(window).scrollTo( href1, 200 );
			return false;
		});
	});
	
	$('#region-list .term-list a.term-index-term').each(function(){
		$(this).bind('click', bindRegionCourseBlogIndexFilter);
	});
	
	$('#program-list .term-list a.term-index-term').each(function(){
		$(this).bind('click', bindProgramCourseBlogIndexFilter);
	});

	//scrollCourseBlogsIndex();
	
	$(document).scroll(function() {
		if($(document).scrollTop() >= 270){
			$("#fixed-header").addClass('fix-header');
			$("#course-blogs-index-listing").css('margin-top','395px');
		}else{
			$("#fixed-header").removeClass('fix-header');
			$("#course-blogs-index-listing").css('margin-top','0');
		}
	});

	/*************************** STARTUP FUNCTIONS ***************************/
	
	if(gsapp.mobile == false){
		gsapp.resizeFunc(); //run the resize function on page load
		$(window).resize(gsapp.resizeFunc); //bind the resize function to the page
	}
});


$(window).load(function(){
	
	if(gsapp.iscroll && (gsapp.mobile == false) ){
		setTimeout(gsapp.buildWall,100);
		setTimeout(gsapp.buildWall,500);
		$('#header').css('backgroundColor', 'red');
		gsappMobile.initMenuIScroll(200);
		gsappMobile.initContentIScroll(200);
	}
});