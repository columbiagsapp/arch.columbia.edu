$(document).ready(function() {

	// iphone full screen
	window.scrollTo(0,0);
	
	// hide children in menu
	//$("li:not(.menu-level-1)").hide();
	
	$('#header').css('border','4px solid red');
	
	var MAX_MENU_LEVELS = 6;
	
	var collapseMenu = function(level){
		var selector = '';
		for(i = level; i <= MAX_MENU_LEVELS; i++){
			selector = '#menu ul li.menu-level-'+i;
			$(selector).removeClass('expanded').addClass('collapsed');
		}
	};
	
	$("#menu ul li a").click(function() {
		//console.log(this);
		
		var classes = $(this).parent('li').attr('class');
		
		var levelIdx = classes.indexOf('menu-level-') + 11;
		var level = classes.substring(levelIdx, levelIdx+1);
		collapseMenu(level);
		
		$('a.active').removeClass('active');
		$(this).addClass('active');
		
		$(this).parent('li').addClass("expanded").removeClass("collapsed").addClass("active-trail");//.children("ul").show(300);
		
		
		$("#menu .active-trail").each(function(){
			$('a:eq(0)', this).css('color', '#00D6FF');
		});
	
		
		
		
		// load content
		var link_target = ['/templatizer/', 
			$(this).attr('href')].join('');
		load_content(link_target);
		
		
		return false;
	});
	
	
	
	$('#switch-bar').css('left', '570px');

	$('#switch-bar').toggle(function() {
		// move menu offscreen and show content
		var offscreen = {
			'position': 'absolute',
			'left': '-2000px',
		};
		$('#menu').css(offscreen);
		$('#switch-bar').css('left', '0');
		$('#switch-bar div').css('left', '26px').css('right', '');
		$('#switch-bar div div').addClass('page');
		$('#content').css('left', '100px');
	},
	function() {
		// move content offscreen and show menu
		var offscreen = {
			'position': 'absolute',
			'left': '-2000px',
		};
		$('#menu').css('left', 0);
		$('#switch-bar').css('left', '570px');
		$('#switch-bar div').css('right', '26px').css('left', '');
		$('#switch-bar div div').removeClass('page');
		$('#content').css(offscreen);
	});
	
	
	
	
	// load content inline via ajax	
	$('#programs-page').click(function() {
			$('#content').load("/templatizer/programs?mobile=false #tmpltzr", function(data) {
				$(data); var contents = $('#tmpltzr', data).html();
				$('#content').html(contents);
			});
	});
	
	$('#about-deans').click(function() {
		load_content("/templatizer/about/deans-statement");
	});
	
	
});

function load_content(url) {
	var url = [url, '?mobile=false #tmpltzr'].join('');
	$('#content').load(url, function(data) {
		$(data); var contents = $('#tmpltzr', data).html();
		$('#content').html(contents);
	});
}