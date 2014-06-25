/**
 * Namespacing
 */
var gsapp = {};
var gsappMobile = {};

gsappMobile.sliderWidth = 70;
gsappMobile.headerHeight = 132;
gsappMobile.switchTIME = 400;//ms time for switch animation

gsappMobile.menuScroll;
gsappMobile.contentScroll;

gsapp.mobile = false;

gsappMobile.initContentIScroll = function(time){
	setTimeout(function(){
		gsappMobile.contentScroll = new iScroll('wrapper');
		gsappMobile.iscrollInit = true;
		
	},time);
}


gsappMobile.initMenuIScroll = function(time){
	setTimeout(function(){
		gsappMobile.menuScroll = new iScroll('navigation', {
			fixedScrollbar: true,
			vScrollbar: false,
			hScrollbar: false,
			hScroll: false
		});
	},time);
}

gsapp.LOG = false;
var TMPLTZR = false;
var safelog = function(msg){
	if(gsapp.LOG === true && msg != undefined){
		console.log(msg);
	}
}

// for permanently under construction
gsapp.addHeaderNotice = function(imgSRC, link){
	var text = '<img src='+imgSRC+' style="margin-top:15px;">';
	if(link){
		text = '<a href="'+link+'" target="_blank" style="border:none !important;">'+text+'</a>';
	}
	$('#global-header').append(text);
}

/*for giving day
gsapp.addHeaderNotice = function(imgSRC, link){
	var text = '<img src='+imgSRC+' style="margin:5px 5px 0 0; float:left;">';
	if(link){
		text = '<a href="'+link+'" target="_blank" style="border:none !important;">'+text+'</a>';
	}
	$('#global-header').append(text);
}*/

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
	if(classes != undefined){
		var levelIdx = classes.indexOf('level-') + 6;
		return classes.substring(levelIdx, levelIdx+1);
	}else{
		return -1;
	}
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
	//don't need to build a wall if only one element
	// such as in a course listing view
	if(gsapp.mobile == false){
		if( ($('#tmpltzr #main .view .view-content').children('.views-row').length > 1) && (gsapp.mobile == false) ){
			var $container = $('#tmpltzr #main .view .view-content');
			$container.imagesLoaded( function(){
				$container.masonry({
					itemSelector: '.views-row',
					columnWidth: 240,
					isAnimated: false,
					gutterWidth: 20,
					isFitWidth: true
				});
			});
		}
	}
}


function externalLinkAppendImg(m){
	$('li',m).each(function(){
		var anchor = $('a', this);
		var href = anchor.attr('href');
		href = href.substring(0,4);
		if(href == 'http'){
			var w = anchor.width();
			w = w+20;
			anchor.width(w);
			w = $(this).width();
			w = w+20;
			$(this).width(w);
			offsite = '<img class="hover-only" src="http://www.columbia.edu/cu/arch/tmpltzr-postfog/assets/offsite.png" />';
			anchor.append(offsite);
			anchor.attr("target", "_blank"); //make sure it opens in a new tab/window
		}
	});
}

$(document).ready(function(){
var sampleh = $("div.views-field-field-image-fid span.field-content img").height();
$("div.views-field-field-image-fid").css("height",sampleh);
$("div.views-field-value-6").css("height",sampleh);

var facultyname = $("div.views-field-value-4 span.field-content h2").text();
$("div.views-field-value-4 span.field-content h2").replaceWith("<h1 style=\"margin-top:50px;\">"+facultyname+"</h1>");
console.log(facultyname);
});

/*************************** RESIZE ***************************/
/*
	Resizes the height of the menu based on the actual page size
*/
var resizeMenu = function(){		
	if(gsapp.iscroll == false){//do nothing for iPad/tablet
		var wh = window.innerHeight;
		var hh = $("#header").height();
		$("#navigation").css('height', wh-hh);
		//fleXenv.fleXcrollMain("navigation");
		gsapp.menupane = $('#navigation');
		gsapp.menupane.jScrollPane();
		gsapp.menupaneAPI = gsapp.menupane.data('jsp');
	}
}


