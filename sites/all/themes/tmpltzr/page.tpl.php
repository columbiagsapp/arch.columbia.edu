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
	$mobile_version = '';
	
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
		$mobile_version = preg_replace('/[.]/','_',$browser[platform_version]);
	} else if ( 
		// run regular browser detection
		($browser['ismobiledevice'] == 1) &&
		((strpos($browser['useragent'], 'iPad') == FALSE))
		// add more clauses here as they come up for new tablets
	) {
			$is_mobile = TRUE;
			$mobile_iscroll = TRUE;
			$mobile_version = preg_replace('/[.]/','_',$browser[platform_version]);
	} else if(
		// use iScroll for any mobile device, even tablets
		($browser['ismobiledevice'] == 1) &&
		((strpos($browser['useragent'], 'iPad') == TRUE))
		// add more clauses here as they come up for new tablets
	) {
		$mobile_iscroll = TRUE;
		$mobile_version = preg_replace('/[.]/','_',$browser[platform_version]);
	}
?>

<!DOCTYPE html>

<?php if($is_mobile == FALSE){ ?>
<!--[if lt IE 7]> <html class="lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>    <html class="lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>    <html class="lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class=""> <!--<![endif]-->
<?php }else{ ?>
	<html class="">
<?php } ?>

<head>
	<title><?php if($is_mobile === TRUE){ print 'm: '; } print $head_title; ?></title>
	<?php print $head; ?>
	
	<?php if($is_mobile === TRUE){ ?>
	<!-- Set the viewport width to device width for mobile -->
	<meta name="viewport" content="width=device-width" />
	<?php } ?>
	
	<?php print $styles; ?>
	<?php if($is_mobile === TRUE){ ?>
		<link type="text/css" rel="stylesheet" media="all" href="http://www.columbia.edu/cu/arch/tmpltzr/css/mobile.css">
	<?php }else{ ?>
		<link type="text/css" rel="stylesheet" media="all" href="http://www.columbia.edu/cu/arch/tmpltzr/css/html-elements.css">
		<link type="text/css" rel="stylesheet" media="all" href="http://www.columbia.edu/cu/arch/tmpltzr/css/gsapp.css">
		<link type="text/css" rel="stylesheet" media="print" href="http://www.columbia.edu/cu/arch/tmpltzr/css/print.css">
		<!-- IE Fix for HTML5 Tags -->
		<!--[if lt IE 9]>
			<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->
	<?php }?>
	
	<?php print $scripts; ?>
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.js"></script>
	<?php if($mobile_iscroll === TRUE){ ?>
		<script type="text/javascript" src="http://www.columbia.edu/cu/arch/tmpltzr/js/iscroll.js"></script>
	<?php }else{ ?>
		<script type='text/javascript' src="http://www.columbia.edu/cu/arch/tmpltzr/js/jquery.jscrollpane.min.js"></script>
		<script type='text/javascript' src="http://www.columbia.edu/cu/arch/tmpltzr/js/jquery.mousewheel.js"></script>
		<script type="text/javascript" src="http://www.columbia.edu/cu/arch/tmpltzr/js/jquery.masonry.min.js"></script>
	<?php } ?>
	<script type="text/javascript" src="http://www.columbia.edu/cu/arch/tmpltzr/js/jcarousellite_1.0.1.min.js"></script>
	<script src="http://www.columbia.edu/cu/arch/tmpltzr/js/html4+html5/jquery.history.js"></script>
	<script type="text/javascript" src="http://www.columbia.edu/cu/arch/tmpltzr/js/fetcher.js"></script>
	<script type="text/javascript" src="http://www.columbia.edu/cu/arch/tmpltzr/js/gsapp.js"></script>
	<script type="text/javascript" src="http://www.columbia.edu/cu/arch/tmpltzr/js/ajaxify-html5.js"></script>
	
	<?php if($is_mobile === TRUE){ ?>
		<script type="text/javascript" src="http://www.columbia.edu/cu/arch/tmpltzr/js/jquery.touchSwipe.min.js"></script>
	<?php } ?>

	<!-- js assets for fonts.com custom font DIN -->
	<script type="text/javascript" src="http://fast.fonts.com/jsapi/83f34eca-2e88-4bbf-b358-062ac880084c.js"></script>
	
	<!-- js google custom search -->
	<?php if($is_mobile === FALSE){ ?>
		<script>
		  (function() {
			var cx = '004033327063740628517:awygqf_dy3q';
			var gcse = document.createElement('script'); gcse.type = 'text/javascript'; gcse.async = true;
			gcse.src = (document.location.protocol == 'https' ? 'https:' : 'http:') +
				'//www.google.com/cse/cse.js?cx=' + cx;
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(gcse, s);
		  })();
		</script>
	<?php } ?>	
	
	
	
	
	
	
	
	
	
	
	

