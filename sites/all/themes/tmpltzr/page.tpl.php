<?php
	/* 
		File:		GSAPP Page template using content generated by templatizer.gsappcloud.org
		v1.0: 		August 14, 2012
		Authors:	jlh2199@columbia.edu, tct2003@columbia.edu
	*/
	
	$browser = null;
	$browser = browscap_get_browser();
	
	$is_mobile = FALSE;
	$mobile_iscroll = FALSE;
	
	// evaluate request URI to force mobile or desktop content
	// used only for ajax requests
	$r_uri = null;
	$r_uri = $_SERVER["REQUEST_URI"];
	$strpos_mobile_true = strpos($r_uri, 'mobile=true');
	$strpos_mobile_false = strpos($r_uri, 'mobile=false');
	
	
	if ($strpos_mobile_false > 0) {
		// force non-mobile theme
		$is_mobile = FALSE;
		$mobile_iscroll = FALSE;
	} else if ($strpos_mobile_true > 0) {
		$is_mobile = TRUE;
		$mobile_iscroll = TRUE;
	} else if ( 
		// run regular browser detection
		($browser['ismobiledevice'] == 1) &&
		((strpos($browser['useragent'], 'iPad') == FALSE))
		// add more clauses here as they come up for new tablets
	) {
			$is_mobile = TRUE;
	} else if(
		// use iScroll for any mobile device, even tablets
		($browser['ismobiledevice'] == 1) &&
		((strpos($browser['useragent'], 'iPad') == TRUE))
		// add more clauses here as they come up for new tablets
	) {
		$mobile_iscroll = TRUE;
	}
?>

<!DOCTYPE html>

