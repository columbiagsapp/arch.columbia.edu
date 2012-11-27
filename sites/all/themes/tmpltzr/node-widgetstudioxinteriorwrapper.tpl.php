<?php 
    $small = false;
	if(!empty($node->field_width)){
		if($node->field_width[0]['view'] == 'Small'){
			$small = true;
		}
	}   
?>

<div id="node-<?php print $node->nid; ?>" class="tmpltzr-module<?php if($small){ print ' tmpltzr-module-240'; }else{ print ' tmpltzr-module-500'; }?> tmpltzr-widget tmpltzr-widgetstudioxinteriorcontent node<?php if ($sticky) { print ' sticky'; } ?><?php if (!$status) { print ' node-unpublished'; } ?> clearfix">
	<a id="<?php print $node->title; ?>" name="<?php print $node->title; ?>" class="anchorhash"></a>

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
	  		</div>
	


<?php printEditSectionFooter($user->uid, $node->uid, $node->nid, node_url); ?>

<script>
	$(document).ready(function () {
			/*
		
				var id = 'studiox-widget-slideshow-container-' + <?php print $node->nid; ?>;
				var selector = '#'+id;
				var next = '#'+id+' .tmpltzr-photoset-next';
				var prev = '#'+id+' .tmpltzr-photoset-prev';
				
				$(selector).jCarouselLite({
					btnNext: next,
					btnPrev: prev,
					auto: 0,
					speed: 700,
					circular: true,
					visible: 1.388889,
					scroll: 1
				});
*/
			
	});
</script>


</div> <!-- /.node -->