gsapp.buildCourseBlogIndexWall = function(time){
	if( gsapp.mobile == false ){
		safelog('running masonry');
		setTimeout(function(){
			var $container = $('#tmpltzr #course-blogs-index-listing .view-courseblogs .view-content');
			$container.imagesLoaded( function(){
				$container.masonry({
					itemSelector: '.views-row',
					columnWidth: 175,
					isAnimated: false,
					gutterWidth: 10,
					isFitWidth: true
				});
			});
			$('#tmpltzr #course-blogs-index-listing').animate({
				opacity: 1
			}, 500);
		}, time);
	}
}

gsapp.resizeFunc = function(){
	resizeMenu(); //resize the height or width of the menu

	var ww = window.innerWidth;
	var path = window.location.pathname;
	if( $('#course-blogs-index-listing').length > 0){
		var indexMarginRight = 60;
		var indexWidth = ww - 460 - indexMarginRight;
		safelog('ww: '+ww+'    indexWidth'+indexWidth);

		if(indexWidth < 520){
			safelog('<520');
			$('#wrapper').css('width', '520px');
			$('#fixed-header').css('width', '520px');
		}else{
			safelog('>520');
			$('#wrapper').css('width', indexWidth+'px');
			$('#fixed-header').css('width', indexWidth+'px');
			if(indexWidth < 750){
				$('.filter-list').width('240px');
				$('#tmpltzr #course-blogs-index-listing').css('marginTop', '300px');
			}else{
				$('.filter-list').width('360px');
				$('#tmpltzr #course-blogs-index-listing').css('marginTop', '');
			}
		}
		if(!$('#tmpltzr #course-blogs-index-listing .view-courseblogs .view-content').hasClass('masonry')){
			$('#tmpltzr #course-blogs-index-listing').css('opacity','0');
			gsapp.buildCourseBlogIndexWall(2000);
			safelog('FIRST TIMESSSSS');
		}else{
			gsapp.buildCourseBlogIndexWall(100);
			safelog('2nd TIMESSSSS');
		}
	}else{
		if( (ww >= 1270) && (path.indexOf('/about/people') < 0) ){
			$('#wrapper').css('width', '800px');

			var id ='';
			if(!$('body').hasClass("front")){
				$('#tmpltzr #main .view .views-row').each(function(i){
					if($('.tmpltzr-secondary-float', this).length != 0){
						id = $('.tmpltzr-secondary-float', this).attr('id');
						$(this).addClass(id).addClass('empty');
						$('#tmpltzr #right-sidebar').append($('.tmpltzr-secondary-float', this));
						
					}
				});		
			}			
		}else{
			$('#wrapper').css('width', '520px');
			
			var insertClass = '';
			if(!$('body').hasClass("front")){
				$('#tmpltzr #right-sidebar .tmpltzr-secondary-float').each(function(){
					insertClass = '#tmpltzr #main .view .views-row.' + $(this).attr('id');
					
					$(insertClass).append($(this)).removeClass('empty');
				});		
			}
		}
		gsapp.buildWall();
	}
	//if(window.location.href == HOME_URL){
	//	gsappFetcher.ccWidgetCarousel();
	//	gsappFetcher.eventsWidgetCarousel();
	//}
	//setTimeout(iscrollFunc, 100);
	//gsapp.buildWall();
	//evenColumnsCourseBlogsIndex(resized); //even out columns in course blog index TODO tct2003 reinstate this
	//resized = true; //set to true after the resize function has run once
}

var force_expanded = Array();
force_expanded.push('/studio-x-global/locations');

/*
// set margin-top for bio pages to image height
$(document).ready(function(){
    var profileheight = $("div.views-field-field-image-fid").height();
	profileheight -=60;
	console.log(profileheight);
	$("div.views-field-value-6").css("margin-top",profileheight);
});*/

