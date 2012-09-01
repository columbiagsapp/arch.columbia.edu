<div id="node-<?php print $node->nid; ?>" class="tmpltzr-module tmpltzr-module-240 tmpltzr-widget tmpltzr-featuredeventwidget node<?php if ($sticky) { print ' sticky'; } ?><?php if (!$status) { print ' node-unpublished'; } ?><?php if ($color) { print ' '.$color; } ?> clearfix">
	<a id="<?php print $node->title; ?>" name="<?php print $node->title; ?>" class="anchorhash"></a>

  	<?php
		$url = $node->field_json_url[0]['url'];
		print '<div id="eventwidget-output"></div>' .
			'<script type="text/javascript">' .
			'gsappFetcher.getEventWidget("'. $url . '?callback=?","#eventwidget-output");' .
			'</script>';
  	?>

<?php printEditSectionFooter($user->uid, $node->uid, $node->nid, node_url); ?>
</div> <!-- /.node -->