<?php if($is_mobile == FALSE){ ?>
<!--[if lt IE 7]> <html class="lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>    <html class="lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>    <html class="lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class=""> <!--<![endif]-->
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
	<?php if($is_mobile === TRUE){ ?>
		<link type="text/css" rel="stylesheet" media="all" href="http://www.columbia.edu/cu/arch/tmpltzr/css/mobile-specific.css">
	<?php }else{ ?>
		<!-- IE Fix for HTML5 Tags -->
		<!--[if lt IE 9]>
			<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->
	<?php }?>
	
	<?php print $scripts; ?>
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.js"></script>
	<script type="text/javascript" src="http://www.columbia.edu/cu/arch/tmpltzr/js/iscroll.js"></script>
	<script type="text/javascript" src="http://www.columbia.edu/cu/arch/tmpltzr/js/jcarousellite_1.0.1.min.js"></script>
	<script type="text/javascript" src="http://www.columbia.edu/cu/arch/tmpltzr/js/jquery.cycle.all.pack.js"></script>
	<script type="text/javascript" src="http://www.columbia.edu/cu/arch/tmpltzr/js/jquery.masonry.min.js"></script>
	<script defer src="http://balupton.github.com/jquery-scrollto/scripts/jquery.scrollto.min.js"></script>
	<script type="text/javascript" src="http://www.columbia.edu/cu/arch/tmpltzr/js/jquery.scrollTo-1.4.2-min.js" defer="defer"></script>	
	<script type="text/javascript" src="http://www.columbia.edu/cu/arch/tmpltzr/js/jquery.jcarousel.min.js"></script>
	<script src="http://www.columbia.edu/cu/arch/tmpltzr/js/html4+html5/jquery.history.js"></script>
	<script type="text/javascript" src="http://www.columbia.edu/cu/arch/tmpltzr/js/fetcher.js"></script>
	<script type="text/javascript" src="http://www.columbia.edu/cu/arch/tmpltzr/js/gsapp.js"></script>
	<script type="text/javascript" src="http://www.columbia.edu/cu/arch/tmpltzr/js/ajaxify-html5.js"></script>
	
	<?php if($is_mobile === TRUE){ ?>
	<script type="text/javascript" src="http://www.columbia.edu/cu/arch/tmpltzr/js/mobile.js"></script>
	<?php } ?>

	<!-- js assets for fonts.com custom font DIN -->
	<script type="text/javascript" src="http://fast.fonts.com/jsapi/83f34eca-2e88-4bbf-b358-062ac880084c.js"></script>
	<!-- css assets for fonts.com custom font NeutraFace -->
	<link href="http://cloud.webtype.com/css/a0868e2c-1109-4f64-8fbc-cd9f837ed961.css" rel="stylesheet" type="text/css">
	
	<!-- IE CSS -->
	<!--[if (gte IE 6)&(lte IE 8)]>
	  <script type="text/javascript" src="selectivizr.js"></script>
	  <noscript><link rel="stylesheet" href="[fallback css]" /></noscript>
	<![endif]-->
	
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

<body class="<?php if($is_mobile === TRUE) { print 'mobile '; }else{ print $browser[browser].' '; } if($mobile_iscroll === TRUE){ print 'iscroll '; }?><?php print $body_classes; print (array_intersect(array('Faculty','TA','Student','Director','Alumni'),$user->roles) ? 'faculty' : ''); ?>?>">
		<?php if($is_mobile === TRUE) { /* mobile theme */?>
			<div id="mobile-header">
				<a href="/">
					<div id="gsapp-logo" class="mobile-header-item">
						<img src="http://www.columbia.edu/cu/arch/tmpltzr/assets/mobile/gsapp-logo_237x49.jpg" width="237" height="49" alt="GSAPP logo" />
					</div>
				</a>
				<a href="http://news.gsapp.org">
					<div id="gsapp-news"  class="mobile-header-item">
						<img src="http://www.columbia.edu/cu/arch/tmpltzr/assets/mobile/gsapp_news_83x81.jpg" width="83" height="81" alt="GSAPP News" />
					</div>
				</a>
				<a href="/mobile-search" target="_self">
					<div id="gsapp-search"  class="mobile-header-item">
						<img src="http://www.columbia.edu/cu/arch/tmpltzr/assets/mobile/search_56x54.jpg" width="56" height="54" alt="Search" />
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
				<div id="tmpltzr">
					<header id="global-header">
						<div></div>
					</header>
					<?php print $content; ?>
				</div>
				<!--endtmpltzr-->
			</div>
			
		<?php }else{ /* tablet using iscroll and non-mobile */?>
			<header id="header">
				<a href="<?php print base_path(); ?>" title="<?php print t('Home'); ?>" id="gsapplogo">
					<img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" />
				</a>
			
				<div id="search-login-container">
					<?php					
						function gsapp_customsearch(&$form_state) {
							$form['searchterm'] = array(
							'#type' => 'textfield',
							'#size' => 27,
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
			<!-- #navigation -->	
			<div id="navigation">
				<div id="menu">
					<?php print menu_tree_output( menu_tree_all_data('primary-links') ); ?>
				</div>
			</div><!-- #navigation -->
			<!-- #content -->
			<div id="wrapper" class="clearfix">
				<div id="content">
					<?php print $messages . $help; ?>
					<!--starttmpltzr-->
					<div id="tmpltzr">
						<header id="global-header">
							<div></div>
						</header>
						<?php print $content; ?>
					</div>
					<!--endtmpltzr-->
					
					<footer id="page-wrapper-footer">
						<div id="copy-paste">
							<h4>Copy-paste the code below into the GSAPP website:</h4>
						</div>
					</footer>
						
					<!-- Footer -->
					<footer id="footer">
						<?php $block_copyr = module_invoke('copyright', 'block', 'view', 7); ?>
						<div id="footer-inner" class="clearfix"><?php print $footer . $block_copyr['content'] ; ?></div>
					</footer><!-- /#footer -->
				</div><!-- /#content -->
			</div><!-- /#wrapper -->
			
		<?php } ?>

<?php print $closure; ?>

</body>
</html>