var adjustPrimaryLinksMenu = function(path){
	$('#navigation .menu li').addClass('collapsed menu-item').removeClass('expanded');
	$('#navigation .menu:eq(0)').children('li').addClass('branch');
	var selector = '',
		$selected;
	for(i in force_expanded){
		selector = '#navigation a:[href="' + force_expanded[i] + '"]';		
		$(selector).parent('li').removeClass('collapsed').addClass('force-expanded');
		$(selector).parent('li').children('.menu').children('li').addClass('force-expanded');
	} 
	
	/* if not the homepage, where path = '/' */
	if( (path.length > 1) && (path.substring(1,7) != 'search') ){
		if(path.indexOf('columbiaedu') > 0){//faculty page
			path = '/about/people';
		}
		selector = '#navigation a:[href="' + path + '"]';
		//'#navigation a:[href="/studio-x-global"]'
		var selLen = $(selector).length;
		if( selLen < 0 ){//the page doesn't exist on the site
			window.location.href = HOME_URL;//redirect to homepage
			$('#navigation .menu li a').css('color','black');
		}else{//page exists
			if( selLen == 1 ){
				$selected = $(selector);
				if( $selected._is_redirect_child() ){
					$selected.closest('.menu').parent('li').addClass('redirect-active');
					setCurrentState(3);
				}else{
					setCurrentState(1);
				}
			}else if(selLen > 1){//redirect, internal or not
				
				if( $('#navigation a:[href="' + path + '"]:eq(0)').parent('li').children('.menu').find('li a:[href="' + path + '"]:eq(0)').length > 0 ){//redirect
					$selected = $('#navigation a:[href="' + path + '"]:eq(0)').parent('li').children('.menu').find('li a:[href="' + path + '"]:eq(0)');
					$('#navigation a:[href="' + path + '"]:eq(0)').parent('li').addClass('redirect-active');
					$('#navigation a:[href="' + path + '"]:eq(0)').removeClass('active');
					
					setCurrentState(3);
				}else{//internal redirect
					$(selector).each(function(){
						if($(this).closest('.menu').parent('li').length > 0){
							var stub = $(this).closest('.menu').parent('li').children('a:eq(0)').attr('href');
						}else{//level-0
							var stub = path;
						}
						stub = stub.substring(1, 6);
						if( stub == path.substring(1, 6) ){
							$selected = $(this);
						}else{
							$(this).removeClass('active');
						}
						
					});	
					setCurrentState(1);
				}
			}else{//regular homepage
				$('#navigation .menu li a').css('color','black');
			}
			$selected.parents('li').removeClass('collapsed').addClass('expanded active-trail');
			//$selected.parents('li.forced-expanded').addClass('active-trail');
			$('.active-trail').each(function(){
				$('a:eq(0)', this).css('color','black');
			});
			$('#navigation .active-trail:last a').css('color','black');
			//$selected.addClass('active').css('color', 'black');
			$selected.parents('.menu').show();
			$selected.parent('li').children('.menu').show();
			
		}
	}else{//homepage
		$('#navigation .menu li a').css('color','black');
	}
}



