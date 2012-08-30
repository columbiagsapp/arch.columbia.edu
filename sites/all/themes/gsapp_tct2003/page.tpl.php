<?php
	/* 
		File:		GSAPP Page template using content generated by templatizer.gsappcloud.org
		v1.0: 		August 14, 2012
		Authors:	jlh2199@columbia.edu, tct2003@columbia.edu
	*/
	
	$browser = null;
	$browser = browscap_get_browser();
	$is_mobile = FALSE;
	
	// evaluate request URI to force mobile or desktop content
	// used only for ajax requests
	$r_uri = null;
	$r_uri = $_SERVER["REQUEST_URI"];
	$strpos_mobile_true = strpos($r_uri, 'mobile=true');
	$strpos_mobile_false = strpos($r_uri, 'mobile=false');
	
	
	if ($strpos_mobile_false > 0) {
		// force non-mobile theme
		$is_mobile = FALSE;
	} else if ($strpos_mobile_true > 0) {
		$is_mobile = TRUE;
	} else if ( 
		// run regular browser detection
		($browser['ismobiledevice'] == 1) &&
		((strpos($browser['useragent'], 'iPad') == FALSE))
		// add more clauses here as they come up for new tablets
	) {
			$is_mobile = TRUE;
	}
?>

<!DOCTYPE html>

<?php if($is_mobile == FALSE){ ?>
<!--[if lt IE 7]> <html class="ie6 ie" lang="<?php print $language->language; ?>" dir="<?php print $language->dir; ?>"> <![endif]-->
<!--[if IE 7]>    <html class="ie7 ie" lang="<?php print $language->language; ?>" dir="<?php print $language->dir; ?>"> <![endif]-->
<!--[if IE 8]>    <html class="ie8 ie" lang="<?php print $language->language; ?>" dir="<?php print $language->dir; ?>"> <![endif]-->
<!--[if gt IE 8]> <!--> <html class="" lang="<?php print $language->language; ?>" dir="<?php print $language->dir; ?>" xml:lang="<?php print $language->language; ?>"> <!--<![endif]-->
<?php }else{ ?>
<html class="" lang="<?php print $language->language; ?>" dir="<?php print $language->dir; ?>" xml:lang="<?php print $language->language; ?>">
<?php } ?>

<head>
	<title><?php if($is_mobile === TRUE){ print 'm: '; } print $head_title; ?></title>
	<?php print $head; ?>
	
	
	
	<?php if($is_mobile === TRUE){ ?>
	<!-- Set the viewport width to device width for mobile -->
	<meta name="viewport" content="width=device-width" />
	<?php } ?>
	
	<?php print $styles; ?>
	<link type="text/css" rel="stylesheet" media="all" href="http://www.columbia.edu/cu/arch/tmpltzr/css/html-elements.css">
	<link type="text/css" rel="stylesheet" media="all" href="http://www.columbia.edu/cu/arch/tmpltzr/css/gsapp.css">
	<link type="text/css" rel="stylesheet" media="print" href="http://www.columbia.edu/cu/arch/tmpltzr/css/print.css">
	
	<?php if($is_mobile == FALSE){ ?>
		<!--[if IE]>
		  <link rel="stylesheet" href="http://www.columbia.edu/cu/arch/tmpltzr/css/ie.css" type="text/css">
		<![endif]-->
		
		<!--[if IE 6]>
		  <link rel="stylesheet" href="http://www.columbia.edu/cu/arch/tmpltzr/css/ie6.css" type="text/css">
		<![endif]-->
	
		<!-- IE Fix for HTML5 Tags -->
		<!--[if lt IE 9]>
			<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->
	<?php } ?>
	
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.js"></script>
	<script type="text/javascript" src="http://www.columbia.edu/cu/arch/tmpltzr/js/gsapp.js"></script>
	<script type="text/javascript" src="http://www.columbia.edu/cu/arch/tmpltzr/js/fetcher.js"></script>
	<script type="text/javascript" src="http://www.columbia.edu/cu/arch/tmpltzr/js/jquery.cycle.all.pack.js"></script>
	<script type="text/javascript" src="http://www.columbia.edu/cu/arch/tmpltzr/js/jquery.masonry.min.js"></script>
	<script defer src="http://balupton.github.com/jquery-scrollto/scripts/jquery.scrollto.min.js"></script>
	<script type="text/javascript" src="http://www.columbia.edu/cu/arch/tmpltzr/js/jquery.jcarousel.min.js"></script>
	<script src="http://www.columbia.edu/cu/arch/tmpltzr/js/html4+html5/jquery.history.js"></script>
	<script type="text/javascript" src="http://www.columbia.edu/cu/arch/tmpltzr/js/ajaxify-html5.js"></script>

	<?php if($is_mobile === TRUE){ ?>
	<script type="text/javascript" src="/sites/all/themes/tmpltzr/js/mobile.js"></script>
	<?php } ?>

	<!-- js assets for fonts.com custom font DIN -->
	<script type="text/javascript" src="http://fast.fonts.com/jsapi/83f34eca-2e88-4bbf-b358-062ac880084c.js"></script>
	
	<!-- js google custom search -->
	<script>
	  (function() {
		var cx = '004033327063740628517:awygqf_dy3q';
		var gcse = document.createElement('script'); gcse.type = 'text/javascript'; gcse.async = true;
		gcse.src = (document.location.protocol == 'https' ? 'https:' : 'http:') +
			'//www.google.com/cse/cse.js?cx=' + cx;
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(gcse, s);
	  })();
	</script>	
	

