<?php
	$color = '';
	$terms = taxonomy_node_get_terms_by_vocabulary($node, 9); // vid=9 => color-code
	if(!empty($terms)) {
		foreach ($terms as $term){
			$color = $term->name;
		}
	}    
?>





<div id="node-<?php print $node->nid; ?>" class="tmpltzr-module tmpltzr-module-240<?php if($color){ print ' '.$color; } ?> tmpltzr-widget tmpltzr-upcomingeventswidget tmpltzr-fetched node<?php if ($sticky) { print ' sticky'; } ?><?php if (!$status) { print ' node-unpublished'; } ?><?php if ($color) { print ' '.$color; } ?> clearfix">
	<a id="<?php print $node->title; ?>" name="<?php print $node->title; ?>" class="anchorhash"></a>
	<h4 style="text-align:center;margin:0 auto 25px;">Upcoming Events</h4>
  	<?php
		$url = $node->field_json_url[0]['url'];
		print '<div id="upcomingeventswidget-output"></div>' .
			'<script type="text/javascript">' .
			'gsappFetcher.getUpcomingEventsWidget("'. $url . '?callback=?","#upcomingeventswidget-output");' .
			'</script>';
  	?>
  	<h4 style="text-align:center;margin:0 auto;text-transform:none;"><a href="http://events.gsapp.org/" target="_blank">View More</a></h4>

<?php printEditSectionFooter($user->uid, $node->uid, $node->nid, node_url); ?>
</div> <!-- /.node -->