/*
	Adds a span to be filled with triangles for hover and menu expand effects.
*/
var MAX_MENU_LEVELS = 6;
function menuAddTriangles(){
	var id = 1;
	if(gsapp.mobile){
		// 114 = 60 + 54 (60 as safe value, 54 from #menu padding)
		var liW = gsappMobile.menuAndContentWidth - 114;
	}else{
		var liW = 340;
	}
	var aW = liW - 25;
	var liWStr = liW + 'px';
	var aWStr = aW + 'px';
	var selector = '#navigation #menu > .menu > li';
	
	$('#navigation #menu > .menu').addClass('level-0');
	$(selector).each(function(){ $(this).attr('id', 'm'+id++); });
	$(selector).css('width', liWStr).prepend('<span class="menu-arrow-large"></span>');
	$(selector).each(function(){
		$(this).children('a').css('width',aWStr);
	});
	
	
	for(var i = 1; i < MAX_MENU_LEVELS; i++){
		id = 10*i + 1;
		selector += ' > ul.menu';
		$(selector).addClass('level-'+i);
		selector += ' > li';
		$(selector).each(function(){ $(this).attr('id','m'+id++); });
		
		liW = aW;
		liWStr = liW + 'px';
		aW = liW - 19;
		aWStr = aW + 'px';
		
		$(selector).each(function(){
			//if( !($(this).hasClass('force-expanded')) ){//don't add the arrow for force-expanded
				$(this).css('width', liWStr).prepend('<span class="menu-arrow-small"></span>');
			//}
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

gsapp.initPhotoset = function(){
	if($('.tmpltzr-photoset-container').exists()){
		$('.tmpltzr-photoset-container').each(function(){
			var id = $(this).attr('id');
			var selector = '#'+id;
			var next = '#'+id+' .tmpltzr-photoset-next';
			var prev = '#'+id+' .tmpltzr-photoset-prev';
			
			$(selector).jCarouselLite({
				btnNext: next,
				btnPrev: prev,
				speed: 300,
				circular: true,
				visible: 1,
				scroll: 1
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

gsapp.menuHoverOnForced = function(){
	$(this).parent('li:not(.active-trail.leaf)').children(".menu-arrow-small").css('backgroundPosition', '0 0');
}

gsapp.menuHoverOffForced = function(){
	$(this).parent('li.collapsed').find(".menu-arrow-small").css('background-position', '-90px -50px');
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

gsapp.bindRegionCourseBlogIndexFilter = function(){
	$('.term-list a.term-index-term').removeClass('selected');	
	$(this).addClass('selected');
	var region = $(this).attr('id');
	region = '.'+region;
	var selector = '.view-courseblogs a.term-index-term:not('+region+')';

	$(selector).addClass('unselected');
	$(region).removeClass('unselected');

	
	//$(region).removeClass('unselected');
	
	//$(this).unbind('click').bind('click', gsapp.unbindRegionCourseBlogIndexFilter);
	return false;
};

gsapp.bindProgramCourseBlogIndexFilter = function(){
	$('.term-list a.term-index-term').removeClass('selected');
	$(this).addClass('selected');

	var program = $(this).attr('id');
	program = '.'+program;

	var selector = '.view-courseblogs a.term-index-term:not('+program+')';

	$(selector).addClass('unselected');
	$(program).removeClass('unselected');
	
	//$(this).unbind('click').bind('click', gsapp.unbindProgramCourseBlogIndexFilter);
	return false;
}

gsappMobile.switchToMenu = function(){
	$('#content').hide();
	$('#menuswitch').hide();
	var mcw = $('#wrapper').width();
	$('#wrapper').animate({
			width: 70,
			left: mcw
		}, gsappMobile.switchTIME);
	$('#navigation').animate({
			width: mcw
		}, gsappMobile.switchTIME,
		function(){
			$('#menu').show();
			$('#contentswitch').show(); 
			setTimeout(function(){
				gsappMobile.menuScroll.refresh();
			},0);
		});
	
	$('#navigation').unbind('click');
	$('#wrapper').click(gsappMobile.switchToContent);
}

gsappMobile.switchToContent = function(){
	$('#contentswitch').hide(); 
	$('#menu').hide();
	var mcw = $('#navigation').width();
	$('#navigation').animate({
			width: 70
		}, gsappMobile.switchTIME);
	$('#wrapper').animate({
			width: mcw,
			left: 70
		}, gsappMobile.switchTIME,
		function(){
			$('#content').show();
			$('#menuswitch').show();
			setTimeout(function(){
				gsappMobile.contentScroll.refresh();
			},0);
		});
		
	$('#wrapper').unbind('click');
	$('#navigation').click(gsappMobile.switchToMenu);
	
}

gsappMobile.refreshMenuWidth = function(){
	// 114 = 60 + 54 (60 as safe value, 54 from #menu padding)
	var mw = gsappMobile.menuAndContentWidth - 114;
	mw = mw + 'px';
	$('#menu').css('width',mw);
	
}

gsappMobile.initMobileScreen = function(){
	var ww = window.screen.availWidth;
	var wah = window.screen.availHeight;
	var mcw = ww - gsappMobile.sliderWidth;
	var mch = wah - gsappMobile.headerHeight;
	var classes = $('body').attr('class');
	var idx = classes.indexOf('version');
	idx = idx + 8;
	var version = classes.substring(idx,idx+1);
	var msh = mch - (228/2);;//mobile switch height (view page/menu)
	
	if( $('body').hasClass('iOS') ){
		if( (version == '4') || (version == '5') || (version == '6') ){
			ww = ww*2;
			mch = mch*2;
			mcw = ww - gsappMobile.sliderWidth;
		}
	}
	$('#header').css('width',ww);
	$('#navigation').css('width',mcw);
	gsappMobile.menuAndContentWidth = mcw
	gsappMobile.refreshMenuWidth();
	//init the switch
	$('#wrapper').css('left',gsappMobile.menuAndContentWidth);
	$('#wrapper').click(gsappMobile.switchToContent);
	
	var m = mch/2 - 228/2;
	
	
	$('#contentswitch').css('top',m+gsappMobile.headerHeight).show(); 
	$('#menuswitch').css('top',m);
}


/* STUDIO-X WIDGET */
	var TRANSITION_TIME_IN_MS = 700;//default speed of 700ms
	var AUTOSCROLL_TIME = 2000;
	var CAROUSEL_UL_SELECTOR = 'ul.studiox-widget-slideshow';
	var ITEM_WIDTH;
	var AUTOSCROLL_INTERVAL_BREAK;

	var MINUTES_TO_MS = 60000; //min x 60 = sec x 1000 = ms => min x 60,000 = ms
	var Offsets = {};
	Offsets.new_york = -300 * MINUTES_TO_MS;//-5:00 (DST: -4:00)
	Offsets.mumbai = 330 * MINUTES_TO_MS;//+5:30
	Offsets.rio = -180 * MINUTES_TO_MS;//-3:00 (DST: -2:00)
	Offsets.istanbul = 160 * MINUTES_TO_MS;//+2:00 (DST: +3:00)
	Offsets.beijing = 420 * MINUTES_TO_MS;//+8:00
	Offsets.tokyo = 480 * MINUTES_TO_MS;//+9:00
	Offsets.johannesburg = 120 * MINUTES_TO_MS;//+2:00 (DST: +3:00)
	Offsets.amman = 180 * MINUTES_TO_MS;//+3:00
	Offsets.paris = 60;//+1:00

	function delayedNextInterval(firstTime){
		var returnBreak = false;
		if(!returnBreak){
			if(!firstTime){
				studioxWidgetNext();
				firstTime = false;
			}
			setTimeout(delayedNextInterval, AUTOSCROLL_TIME);

		}
		return returnBreak;
	}

	function studioxWidgetPrev(){
		var $this = $(this);
		$this.unbind('click');
		if( (AUTOSCROLL_INTERVAL_ID != undefined) && (AUTOSCROLL_INTERVAL_ID != -1)){
			console.log('PREV clearning interval');
			clearInterval(AUTOSCROLL_INTERVAL_ID);
			AUTOSCROLL_INTERVAL_ID = 'cleared-prev';
		}
		var $current = $('.current');
		$current.removeClass('current').find('.bottom-container').css('opacity', 0);
		$current.prev().addClass('current').find('.bottom-container').css('opacity', 1);

		var $item_to_move = $(CAROUSEL_UL_SELECTOR + ' li:last-child');
		$item_to_move.width(0);
		$item_to_move.prependTo(CAROUSEL_UL_SELECTOR);
		$item_to_move.animate({
			width: ITEM_WIDTH
		}, TRANSITION_TIME_IN_MS, function(){
			if( AUTOSCROLL_INTERVAL_ID === 'cleared-prev'){
				console.log('PREV setting timeout to restart interval');
				AUTOSCROLL_INTERVAL_ID = setInterval(studioxWidgetPrevAuto, AUTOSCROLL_TIME);
				
			}
			$this.bind('click', studioxWidgetPrev);
		});
		
	}

	function studioxWidgetPrevAuto(){
		setTimeout(studioxWidgetPrev, AUTOSCROLL_TIME);
	}

	function studioxWidgetNext(){
		var $this = $(this);
		$this.unbind('click');
			
		AUTOSCROLL_INTERVAL_BREAK = true;

		var $current = $('.current');
		$current.removeClass('current').find('.bottom-container').css('opacity', 0);
		$current.next().addClass('current').find('.bottom-container').css('opacity', 1);

		var $item_to_move = $(CAROUSEL_UL_SELECTOR + ' li:first-child');
		$item_to_move.animate({
			width: 0
		}, TRANSITION_TIME_IN_MS, function(){
			$(this).appendTo(CAROUSEL_UL_SELECTOR);
			$(this).width(ITEM_WIDTH);
			if( AUTOSCROLL_INTERVAL_ID === 'cleared-next'){
				AUTOSCROLL_INTERVAL_ID = setInterval(studioxWidgetNextAuto, AUTOSCROLL_TIME);
			}
			$this.bind('click', studioxWidgetNext);
		});
		
	}

	function studioxWidgetNextAuto(){
		setTimeout(studioxWidgetNext, AUTOSCROLL_TIME);
	}


	function formatAMPM(date) {
	  var hours = date.getUTCHours();
	  var minutes = date.getUTCMinutes();
	  var seconds = date.getUTCSeconds();
	  var ampm = hours >= 12 ? 'pm' : 'am';
	  hours = hours % 12;
	  hours = hours ? hours : 12; // the hour '0' should be '12'
	  minutes = minutes < 10 ? '0'+minutes : minutes;
	  seconds = seconds < 10 ? '0'+seconds : seconds;
	  var strTime = '<span class="hms">' +hours + ':' + minutes + '</span><span class="ampm">' + ampm + '</span>';
	  return strTime;
	}
	
	function formatAMPMNYC(date) { //fix for daylight saving time in NYC
	  var hours = date.getUTCHours();
	  var minutes = date.getUTCMinutes();
	  var seconds = date.getUTCSeconds();
	  var ampm = hours >= 12 ? 'pm' : 'am';
	  hours = hours % 12;
	  hours++;
	  hours = hours ? hours : 12; // the hour '0' should be '12'
	  minutes = minutes < 10 ? '0'+minutes : minutes;
	  seconds = seconds < 10 ? '0'+seconds : seconds;
	  var strTime = '<span class="hms">' +hours + ':' + minutes + '</span><span class="ampm">' + ampm + '</span>';
	  return strTime;
	}

	function updateTime(){
		var UTC = new Date();
		var cityTime = new Date();
		var UTCTime = UTC.getTime();

		cityTime.setTime( UTCTime + Offsets.new_york );
		$('#studiox-search-new-york .city-time').html(
		  	formatAMPMNYC(cityTime)
		);
		cityTime.setTime( UTCTime + Offsets.mumbai );
		$('#studiox-search-mumbai .city-time').html(
		  	formatAMPM(cityTime)
		);
		cityTime.setTime( UTCTime + Offsets.beijing );
		$('#studiox-search-beijing .city-time').html(
		  	formatAMPM(cityTime)
		);
		cityTime.setTime( UTCTime + Offsets.amman );
		$('#studiox-search-amman .city-time').html(
		  	formatAMPM(cityTime)
		);
		cityTime.setTime( UTCTime + Offsets.amman );
		$('#studiox-search-amman .city-time').html(
		  	formatAMPM(cityTime)
		);
		cityTime.setTime( UTCTime + Offsets.rio );
		$('#studiox-search-rio-de-janeiro .city-time').html(
		  	formatAMPM(cityTime)
		);
		cityTime.setTime( UTCTime + Offsets.istanbul );
		$('#studiox-search-istanbul .city-time').html(
		  	formatAMPM(cityTime)
		);
		cityTime.setTime( UTCTime + Offsets.tokyo );
		$('#studiox-search-tokyo .city-time').html(
		  	formatAMPM(cityTime)
		);
		cityTime.setTime( UTCTime + Offsets.johannesburg );
		$('#studiox-search-johannesburg .city-time').html(
		  	formatAMPM(cityTime)
		);
		cityTime.setTime( UTCTime + Offsets.paris );
		$('#studiox-search-paris .city-time').html(
		  	formatAMPM(cityTime)
		);
	}

	function studioxWidgetCarouselInit(){
		/*
			Add copies of first and last list items to end and beginning of ul
		*/
		$('ul.studiox-widget-slideshow li:first-child').addClass('current');
		$('ul.studiox-widget-slideshow li:last-child').prependTo('ul.studiox-widget-slideshow');

		var itemCount = $('ul.studiox-widget-slideshow li').length;
		$('ul.studiox-widget-slideshow').width(ITEM_WIDTH * itemCount);

		//set offset (eg. left)
		$('ul.studiox-widget-slideshow').css('left', '-290px');// -1*(360 - 70)

		//bind buttons for changing offset
		$('.studiox-widget-slideshow-carousel .tmpltzr-photoset-prev').bind('click', studioxWidgetPrev);
		$('.studiox-widget-slideshow-carousel .tmpltzr-photoset-next').bind('click', studioxWidgetNext);

		updateTime();

		$('ul.studiox-widget-slideshow').css('opacity', 1);//starts as opacity:0 in css
		$('ul.studiox-widget-slideshow li.current .bottom-container').css('opacity', 1);
	}



/* END STUDIO-X WIDGET */


$(document).ready(function () {
	if($('body').hasClass('iscroll') || $('body').hasClass('mobile') ){
		gsapp.iscroll = true;
		if($('body').hasClass('mobile')){
			gsapp.mobile = true;
			gsappMobile.initMenuIScroll(0);
			gsappMobile.initContentIScroll(0);
			window.scrollTo(0,0);
			gsappMobile.initMobileScreen();
		}else{
			gsapp.mobile = false;
		}
	}else{
		gsapp.iscroll = false;
		gsapp.mobile = false;
	}
	
	adjustPrimaryLinksMenu( window.location.pathname );
	menuAddTriangles();

	/*************************** UTILITIES ***************************/
	jQuery.fn.exists = function(){return this.length>0;}

	if(gsapp.mobile == false){
		setMasonryBrickWidths();
	}
    
    /*************************** NON-MOBILE FRIENDLY EMBEDDED CONTENT ***************************/
	/* if viewing the stock site on a mobile device, like an iPad or other tablet,
	   this function will remove any non-mobile friendly embeds, like the flickr
	   image set flash-based <object>
	*/
	if($('body').hasClass('mobile') || $('body').hasClass('iscroll') ){
		gsapp._remove_flash_content();
	}
	
	setTimeout(gsapp.initPhotoset, 0);


	/* STUDIO-X INTERIOR WIDGET TIMEZONE DISPLAY */
	if( $('body').hasClass('front')){//homepage	
		updateTime();
		
		//ITEM_WIDTH = $(CAROUSEL_UL_SELECTOR +' li').width();
		//studioxWidgetCarouselInit();
		setInterval(updateTime, 60000);

		//AUTOSCROLL_INTERVAL_BREAK = delayedNextInterval(true);
	}
	  
    /*************************** MENU ***************************/
	var menu = $("#navigation #menu ul.menu");
	externalLinkAppendImg(menu);
	
	if(gsapp.iscroll == false){//no hover effects for mobile
		$('#navigation .menu li:not(.force-expanded)').children('a').bind('mouseenter', menuHoverOn).bind('mouseleave', menuHoverOff);
		$('#navigation .menu li.force-expanded').each(function(){
			if($(this).children('.menu').length <= 0){
				$('a:eq(0)', this).bind('mouseenter', menuHoverOn).bind('mouseleave', menuHoverOff);
			}else{
				$('a:eq(0)', this).bind('mouseenter', gsapp.menuHoverOnForced).bind('mouseleave', gsapp.menuHoverOffForced);
			}

		});
	}
	
	$('#fixed-header #region-list .term-list a.term-index-term').each(function(){
		$(this).bind('click', gsapp.bindRegionCourseBlogIndexFilter);
	});
	
	$('#fixed-header #program-list .term-list a.term-index-term').each(function(){
		$(this).bind('click', gsapp.bindProgramCourseBlogIndexFilter);
	});

	//include a notice in the header above the content: params: (image source, url to link to)
	gsapp.addHeaderNotice("http://www.columbia.edu/cu/arch/prod/tmpltzr/assets/underconstruction.png");
	/*
	gsapp.addHeaderNotice("http://www.columbia.edu/cu/arch/prod/tmpltzr/assets/givingday/english.png", "http://givingday.columbia.edu/school/graduate-school-of-architecture-planning-and-preservation/?utm_source=gsapp&utm_medium=banner&utm_campaign=2013GivingDay");
	gsapp.addHeaderNotice("http://www.columbia.edu/cu/arch/prod/tmpltzr/assets/givingday/portuguese.png", "http://givingday.columbia.edu/school/graduate-school-of-architecture-planning-and-preservation/?utm_source=gsapp&utm_medium=banner&utm_campaign=2013GivingDay");
	gsapp.addHeaderNotice("http://www.columbia.edu/cu/arch/prod/tmpltzr/assets/givingday/french.png", "http://givingday.columbia.edu/school/graduate-school-of-architecture-planning-and-preservation/?utm_source=gsapp&utm_medium=banner&utm_campaign=2013GivingDay");
	gsapp.addHeaderNotice("http://www.columbia.edu/cu/arch/prod/tmpltzr/assets/givingday/turkish.png", "http://givingday.columbia.edu/school/graduate-school-of-architecture-planning-and-preservation/?utm_source=gsapp&utm_medium=banner&utm_campaign=2013GivingDay");
	gsapp.addHeaderNotice("http://www.columbia.edu/cu/arch/prod/tmpltzr/assets/givingday/english_africa.png", "http://givingday.columbia.edu/school/graduate-school-of-architecture-planning-and-preservation/?utm_source=gsapp&utm_medium=banner&utm_campaign=2013GivingDay");
	gsapp.addHeaderNotice("http://www.columbia.edu/cu/arch/prod/tmpltzr/assets/givingday/russian.png", "http://givingday.columbia.edu/school/graduate-school-of-architecture-planning-and-preservation/?utm_source=gsapp&utm_medium=banner&utm_campaign=2013GivingDay");
	gsapp.addHeaderNotice("http://www.columbia.edu/cu/arch/prod/tmpltzr/assets/givingday/arabic.png", "http://givingday.columbia.edu/school/graduate-school-of-architecture-planning-and-preservation/?utm_source=gsapp&utm_medium=banner&utm_campaign=2013GivingDay");
	gsapp.addHeaderNotice("http://www.columbia.edu/cu/arch/prod/tmpltzr/assets/givingday/english_south_asia.png", "http://givingday.columbia.edu/school/graduate-school-of-architecture-planning-and-preservation/?utm_source=gsapp&utm_medium=banner&utm_campaign=2013GivingDay");
	gsapp.addHeaderNotice("http://www.columbia.edu/cu/arch/prod/tmpltzr/assets/givingday/chinese.png", "http://givingday.columbia.edu/school/graduate-school-of-architecture-planning-and-preservation/?utm_source=gsapp&utm_medium=banner&utm_campaign=2013GivingDay");
	gsapp.addHeaderNotice("http://www.columbia.edu/cu/arch/prod/tmpltzr/assets/givingday/japanese.png", "http://givingday.columbia.edu/school/graduate-school-of-architecture-planning-and-preservation/?utm_source=gsapp&utm_medium=banner&utm_campaign=2013GivingDay");
	*/



	/*************************** STARTUP FUNCTIONS ***************************/
	
	if(gsapp.mobile == false){
		gsapp.resizeFunc(); //run the resize function on page load
		$(window).resize(gsapp.resizeFunc); //bind the resize function to the page
	}
});


$(window).load(function(){
	if(gsapp.mobile == false){
		setTimeout(gsapp.buildWall,100);
		setTimeout(gsapp.buildWall,500);
	}
	if(gsapp.iscroll && (gsapp.mobile == false) ){
		gsappMobile.initMenuIScroll(200);
		gsappMobile.initContentIScroll(200);
	}
});


/* Convert old faculty page urls to new url format  AND fix positioning for new faculty pages*/
$(document).ready(function(){
	
	var facultyhref, facultyhref1;
	var facultyhref2 = new Array();
	var uni = new Array();
	
	$("a[href^='/about/people/'][href$='columbiaedu']").each(function() {
		facultyhref1=$(this).attr("href");
		facultyhref2 = facultyhref1.split("/about/people/");
		uni = facultyhref2[1].split("columbiaedu");
		facultyhref = "/faculty/" + uni[0];
		$(this).attr("href",facultyhref);
	});
var sampleh = $("div.views-field-field-image-fid span.field-content img").height();
console.log(sampleh);	
	
});