</head>

<body class="<?php if($is_mobile === TRUE) { print 'mobile '; }?><?php print $body_classes;?>">

	<!-- .wrapper -->
	<div class="<?php if($is_mobile === TRUE){ print 'mobile-wrapper '; }else{ print 'wrapper '; } print (array_intersect(array('Faculty','TA','Student','Director','Alumni'),$user->roles) ? 'faculty' : ''); ?>">
		<?php if($is_mobile === TRUE) { /* mobile theme */?>
			<div id="mobile-header">
				<a href="/">
					<div id="gsapp-logo" class="mobile-header-item">
						<img src="/sites/all/themes/tmpltzr/assets/mobile/gsapp-logo_237x49.jpg" width="237" height="49" alt="GSAPP logo" />
					</div>
				</a>
				<a href="http://news.gsapp.org">
					<div id="gsapp-news"  class="mobile-header-item">
						<img src="/sites/all/themes/tmpltzr/assets/mobile/gsapp_news_83x81.jpg" width="83" height="81" alt="GSAPP News" />
					</div>
				</a>
				<a href="/mobile-search" target="_self">
					<div id="gsapp-search"  class="mobile-header-item">
						<img src="/sites/all/themes/tmpltzr/assets/mobile/search_56x54.jpg" width="56" height="54" alt="Search" />
					</div>
				</a>
				<div id="gsapp-login"  class="mobile-header-item">
					<?php if (!$user->uid): ?>
						<?php print l("Login", "user/wind"); ?>
					<?php else:?>
						<?php print l("Logout", "logout"); ?>
					<?php endif; ?>
				</div>
			</div>
			<div id="mobile-menu">
				<?php print menu_tree_output( menu_tree_all_data('primary-links') ); ?>
			</div>
			
			<div id="mobile-switch-bar">
				<div>
					<div class="arrow">.</div>
					<div class="view-page">.</div>
					<div class="arrow">.</div>
				</div>
			</div>
			<div id="mobile-content">
				<?php print $content; ?>
			</div>
			
		<?php }else{ /* non mobile theme */?>
			<!-- #menu -->
			<section id="menu">
				<header id="header">
					<a href="<?php print base_path(); ?>" title="<?php print t('Home'); ?>" id="gsapplogo">
						<img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" />
					</a>
				
					<div id="search-login-container">
						<?php					
							function gsapp_customsearch(&$form_state) {
								$form['searchterm'] = array(
								'#type' => 'textfield',
								'#size' => 33,
								'#maxlength' => 64,
							  );  
							  $form['submit'] = array('#type' => 'submit', '#value' => t(''));
							  return $form;
							}
							
							function gsapp_customsearch_submit($form, &$form_state) {
								$search_term = $form_state['values']['searchterm'];
								$form_state['redirect'] = array(
									'/search/', 
									'searchterm=' . $search_term);
							}
							
							$search_form = drupal_get_form('gsapp_customsearch');
							print $search_form;
						?>
						
						<div id="login">
							<?php if (!$user->uid): ?>
								<?php print l("Login", "user/wind"); ?>
							<?php else:?>
								<?php print l("My Content", "my-content"); ?>
							<?php endif; ?>
						</div>
					</div><!-- #search-login-container -->
				</header>
				
				<a href="http://news.gsapp.org" id="gsapp-news"></a>
				
				<nav id="navigation">
					<?php print menu_tree_output( menu_tree_all_data('primary-links') ); ?>
				</nav><!-- #navigation -->
	  
			</section><!-- #menu -->

			<!-- #content -->
			<section id="content" class="clearfix">
				<?php print $messages . $help; ?>
				<?php print $content; ?>
					
				<!-- Footer -->
				<footer id="footer">
					<?php $block_copyr = module_invoke('copyright', 'block', 'view', 7); ?>
					<div id="footer-inner" class="clearfix"><?php print $footer . $block_copyr['content'] ; ?></div>
				</footer><!-- /#footer -->
			</section><!-- /#content -->
		<?php } ?>
	</div><!-- .wrapper -->

<?php print $closure; ?>

</body>
</html>
