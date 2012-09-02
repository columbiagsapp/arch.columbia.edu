// https://gist.github.com/854622
(function(window,undefined){
	// Prepare our Variables
	var
		History = window.History,
		$ = window.jQuery,
		document = window.document,
		TOGGLE_TIME = 500,
		templatizer = false,
		copypaste = true;

	// Check to see if History.js is enabled for our Browser
	if ( !History.enabled ) {
		return false;
	}

	// Wait for Document
	$(function(){
		// Prepare Variables
		var
			/* Application Specific Variables */
			contentSelector = '#content',
			$content = $(contentSelector),
			contentNode = $content.get(0),
			$menu = $('#navigation'),
			activeClass = 'active',
			activeSelector = '.active-trail .active',
			menuChildrenSelector = '> li,> ul > li',
			/* Application Generic Variables */
			$body = $(document.body),
			rootUrl = History.getRootUrl(),
			scrollOptions = {
				duration: 0
			};
		
		
		// test for templatizer tmpltzr
		var base_path = '';
		if ( rootUrl.indexOf("postfog") != -1 ) {
			base_path = '/templatizer/';
		}
		
		// Ensure Content
		if ( $content.length === 0 ) {
			$content = $body;
		}
		
		// Internal Helper
		$.expr[':'].internal = function(obj, index, meta, stack){
			// Prepare
			var
				$this = $(obj),
				url = $this.attr('href')||'',
				isInternalLink;
			
			// Check link
			isInternalLink = url.substring(0,rootUrl.length) === rootUrl || url.indexOf(':') === -1;
			if((url.indexOf("/admin/") >= 0) || (( copypaste == true) && (url.indexOf("/edit") >= 0)) ){
				isInternalLink = false;
			}			
			// Ignore or Keep
			return isInternalLink;
		};
		
		
		// HTML Helper
		var documentHtml = function(html){
			// Prepare
			var result = String(html)
				.replace(/<\!DOCTYPE[^>]*>/i, '')
				.replace(/<(html|head|body|title|meta|script)([\s\>])/gi,'<div class="document-$1"$2')
				.replace(/<\/(html|head|body|title|meta|script)\>/gi,'</div>')
			;
			
			// Return
			return result;
		};
		
		
		
		
		
		
		
		
		
		
		/* 	function: level()
		 *	Returns the menu level of the item
		*/
		$.fn.level = function(){
			var classes = $(this).closest('.menu').attr('class');
			var levelIdx = classes.indexOf('level-') + 6;
			return classes.substring(levelIdx, levelIdx+1);
		}
		
		
		/* 	function: internalRedirect()
		 *	Checks if the selected menu item redirects to an item in a lower menu with
		 *	a different parent.
		*/
		$.fn.internalRedirect = function($active){
			var thisHREF = $(this).attr('href');
			thisHREF = thisHREF.substring(1,5); //remove the leading /
			
			var activeHREF = $active.closest('.level-1').closest('li').children('a').attr('href');
			if(activeHREF != undefined){
				activeHREF = activeHREF.substring(1,5);
				if( ( thisHREF != undefined ) && (activeHREF != undefined) ){
					if( thisHREF != activeHREF ){
						return thisHREF;
					}else{
						return false;
					}
				}else{
					return false;
				}
			
			}else{
				return false;
			}
			return false;
		}
		
		
		/* 	function: digRedirect()
		 *	Checks if the selected menu item redirects to an item in a nested menu.
		*/
		$.fn.digRedirect = function(){
			var returnval = false;
			var href = $(this).attr('href');
			var $menu = $(this).parent('li').children('.menu');
			
			if( $menu.length > 0 ){
				$menu.children('li').each(function(){
					if( href == $(this).children('a').attr('href') ){
						returnval = $(this).children('a');
					}
				});
				
			}
			return returnval;
		}
		
		/* 	function: hideMenu()
		 *	Hide the menu (but don't change the active settings)
		*/
		$.fn.hideMenu = function(){
			
		}
		
		/* 	function: scrollMenu()
		 *	Scrolls the menu to the branch two levels above
		*/
		$.fn.scrollMenu = function($active, timeout){
			if(timeout == undefined){
				timeout = 0;
			}
			if($active != undefined){
				if( $(this).closest('li.branch').index() > $active.closest('li.branch').index() ){
					var $branch;
					if( $(this).parent('li').level() == 0){
						$branch = $(this).parent('li');
					}else{
						$branch = $(this).closest('.level-1').parent('li');
					}
					
					var $target;
					if( $branch.hasClass('first') ){
						$target = $branch.children('a:eq(0)');
					}else if( $branch.prev().hasClass('first') ){
						$target = $branch.prev().children('a:eq(0)');
					}else{
						$target = $branch.prev().prev().children('a:eq(0)');
					}
					setTimeout(function(){ $('#navigation').scrollTo( $target, TOGGLE_TIME ); }, timeout); 
				}else{
					return false;
				}	
			}else{
				return false;
			}	
		}
		
		/* 	function: expandBranch()
		 *	Expand the menu and add active settings.
		*/
		$.fn.expandBranch = function(internalRedirect){
			var $returnSelector = false;
			var $clicked = $(this);
			var selector = 'a[href="' + $clicked.attr('href') + '"]';
			$('#navigation .menu:eq(0)').children('li').each(function(){
				var href = $(this).children('a').attr('href');
				if( href.indexOf(internalRedirect) > 0){					
					$(this).find(selector).parents('li').each(function(){
						$(this).removeClass('collapsed').addClass('expanded active-trail');
						$(this).children('a').css('color', 'white');
						if($(this).hasClass('leaf')){
							$(this).children('.menu-arrow-small').css('backgroundPosition','-9px 0');
						}else{
							$(this).children('.menu-arrow-large, .menu-arrow-small').css('backgroundPosition','0 0');
						}
						
						$(this).children('.menu:not(:visible)').slideToggle(TOGGLE_TIME);
					});	
					$(this).find(selector).addClass('active');
					$returnSelector = $(this).find(selector);
				}
			});
			return $returnSelector;
			
		}
		
		/* 	function: expandMenus()
		 *	Expands all the menus above $(this) and adds active settings.
		*/
		$.fn.expandMenus = function(){
			$(this).parents('li').removeClass('collapsed').addClass('expanded active-trail');
			
			$(this).parents('li').each(function(){
				if($(this).hasClass('leaf')){
					$(this).children('.menu-arrow-small').css('backgroundPosition','-9px 0');
				}else{
					$(this).children('.menu-arrow-large, .menu-arrow-small').css('backgroundPosition','0 0');
				}
				$(this).children('a:eq(0)').css('color', 'white');
				if( !( $(this).children('.menu').is(':visible') ) ){
					$(this).children('.menu').slideToggle(TOGGLE_TIME);
				}
			});
			$(this).addClass('active').css('color', 'white');
		}
		
		/* 	function: expandMenu()
		 *	Expand the menu and add active settings.
		*/
		$.fn.expandMenu = function(){
			if( !($(this).parent('li').hasClass('force-expanded')) ){
				$(this).parent('li').removeClass('collapsed').addClass('expanded active-trail');
				var $parent = $(this).parent('li');
				if($parent.hasClass('leaf')){
					$parent.children('.menu-arrow-small').css('backgroundPosition','-9px 0');
				}else{
					$parent.children('.menu-arrow-large, .menu-arrow-small').css('backgroundPosition','0 0');
				}
				$(this).parent('li').children('.menu:not(:visible)').slideToggle(TOGGLE_TIME);
			}else{
				$(this).parents('li').each(function(){
					$(this).removeClass('collapsed').addClass('expanded active-trail');
					$(this).children('a:eq(0)').css('color', 'white');
				});
				
			}
			$(this).addClass('active').css('color', 'white');
		}
		
		/* 	function: collapseMenu()
		 *	Collapse the menu and remove active settings.
		*/
		$.fn.collapseMenu = function(){
			$(this).removeClass('expanded').removeClass('active-trail').addClass('collapsed');
			$(this).children('a').css('color','');
			if( !($(this).hasClass('force-expanded')) ){
				$(this).children('.menu-arrow-large, .menu-arrow-small').css('backgroundPosition', '-15px -50px');
				$(this).children('.menu:visible').slideToggle(TOGGLE_TIME);
			}
		}
		
		/* 	function: collapseMenus()
		 *	Collapse all menus lower in the DOM than $(this) except the immediate child.
		*/
		$.fn.collapseMenus = function(time){
			time = time || TOGGLE_TIME;
			$(this).children('.menu').find('li').each(function(){
				$(this).collapseMenu();
			});
		}
		
		
		/* 	function: collapseMenuInterval()
		 *	Collapse all menus lower in the DOM than $(this) except the immediate child.
		*/
		$.fn.collapseMenuInterval = function($active, lev, time){
			time = time || TOGGLE_TIME;
			$this = $(this);
			if(lev < 0){
				$active.parents('li').each(function(){
					if( $(this).children('a:eq(0)').get(0) === $this.get(0) ){
						return false;
					}else{
						$(this).collapseMenu();
					}
				});
			}else{
				$active.parents('li').each(function(){
					if( $(this).level() >= lev ){
						$(this).collapseMenu();
					}
				});
			}
			
		
		
		}
		

		
		
		/* 	function: collapseBranch()
		 *	Collapse the branch above $(this).
		*/
		$.fn.collapseBranch = function(time){
			time = time || TOGGLE_TIME;
			$(this).parents('li.active-trail').each(function(){	
				$(this).collapseMenu();
			});
		}
		
		/* 	function: _is_active_trail()
		 *	Checks if the selected menu item is in the same branch as the current.
		 *
		 *	$active: the active menu link (anchor).
		*/
		$.fn._is_active_trail = function($active){
			var returnval = false;
			var $parents;
			if( $(this)._is_force_expanded() ){
				$parents = $(this).parents('li.force-expanded');//only check the f-e parents
			}else{
				$parents = $(this).parents('li');
			}
			$parents.each(function(){
				if( $(this).hasClass('active-trail') ){
					returnval = true;
				}
			});
			return returnval;
		}
		
		/* 	function: dig()
		 *	This function is called when a menu or item deeper within the current menu
		 *	is selected. It checks for hard-wired redirects and internal-redirects.
		*/
		$.fn.dig = function($active){
			var $redir = $(this).digRedirect();
			if($active != undefined){
				var internalRedir = $(this).internalRedirect($active);
			}else{
				var internalRedir = false;
			}
			
			if( $redir != false ){
				$(this).parent('li').addClass('redirect-active');
				$redir.expandMenus();
				setCurrentState(3);
			}else if( internalRedir != false ){
				$active.collapseBranch();
				var $sel = $(this).expandBranch(internalRedir);
				if( getCurrentState() == 'redirect' ){
					$('.redirect-active').removeClass('redirect-active');
				}
				$sel = $sel.closest('.level-1').parent('li').children('a:eq(0)');
				safelog('sel href: ' + $sel.attr('href'));
				//TODO: need to add > +2 test here
				if($active != undefined){
					if( $sel.closest('li.branch').index() > ($active.closest('li.branch').index()+2) ){
						$sel.scrollMenu($active, TOGGLE_TIME);
					}else{
						$sel.scrollMenu($active);
					}
				}
				setCurrentState(1);
			}else{
				if($active != undefined){
					if( $(this).parent('li').hasClass('force-expanded') ){
						safelog('!!!!! ERROR WHAT AM I DOING HERE?????');
						var $this = $(this);
						if( $active.parent('li').hasClass('force-expanded') ){
							/* if not a parent of $(this) then collapseMenu */
							var parent = false;
							$active.parent('li').find('.menu').each(function(){
								if( $(this).children('li').children('a:eq(0)').get(0) == $this.get(0) ){
									parent = true;
								}
							});
							if(parent == false){
								$active.parent('li').collapseMenu();//this will just turn off the white and classes
							}
							
						}
					}
				}
				$(this).expandMenu();
				setCurrentState(1);
			}	
			if($active != undefined){
				$active.removeClass('active');
			}
		}
		
		/* 	function: _is_dig()
		 *	Checks if the selected menu item is in a menu in the active-trail path or not.
		 *
		 *	$active: the active menu link (anchor).
		*/
		$.fn._is_dig = function($active){
			if($(this)._in_active_branch($active) && ( $(this).level() > $active.level() ) ){
				return true;
			}else{
				return false;
			}
		}
		
		/* 	function: sibling()
		 *	This function is called when the selected item is a sibling of the active item.
		*/
		$.fn.sibling = function($active){
			var $redir = $(this).digRedirect();
			if($active != undefined){
				var internalRedir = $(this).internalRedirect($active);
			}else{
				var internalRedir = false;
			}
			var currentState = getCurrentState();
			
			if( $redir != false ){
				$active.parent('li').collapseMenu();
				$(this).scrollMenu($active);
				$(this).parent('li').addClass('redirect-active');//add it to the list item
				$redir.expandMenus();
				setCurrentState(3);
			}else if( internalRedir != false ){
				safelog('troy!!!');
				
				
				
				
				$active.collapseBranch();
				var $sel = $(this).expandBranch(internalRedir);
				if( getCurrentState() == 'redirect' ){
					$('.redirect-active').removeClass('redirect-active');
				}
				$sel = $sel.closest('.level-1').parent('li').children('a:eq(0)');
				safelog('sel href: ' + $sel.attr('href'));
				//TODO: need to add > +2 test here
				if($active != undefined){
					if( $sel.closest('li.branch').index() > ($active.closest('li.branch').index()+2) ){
						$sel.scrollMenu($active, TOGGLE_TIME);
					}else{
						$sel.scrollMenu($active);
					}
				}
				setCurrentState(1);
			}else{
				
				if($active != undefined){
					if( $(this).closest('li.branch').index() > ($active.closest('li.branch').index()+2) ){
						$active.parent('li').collapseMenu();
						$(this).scrollMenu($active, TOGGLE_TIME);
					}else{
						$(this).scrollMenu($active);
						$active.parent('li').collapseMenu();
					}
				}
				$(this).expandMenu();
				if( currentState == 'home'){
					setCurrentState(1);
				}
			}	
			if($active != undefined){
				$active.removeClass('active');
			}
		}
		
		
		/* 	function: _is_sibling()
		 *	Checks if the selected menu item a sibling of the currently active item.
		 *
		 *	$active: the active menu link (anchor).
		*/
		$.fn._is_sibling = function($active){
			if( ($(this).level() == 0) || ($active.level() == 0) ){
				if( $(this).level() == $active.level() ){
					return true;
				}else{
					return false;
				}
			}else if( $(this).closest('.menu').parent('li').children('a:eq(0)').attr('href') == $active.parent('li').parent('.menu').parent('li').children('a:eq(0)').attr('href')){
				return true;
			}
			return false;
		}
		
		/* 	function: climb()
		 *	This function is called when a menu or item higher within the current menu
		 *	is selected. It checks for hard-wired redirects and internal-redirects.
		*/
		$.fn.climb = function($active){
			var $redir = $(this).digRedirect();
			if($active != undefined){
				var internalRedir = $(this).internalRedirect($active);
			}else{
				var internalRedir = false;
			}
			
			if( $redir != false ){
				if( $(this).parent('li').hasClass('active-trail') ){
					$redir.collapseMenuInterval($active, $(this).level()+1 );
				}else{
					$(this).collapseMenuInterval($active, $(this).level() );
					$redir.expandMenus();
				}
				
				$(this).parent('li').addClass('redirect-active');
				setCurrentState(3);
			}else if( internalRedir != false ){
				$active.collapseBranch();
				var $sel = $(this).expandBranch(internalRedir);
				$sel.scrollMenu($active);
				setCurrentState(1);
			}else{
				
				if( $(this).parent('li').hasClass('active-trail') ){
					$(this).collapseMenuInterval($active, -1);
				}else{
					$(this).collapseMenuInterval($active, $(this).level() );
					$(this).expandMenu();
				}
				setCurrentState(1);
				$(this).addClass('active');
			}
			if($active != undefined){
				$active.removeClass('active');
			}	
		}
		
		/* 	function: _is_climb()
		 *	Checks if the selected item is in the tree above the current active item.
		 *
		 *	$active: the active menu link (anchor).
		*/
		$.fn._is_climb = function($active){
			if($(this)._is_active_trail($active) && ( $(this).level() < $active.level() ) ){
				return true;
			}else{
				return false;
			}
		}
		
		
		/* 	function: _is_force_expanded()
		 *	Checks if $(this) is force expanded
		 *
		 *	$active: the active menu link (anchor).
		*/
		$.fn._is_force_expanded = function($active){
			if( $(this).parent('li').hasClass('force-expanded') ){
				return true;
			}else{
				return false;
			}
		}
		
		
		/* 	function: _is_branch()
		 *	Checks if linked to a force-expanded link inside the same branch
		 *
		 *	$active: the active menu link (anchor).
		*/
		$.fn._is_branch = function($active){
			var thisBranch = $(this).closest('.level-1').parent('li').children('a:eq(0)').attr('href');
			var activeBranch = $active.closest('.level-1').parent('li').children('a:eq(0)').attr('href');
			
			if(thisBranch == activeBranch){
				return true;
			}else{
				return false;
			}
		}
		
		
		
		/* 	function: _in_active_branch()
		 *	Checks if $(this) is a descendant of $active
		*/
		$.fn._in_active_branch = function($active){
			var parent = false;
			var $this = $(this);
			if($active != undefined){
				$active.parent('li').find('.menu').each(function(i){
					$(this).children('li').each(function(){
						if( $(this).children('a:eq(0)').get(0) === $this.get(0) ){
							parent = true;
						}
					});
				});
			}
			return parent;
		}
		
		/* 	function: branch()
		 *	This function is called when the selected item is in a different top-level
		 *	menu.
		*/
		$.fn.branch = function($active){
		
			if($active != undefined){
				if( $(this).closest('li.branch').index() > ($active.closest('li.branch').index()+2) ){
					$(this).collapseMenuInterval($active, 0 );
					$(this).scrollMenu($active, TOGGLE_TIME);
				}else{
					
					$(this).scrollMenu($active);
					$(this).collapseMenuInterval($active, 0 );
				}
			}
		
			$active.removeClass('active');
			$active = undefined;
			$(this).dig($active);
		}
		
		
		
		/* 	function: menuToggleVisibility()
		 *	Toggles the visibility of the menu
		*/
		$.fn.menuToggleVisibility = function(){
			if( $(this).children('.menu').is(':visible') ){
				$(this).children('.menu-arrow-large').css('backgroundPosition', '-15px 0');
				$(this).children('.menu-arrow-small').css('backgroundPosition', '-9px 0');
				setMenuToggle('hidden');
			}else{
				$(this).children('.menu-arrow-large, .menu-arrow-small').css('backgroundPosition', '0 0');
				setMenuToggle('shown');
			}
			$(this).children('.menu').slideToggle(TOGGLE_TIME);
		}
		
		
		// Ajaxify Helper - binds function to menu clicks that are internal links
		$.fn.ajaxify = function(){	
			//Prepare 
			var $this = $(this);
			// Ajaxify
			$(this).find('a:internal:not(#gsapplogo)').click(function(event){ //exempt GSAPP Logo so it reloads everything
				
				// Prepare
				var
					$this = $(this),
					$active = $('.active'),
					url = $this.attr('href'),
					fetch = true,
					title = $this.attr('title')||null;
				
				// Continue as normal for cmd clicks etc
				if ( event.which == 2 || event.metaKey ) { return true; }
				
				$('body').removeClass('front').addClass('not-front');
				
				switch(getCurrentState()){
					case 'home':
						$this.dig($active);
						break;
					case 'menu':
						if( $this.hasClass('active') ){//clicked self
							if( !($this.parent('li').hasClass('leaf')) ){
								$this.parent('li').menuToggleVisibility();
							}
							fetch = false;
							break;
						}else if( $this._in_active_branch($active) && $this._is_dig($active) ){
							$this.dig($active);
						}else if( ($active != undefined) && $this._is_sibling($active) ){
							$this.sibling($active);
						}else if( ($active != undefined) && $this._is_climb($active) ){/* need to climb */
							$this.climb($active);
						}else if( ($active != undefined) && ($this._is_force_expanded()) && ($this._is_branch($active)) ){
							if(!($this._is_active_trail($active))){
								var $last = $this.parents('li.force-expanded').last();
								$last.children('a:eq(0)').collapseMenuInterval($active, $last.children('a:eq(0)').level());
								if( getMenuToggle() == 'hidden'){
									$active.menuToggleVisibility();
								}
								$this.expandMenus();
								$this.addClass('active');
								$active.removeClass('active');
							}else{
								$this.dig($active);
							}
						}else{
							$this.branch($active);
						}
						break;
					case 'redirected':
						if( $this._is_dig($active) ){
							$this.dig($active);
						}else if( ($active != undefined) && $this._is_sibling($active) ){
							$this.sibling($active);
						}else if( ($active != undefined) && $this._is_climb($active) ){/* need to climb */
							if( $this.parent('li').hasClass('redirect-active') ){
								$this.parent('li').menuToggleVisibility();
								fetch = false;
								break;
							}else if( ( $this.parent('li').hasClass('active-trail') ) && ($this.level() <= $('.redirect-active').level()) ){
								$('redirect-active').removeClass('redirect-active');
							}
							$this.climb($active);
						}else{
							$('redirect-active').removeClass('redirect-active');
							$this.branch($active);
							//$(this).scrollMenu($active);
						}
						break;
					default:
						safelog('error: the current state is not recognized');
						break;
				}
				
				
				if(fetch == true){
					// Ajaxify this link
					History.pushState(null,title,url);
					event.preventDefault();											
				}
								
				return false;
			});
			
			// Chain
			return $this;
		};
		
		// Ajaxify our Internal Links
		$body.ajaxify();
		
		
		
		
		// Hook into State Changes
		$(window).bind('statechange',function(){	
			// Prepare Variables
			var
				State = History.getState(),
				url = State.url,
				relativeUrl = url.replace(rootUrl,'');

			// Set Loading
			$body.addClass('loading');

			// Start Fade Out
			// Animating to opacity to 0 still keeps the element's height intact
			// Which prevents that annoying pop bang issue when loading in new content
			$content.animate({opacity:0},100);
			
			// Ajax Request the Traditional Page
			$.ajax({
				url: url,
				success: function(data, textStatus, jqXHR){				
					// Prepare
					var
						$data = $(documentHtml(data)),
						$dataBody = $data.find('.document-body:first'),
						$dataContent = $dataBody.find(contentSelector).filter(':first'),
						$menuChildren, contentHtml, $scripts;
					
					// Fetch the scripts
					$scripts = $dataContent.find('.document-script');
					if ( $scripts.length ) {
						$scripts.detach();
					}

					// Fetch the content
					contentHtml = $dataContent.html()||$data.html();
					if ( !contentHtml ) {
						document.location.href = url;
						return false;
					}
					
					
					// Update the content
					$content.stop(true,true);
					$content.html(contentHtml).ajaxify().css('opacity',100).show(); // you could fade in here if you'd like 
					
					//resize the page to check if room for sidebar
					resizeFunc();

					if(copypaste == true){
						setTimeout(copyPaste, 2000);
						safelog('is templatizer!!!!!!');
					}else{
						safelog('is NOT templatizer!!!!!!');
					}

					// Update the title
					document.title = $data.find('.document-title:first').text();
					try {
						document.getElementsByTagName('title')[0].innerHTML = document.title.replace('<','&lt;').replace('>','&gt;').replace(' & ',' &amp; ');
					}
					catch ( Exception ) { }
					
					// Add the scripts
					$scripts.each(function(){
						var $script = $(this),
							scriptText = $script.text();
	
						if( $('body').hasClass('IE') ){
							var ss = document.createElement('script');
							var scr = scriptText;
							ss.text = scr;
							safelog('scr: ' + scr);
							var hh = document.getElementsByTagName('head')[0];
							hh.appendChild(ss);
						}else{
							var scriptNode = document.createElement('script');
							scriptNode.appendChild(document.createTextNode(scriptText));
							contentNode.appendChild(scriptNode);
						}
					});

					// Complete the change
					if ( $body.ScrollTo||false ) { $body.ScrollTo(scrollOptions); } // http://balupton.com/projects/jquery-scrollto 
					$body.removeClass('loading');
	
					// Inform Google Analytics of the change
					if ( typeof window.pageTracker !== 'undefined' ) {
						window.pageTracker._trackPageview(relativeUrl);
					}

					// Inform ReInvigorate of a state change
					if ( typeof window.reinvigorate !== 'undefined' && typeof window.reinvigorate.ajax_track !== 'undefined' ) {
						reinvigorate.ajax_track(url);
						// ^ we use the full url here as that is what reinvigorate supports
					}
					
				},
				error: function(jqXHR, textStatus, errorThrown){
					document.location.href = url;
					return false;
				}
			}); // end ajax

		}); // end onStateChange


	}); // end onDomLoad

})(window); // end closure