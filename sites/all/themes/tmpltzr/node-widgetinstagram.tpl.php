<?php 
	$terms = taxonomy_node_get_terms_by_vocabulary($node, 9); // vid=9 => color-code
	if(!empty($terms)) {
    	foreach ($terms as $term){
        	$color = $term->name;
        }
    }   

    $small = false;
	if(!empty($node->field_width)){
		if($node->field_width[0]['view'] == 'Small'){
			$small = true;
		}
	}    
?>

<div id="node-<?php print $node->nid; ?>" class="tmpltzr-module<?php if($small){ print ' tmpltzr-module-240'; }else{ print ' tmpltzr-module-500'; }?> tmpltzr-widget tmpltzr-widgetinstagram node<?php if($color){ print ' '.$color; } ?><?php if ($sticky) { print ' sticky'; } ?><?php if (!$status) { print ' node-unpublished'; } ?><?php if ($color) { print ' '.$color; } ?> clearfix">
	<a id="<?php print $node->title; ?>" name="<?php print $node->title; ?>" class="anchorhash"></a>  	


	
	<div class="instagram-image-container"></div>

	<?php
		dsm($node);
		$client_id = $node->field_client_id[0]['view'];
		print '<script type="text/javascript">' .
			'gsappFetcher.getInstagramWidget("'. $client_id . '",".instagram-image-container");' .
			'</script>';
  	?>
		

  	


<?php printEditSectionFooter($user->uid, $node->uid, $node->nid, node_url); ?>
<script>
	$(document).ready(function () {
		
			
	});
</script>
</div> <!-- /.node -->

