<?php 
    $small = false;
	if(!empty($node->field_width)){
		if($node->field_width[0]['view'] == 'Small'){
			$small = true;
		}
	}   

	$autoscroll_time = 4000;
	if(!empty($node->field_autoscroll_time[0])){
		$autoscroll_time = $node->field_autoscroll_time[0]['view'];
	}

	$scroll_speed = 700;
	if(!empty($node->field_scroll_speed[0])){ 
		$scroll_speed = $node->field_scroll_speed[0]['view']; 
	}
?>

<div id="node-<?php print $node->nid; ?>" class="tmpltzr-module<?php if($small){ print ' tmpltzr-module-240'; }else{ print ' tmpltzr-module-500'; }?> tmpltzr-widget tmpltzr-widgetstudioxinteriorcontent node<?php if ($sticky) { print ' sticky'; } ?><?php if (!$status) { print ' node-unpublished'; } ?><?php if(!empty($node->field_autoscroll_time[0]) && !empty($node->field_scroll_speed[0])){ print ' autoscroll-'.$node->field_autoscroll_time[0]['view']. ' scrollspeed-'.$node->field_scroll_speed[0]['view'];} ?> clearfix">
	<a id="<?php print $node->title; ?>" name="<?php print $node->title; ?>" class="anchorhash"></a>

	<div class="studiox-widget-wrapper">
		<div class="studiox-widget-offset">
			<div id="studiox-widget-slideshow-container-<?php print $node->nid; ?>" class="studiox-widget-slideshow-carousel">
	  			<div class="tmpltzr-photoset-prev"></div>
		        <div class="tmpltzr-photoset-next"></div>
	  			<ul class="studiox-widget-slideshow">
	  				<?php 
	  					if(!empty($node->field_ref_interior_content)){
	  						for($i=0;$i<count($node->field_ref_interior_content);$i++){
		  						print '<li class="studiox-widget-slideshow-item item-' . $i . '">';
		  						print $node->field_ref_interior_content[$i]['view'];
								print '</li>';
							}
	  					}
	  				?>
	  				
	  			</ul>
	  		</div><!-- /.studiox-widget-slideshow-carousel -->
	  	</div><!-- /.studiox-widget-offset -->
  	</div><!-- /.studiox-widget-wrapper -->
	


<?php printEditSectionFooter($user->uid, $node->uid, $node->nid, node_url); ?>

<script>
	$(document).ready(function () {
			
		
		var id = 'studiox-widget-slideshow-container-' + <?php print $node->nid; ?>;
		var selector = '#'+id;
		var next = '#'+id+' .tmpltzr-photoset-next';
		var prev = '#'+id+' .tmpltzr-photoset-prev';
		
		$(selector).jCarouselLite({
			btnNext: next,
			btnPrev: prev,
			auto: <?php print $autoscroll_time; ?>,
			speed: <?php print $scroll_speed; ?>,
			circular: true,
			visible: 3,
			scroll: 1,
			start: -1
		});

			
	});
</script>


</div> <!-- /.node -->



