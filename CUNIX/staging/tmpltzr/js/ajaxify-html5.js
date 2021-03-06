// https://gist.github.com/854622
(function(window,undefined){
	// Prepare our Variables
	var
		History = window.History,
		$ = window.jQuery,
		document = window.document,
		TOGGLE_TIME = 500,
		templatizer = false,
		interclick = false,
		anchorclick = false;

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
		
		var base_path = '';
		
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
			if((url.indexOf("/admin/") >= 0) || (url.indexOf("/edit") >= 0) || (url.substring(0,1) === '#') ){
				isInternalLink = false;
			}
			
			// Ignore or Keep
			return isInternalLink;
		};

		// Internal Anchor Helper
		$.expr[':'].anchor = function(obj, index, meta, stack){
			// Prepare
			var
				$this = $(obj),
				url = $this.attr('href')||'',
				isAnchorLink = false;
			
			// Check link
			if(url.substring(0,1) === '#'){
				isAnchorLink = true;
			}
			
			// Ignore or Keep
			return isAnchorLink;
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
		
		
		/* 	function: internalRedirect()
		 *	Checks if the selected menu item redirects to an item in a lower menu with
		 *	a different parent.
		 *
		 * return values
		 * - false if not an internal redirect
		 * - /@@@@ where @@@@ is the first four letters of the base path for the internal redirect (ie. the branch)
		*/
		$.fn.internalRedirect = function($active){
			var returnval;
			var thisHREF = $(this).attr('href');//programs/
			thisHREF = thisHREF.substring(1,5); //remove the leading /prog

			if($(this).parent('li').hasClass('branch') ){//if both top level
				returnval = false;
			}else{//not siblings at the highest level

				if($active.closest('.level-1').length){
					var activeHREF = $active.closest('.level-1').parent('li').children('a').attr('href');
				}else{
					var activeHREF = $active.attr('href');
				}
				if(activeHREF != undefined){

					activeHREF = activeHREF.substring(1,5);

					if( thisHREF != undefined ){
						if( thisHREF != activeHREF ){
							returnval = thisHREF;
						}else{
							returnval = false;
						}
					}else{
						returnval = false;
					}
				
				}else{
					returnval = false;
				}
			}
			return returnval;
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
		
		/* 	function: expandBranch()
		 *	Expand the menu and add active settings to $(this)
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
						$(this).children('a').css('color', 'black');
						if($(this).hasClass('leaf')){
							$(this).children('.menu-arrow-small').css('backgroundPosition','-9px 0');
						}else{
							$(this).children('.menu-arrow-large, .menu-arrow-small').css('backgroundPosition','0 0');
						}
						
						$(this).children('.menu:not(:visible)').slideToggle(TOGGLE_TIME);
					});	
					$(this).find(selector).addClass('active');
					$(this).parent('li').find('.force-expanded').each(function(){
						if($(this).children('.menu').length > 0){
							$(this).children('span').css('backgroundPosition', '0 0');
						}
					});
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
				$(this).children('a:eq(0)').css('color', 'black');
				if( !( $(this).children('.menu').is(':visible') ) ){
					$(this).children('.menu').slideToggle(TOGGLE_TIME);
				}
				
				$(this).parent('li').find('.force-expanded').each(function(){
					if($(this).children('.menu').length > 0){
						$(this).children('span').css('backgroundPosition', '0 0');
					}
				});
			});
			$(this).addClass('active').css('color', 'black');
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
				$(this).parent('li').find('.force-expanded').each(function(){
					if($(this).children('.menu').length > 0){
						$(this).children('span').css('backgroundPosition', '0 0');
						$(this).removeClass('collapsed').addClass('expanded');
					}
				});
			}else{
				$(this).parents('li').each(function(){
					$(this).removeClass('collapsed').addClass('expanded active-trail');
					$(this).children('a:eq(0)').css('color', 'black');
				});

				if($(this).parent('li.force-expanded').children('.menu').length > 0){
					$(this).parent('li.force-expanded').children('span').css('backgroundPosition', '0 0');
				}else{
					$(this).parent('li.force-expanded').parents('li.force-expanded').removeClass('collapsed').addClass('expanded');
					$(this).parent('li.force-expanded').parents('li.force-expanded').children('span').css('backgroundPosition', '0 0');
				}
				
			}
			$(this).addClass('active').css('color', 'black');
		}
		
		/* 	function: collapseMenu()
		 *	Collapse the menu and remove active settings.
		*/
		$.fn.collapseMenu = function(){
			$(this).removeClass('expanded').removeClass('active-trail').addClass('collapsed');
			$(this).children('a').css('color','');

			$(this).children('.menu-arrow-large, .menu-arrow-small').css('backgroundPosition', '-15px -50px');
			if( !($(this).hasClass('force-expanded')) ){
				//$(this).children('.menu-arrow-large, .menu-arrow-small').css('backgroundPosition', '-15px -50px');
				$(this).children('.menu:visible').each(function(){
					var delta = $(this).offset().top;// - $(this).height();
					delta = delta - $('body').scrollTop();
					$(this).slideToggle(TOGGLE_TIME);
					if( (delta < 170) && (gsapp.iscroll == false) ){
						gsapp.menupaneAPI.scrollByY( (-1*$(this).height()), TOGGLE_TIME);
					}

				});
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

		
		/* 	function: redirectFunc()
		 *	Call in the event of an internal redirect
		*/
		$.fn.internalRedirectFunc = function($active, internalRedir){
			$active.collapseBranch();
			var $sel = $(this).expandBranch(internalRedir);
			if( getCurrentState() == 'redirect' ){
				$('.redirect-active').removeClass('redirect-active');
			}
			if($sel.closest('.level-1').length){
				$sel = $sel.closest('.level-1').parent('li').children('a:eq(0)');
			}

			//TODO: need to add > +2 test here
			
			setTimeout(function(){
				gsapp.menupaneAPI.scrollToElement($sel.closest('li.branch'), true, TOGGLE_TIME);
			}, TOGGLE_TIME);
			
			$('#navigation a').css('color', '');
			$('.active-trail').each(function(){
				$('a:eq(0)', this).css('color','black');
			});
			$('#navigation .active-trail:last a').css('color','black');
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
				$(this).internalRedirectFunc($active, internalRedir);
				setCurrentState(1);
			}else{
				if($active != undefined){
					if( $(this).parent('li').hasClass('force-expanded') ){
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
								$active.parent('li').collapseMenu();//this will just turn off the black and classes
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
				$(this).parent('li').addClass('redirect-active');//add it to the list item
				$redir.expandMenus();
				setCurrentState(3);
			}else if( internalRedir != false ){		
				$(this).internalRedirectFunc($active, internalRedir);
				setCurrentState(1);
			}else{
				
				if($active != undefined){
					$active.parent('li').collapseMenu();
				}
				$(this).expandMenu();
				//if( currentState == 'home'){
					$('.redirect-active').removeClass('redirect-active');
					setCurrentState(1);
				//}
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
					$redir.expandMenus();//TODO just added this
				}else{
					$(this).collapseMenuInterval($active, $(this).level() );
					$redir.expandMenus();
				}
				
				$(this).parent('li').addClass('redirect-active');
				setCurrentState(3);
			}else if( internalRedir != false ){
				$active.collapseBranch();
				var $sel = $(this).expandBranch(internalRedir);
				if($active != undefined){
					setTimeout(function(){
						gsapp.menupaneAPI.scrollToElement($sel.closest('li.branch'), true, TOGGLE_TIME);
					}, TOGGLE_TIME);
				}
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
			if( $redir != false ){
				$redir.addClass('active');
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
			//collapse menus
			if($active != undefined){
				var $parent = $(this).parents('ul').filter($active.parents()).first();
				if($parent.length){
					var classes = $parent.attr('class');
					var levelIdx = classes.indexOf('level-') + 6;
					var lev = classes.substring(levelIdx, levelIdx+1);
				}else{//top level branch
					var lev = 0;//default to collapsing all menus above $active
				}
				$(this).collapseMenuInterval($active, lev);
				$active.removeClass('active');
			}

			//check if the branch about to be opened is visible, if not, scroll
			if($(this).closest('li.branch').length){
				var $branch = $(this).closest('li.branch');
				var deleteme = $branch.children('a').attr('href');
			}else{
				var $branch = $(this);
			}

			var navMax = window.innerHeight - 45; //45 is height of CU logo footer
			if($branch.offset().top < 170 || $branch.offset().top > navMax){
				gsapp.menupaneAPI.scrollToElement($branch, true, TOGGLE_TIME);
			}


			var $redir = $(this).digRedirect();
			
			if( $redir != false ){
				$redir.expandMenus();
				$(this).parent('li').addClass('redirect-active');
				setCurrentState(3);
			}else{
				$(this).expandMenus();
				setCurrentState(1);
			}

			//$(this).dig($newActive);
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
		
		
		$.fn._find_proper_branch = function(path){
			var $this,
				$parent, 
				$returnNode,
				returnval = false,
				thisStub = '',
				pathStub = '',
				len = $(this).length;

			$(this).each(function(){
				$this = $(this);
				$parent = $this.closest('li.branch');
				thisStub = $parent.find('a:eq(0)').attr('href');
				thisStub = thisStub.substring(1,5);
				pathStub = path.substring(1,5);
				if(pathStub == thisStub){
					$returnNode = $this;
					returnval = true;
				}

			});

			if(returnval){
				return $returnNode;
			}else{
				return returnval;
			}
		}

		var findMenuItemByURL = function($active, url){
			var $this;
			var $menuLink = $('#navigation #menu').find('a:[href="'+url+'"]');

			if($menuLink.length < 0 || $active == undefined){
				//throw error: internal link not found in menu
				$this = false;
			}else if($menuLink.length == 1){
				$this = $menuLink; //only one menu link found in the #navigation menu, so set it to $this
			}else{// more than one found, so some must be redirects
				$menuLink.each(function(i){
					if( $(this).internalRedirect($active) == false ){
						$this = $(this); //TODO do I need to break here?
					}
				});
			}
			return $this;
		}

		var menuClickFunc = function($this, event, backURL){
			// Prepare
			var
				$active = $('.active'),
				url,
				title,
				fetch = true,
				$menuLink,
				bodyLink = false,
				noMenu = false;

			interclick = true; //because was a click from the site, not the back button

			/*
				If not in navigation menu, then $(this) will not be a menu item that you can treat normally, so you need
				to crawl the menu to find the actual anchor element that corresponds to the internal page link before you can
				do the standard menuClickFunc operation.

				If not in #navigation, then look for .find() in $active where href matches in #nav, else look through whole #nav (redirect)
				else die.
			*/

			if($this != null){
				url = $this.attr('href');
				title = $this.attr('title')||null;

				if($this.closest('#wrapper').length){ //link is in the body text (not the menu)
					bodyLink = true;//only used to distinguish in case 'home'
					$this = findMenuItemByURL($active, url);
				}

				if(event != 'back'){
					// Continue as normal for cmd clicks etc
					if ( event.which == 2 || event.metaKey ) { return true; }
				}
			}else{//browser back button
				url = backURL;
				$this = findMenuItemByURL($active, url);
			}

			
			$('#navigation .menu li.force-expanded a').css('color','');

			$('body.front').removeClass('front').addClass('not-front');
			
			switch(getCurrentState()){
				case 'home':
					if(!noMenu){
						if(bodyLink){//if a link from the dashboard that is internal to the site
							$this.branch();
						}else{
							$this.dig($active);
						}
					}
					break;
				case 'menu':
					if( $this._in_active_branch($active) && $this._is_dig($active) ){
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
					$('.redirect-active').removeClass('redirect-active');
					setCurrentState(1);
					if( $this._is_dig($active) ){//going deeper into the same branch line
						$this.dig($active);
					}else if( ($active != undefined) && $this._is_sibling($active) ){//sibling of the current element
						$this.sibling($active);
					}else if( ($active != undefined) && $this._is_climb($active) ){//same branch but higher up
						if( ( $this.parent('li').hasClass('active-trail') ) && ($this.level() <= $('.redirect-active').level()) ){
							$('.redirect-active').removeClass('redirect-active');
						}
						if(fetch){
							$this.climb($active);
						}
					}else if( ($active != undefined) && ($this._is_force_expanded()) && ($this._is_branch($active)) ){
						$('.redirect-active').removeClass('redirect-active');
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
						setCurrentState(1);
					}else{
						$this.branch($active);
					}
					break;
				default:
					break;
			}

			$this.parents('li').siblings().children('a').css('color','');
			if(!($this.parent('li').hasClass('leaf'))){
				$this.parents('li').siblings('li.force-expanded').children('span').css('backgroundPosition', '-50px -50px');
				$this.parent('li').children('.menu').find('a').css('color', 'black');
			}else{
				$this.parent('li').parents('li').siblings('li.force-expanded').children('span').css('backgroundPosition', '-50px -50px');
			}
				
			if(event != 'back'){
				
				if(fetch == true){
					// Ajaxify this link
					History.pushState(null,title,url);
					event.preventDefault();											
				}
			}	
							
			return false;
		}

		// Ajaxify Helper - binds function to menu clicks that are internal links
		$.fn.ajaxify = function(){	
			//Prepare 
			var $this = $(this);
			// Ajaxify

			//TODO testing only - delete the below
			//$('#navigation').css('backgroundColor', 'darkgray');
			//$(this).find('a:anchor').addClass('yesanchor');

			$(this).find('a:internal:not(#gsapplogo, .term-index-term)').click(function(event){ //exempt GSAPP Logo so it reloads everything
			
				if( ( $(this).hasClass('active') ) || ( $(this).parent('li').hasClass('redirect-active') )){//clicked self
					if( !($(this).parent('li').hasClass('leaf')) && !($(this).parent('li').hasClass('force-expanded') ) ){
						$(this).parent('li').menuToggleVisibility();
						return false;
					}
				}else{
					menuClickFunc($(this), event);
					//$('.redirect-active').removeClass('redirect-active');
					//setCurrentState(1);//override to make sure redirect state gets removed
				}
			});

			$(this).find('a:anchor').click(function(event){ //exempt GSAPP Logo so it reloads everything
				anchorclick = true;
				var hash = $(this).attr('href');
				var offsetY = $(hash).closest('.views-row').position().top;
				

				$('body').scrollTop(offsetY);
				anchorclick = false;

/* TODO: animated scrollTop doesn't work on prod, but does on staging??
				$('body').animate({
			         scrollTop: offsetY
			     }, TOGGLE_TIME);
*/
			});
			
			// Chain
			return $this;
		};
		
		// Ajaxify our Internal Links
		$body.ajaxify();
		
		
		
		
		// Hook into State Changes
		$(window).bind('statechange',function(){	
			if(!anchorclick){
				//used when the user clicks the back button
				var $this;
					
				if(interclick == false){
					menuClickFunc(null, null, window.location.pathname);
				}

				// Prepare Variables
				var
					State = History.getState(),
					url = State.url,
					relativeUrl = url.replace(rootUrl,'');

				//store global header
				var globalHeader = $("#global-header").html();

				// Set Loading
				$body.addClass('loading');

				// Start Fade Out
				// Animating to opacity to 0 still keeps the element's height intact
				// Which prevents that annoying pop bang issue when loading in new content
				if(gsapp.mobile == false){//don't need to fade out for mobile
					$content.animate({opacity:0},200);
				}
				
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
						// necessary for fetched content like tumblr
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
						
						
						//scroll content to the top of the page
						$body.scrollTop(0);
						//$body.animate({ scrollTop: 0 }, 'slow');
						//resize the page to check if room for sidebar
						if(gsapp.mobile == true){
							$content.html(contentHtml).ajaxify().hide();
						}else{
							$content.stop(true,true);
							$content.html(contentHtml).ajaxify().css('opacity',100).show(100); // you could fade in here if you'd like 
							//gsapp.resizeFunc();
						}

						//make global header persistent across pages
						$('#global-header').html( globalHeader );

						// Add the scripts
						$scripts.each(function(){
							var $script = $(this),
								scriptText = $script.text();
						
							if( $('body').hasClass('IE') ){
								var ss = document.createElement('script');
								var scr = scriptText;
								ss.text = scr;
								var hh = document.getElementsByTagName('head')[0];
								hh.appendChild(ss);
							}else{
								var scriptNode = document.createElement('script');
								scriptNode.appendChild(document.createTextNode(scriptText));
								contentNode.appendChild(scriptNode);
							}
						});
		
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
					},
					complete: function(jqXHR, textStatus){

						if(gsapp.mobile == false){
							gsapp.resizeFunc();
						}

						setTimeout(gsapp.initPhotoset, 0);
						$('#fixed-header #region-list .term-list a.term-index-term').bind('click', gsapp.bindRegionCourseBlogIndexFilter);
						$('#fixed-header #program-list .term-list a.term-index-term').bind('click', gsapp.bindProgramCourseBlogIndexFilter);

						if(gsapp.mobile){
							setTimeout(function(){
								gsappMobile.refreshMenuWidth();
								gsappMobile.menuScroll.refresh();
							},0);
							if( $('.tmpltzr-fetched').length <= 0){//no fetched elements
								setTimeout(function(){
									gsappMobile.menuScroll.refresh();
									gsappMobile.contentScroll.refresh();
									$body.removeClass('loading');
								},0);
							}else{
								setTimeout(function(){
									$body.removeClass('loading');
								},1500);
							}
						}else if( gsappMobile.iscrollInit ){
							gsappMobile.menuScroll.destroy();
							gsappMobile.menuScroll = new iScroll('navigation');
							setTimeout(function(){
								gsappMobile.menuScroll.refresh();
							},0);
							
							gsappMobile.contentScroll.destroy();
							gsappMobile.contentScroll = null;
							gsappMobile.contentScroll = new iScroll('wrapper');

							if( $('.tmpltzr-fetched').length <= 0){//no fetched elements
								setTimeout(function(){
									gsappMobile.contentScroll.refresh();
									$body.removeClass('loading');
								},0);
							}else{
								setTimeout(function(){
									$body.removeClass('loading');
								},1500);
							}
						}else{
							$body.removeClass('loading');
						}
						//reset the values of interclick (used to distinguish from back button) and anchorclick for autoscroll anchors
						interclick = false;
						anchorclick = false;
					}
				}); // end ajax
			} // end if(!anchorclick)

		}); // end onStateChange


	}); // end onDomLoad

})(window); // end closure