</head>

<body class="<?php if($is_mobile === TRUE) { print 'mobile '.$browser[platform].' '; }else{ print $browser[browser].' '; } if($mobile_iscroll === TRUE){ print 'version-'.$mobile_version.' iscroll '; }?><?php print $body_classes; print (array_intersect(array('Faculty','TA','Student','Director','Alumni'),$user->roles) ? 'faculty' : ''); ?>?>">
		<?php if($is_mobile === TRUE) { /* mobile theme */?>
			<div id="header">
				<a id="gsapp-logo" href="/">
					<img src="http://www.columbia.edu/cu/arch/tmpltzr/assets/mobile/gsapp-logo_237x49.jpg" width="237" height="49" alt="GSAPP logo" />
				</a>
				
				<a id="gsapp-mobile-search" href="/" target="_self">
					<img src="http://www.columbia.edu/cu/arch/tmpltzr/assets/mobile/search_56x54.jpg" width="56" height="54" alt="Search" />
				</a>
				<div id="gsapp-login"  class="mobile-header-item">
					<?php if (!$user->uid): ?>
							<?php print l("Login", "user/wind"); ?>
						<?php else:?>
							<?php print l("Logout", "logout"); ?>
						<?php endif; ?>
					
				</div>
			</div><!-- /#header -->
			
			<div id="navigation">
				<div id="menu">
					<?php print menu_tree_output( menu_tree_all_data('primary-links') ); ?>
					<div id="menufooter">
						<img id="gradArchLogo" src="http://www.columbia.edu/cu/arch/tmpltzr/assets/gradArch_full.png" />
						<a href="http://www.columbia.edu" target="_blank">
							<img id="CUlogo" src="http://www.columbia.edu/cu/arch/tmpltzr/assets/CUlogo_460_efefef.png" width="190" />
						</a>
					</div>
				</div>
				<div id="menuswitch"><img src="http://www.columbia.edu/cu/arch/tmpltzr/assets/viewmenu.png"/></div>
			</div>
			
			<div id="mobile-search">
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
			</div>

			<div id="wrapper">
				<div id="content">
					<div id="tmpltzr">
						<header id="global-header">
							<div></div>
						</header>
						<?php
							print $content;
						?>
					</div>
				</div>
				<div id="contentswitch"><img src="http://www.columbia.edu/cu/arch/tmpltzr/assets/viewpage.png"/></div>
			</div>
			
		<?php }else{ /* tablet using iscroll and non-mobile */?>
			<header id="header">
				<a href="<?php print base_path(); ?>" title="<?php print t('Home'); ?>" id="gsapplogo">
					<img src="http://www.columbia.edu/cu/arch/tmpltzr/assets/gsapp_logoBLK.png" alt="<?php print t('Home'); ?>" />
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
							<?php print l("Logout", "logout"); ?>
						<?php endif; ?>
					</div>
				</div><!-- #search-login-container -->
			</header>
			<a href="/" id="gsapp-news"></a>
			<!-- #navigation -->	
			<div id="navigation">
				<div id="menu">
					<?php print menu_tree_output( menu_tree_all_data('primary-links') ); ?>
				</div>
			</div><!-- #navigation -->
			<a href="http://www.columbia.edu" title="<?php print t('Columbia University'); ?>" id="columbialogo">
				<img src="http://www.columbia.edu/cu/arch/tmpltzr/assets/columbia_logo.png" alt="<?php print t('Columbia University'); ?>" />
			</a>
			<!-- #content -->
			<div id="wrapper" class="clearfix">
				<div id="content">
					<div id="preloader">Loading...</div>
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
							<h4>Click to generate html for GSAPP website</h4>
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

