<?php
	$color = '';
	$terms = taxonomy_node_get_terms_by_vocabulary($node, 9); // vid=9 => color-code
	if(!empty($terms)) {
		foreach ($terms as $term){
			$color = $term->name;
		}
	}    

?>

<div id="node-<?php print $node->nid; ?>" class="tmpltzr-module tmpltzr-module-240 tmpltzr-widget tmpltzr-ccwidget tmpltzr-fetched node<?php if($color){ print ' '.$color; } ?><?php if ($sticky) { print ' sticky'; } ?><?php if (!$status) { print ' node-unpublished'; } ?><?php if ($color) { print ' '.$color; } ?> clearfix">
	<a id="<?php print $node->title; ?>" name="<?php print $node->title; ?>" class="anchorhash"></a>
  	
	<?php
		$url = $node->field_json_url[0]['url'];
		print '<div id="cc-output"></div>' .
			'<script type="text/javascript">' .
			'gsappFetcher.getCCWidget("'. $url . '?callback=?","#cc-output");' .
			'</script>';
	?>



<?php printEditSectionFooter($user->uid, $node->uid, $node->nid, node_url); ?>
</div> <!-- /.node -->

