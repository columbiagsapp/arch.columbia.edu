<?php 
    $small = false;
	if(!empty($node->field_width)){
		if($node->field_width[0]['view'] == 'Small'){
			$small = true;
		}
	}    
?>

<div id="node-<?php print $node->nid; ?>" class="tmpltzr-module<?php if($small){ print ' tmpltzr-module-240'; }else{ print ' tmpltzr-module-500'; }?> tmpltzr-widget tmpltzr-widgetinstagram node<?php if($color){ print ' '.$color; } ?><?php if ($sticky) { print ' sticky'; } ?><?php if (!$status) { print ' node-unpublished'; } ?><?php if ($color) { print ' '.$color; } ?> clearfix">
	<a id="<?php print $node->title; ?>" name="<?php print $node->title; ?>" class="anchorhash"></a>  	


	<script src="http://www.columbia.edu/cu/arch/prod/tmpltzr/js/moment.min.js"></script>
	<div class="instagram-image-container"></div>

	<?php
		$endpoint = $node->field_instagram_endpoint[0]['view'];
		print '<script type="text/javascript">' .
			'gsappFetcher.getInstagramKinne("'. $endpoint . '",".instagram-image-container");' .
			'</script>';
  	?>
		

  	


<?php printEditSectionFooter($user->uid, $node->uid, $node->nid, node_url); ?>
<script>
	$(document).ready(function () {
		
			
	});
</script>
</div> <!-- /.node -->

