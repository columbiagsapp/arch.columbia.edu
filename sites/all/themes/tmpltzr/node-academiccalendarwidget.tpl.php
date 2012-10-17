<div id="node-<?php print $node->nid; ?>" class="tmpltzr-module tmpltzr-module-240 tmpltzr-widget tmpltzr-academiccalendarwidget node<?php if ($sticky) { print ' sticky'; } ?><?php if (!$status) { print ' node-unpublished'; } ?><?php if ($color) { print ' '.$color; } ?> clearfix">
	<a id="<?php print $node->title; ?>" name="<?php print $node->title; ?>" class="anchorhash"></a>
  	
  	<div class="ac-today">
		<?php
			print '<div id="acal-output"></div>' .
				'<script type="text/javascript">' .
				'gsappFetcher.getTodaysDate("#acal-output");' .
				'</script>';
		?>
	</div>
	<div>Looking for the<br>ACADEMIC CALENDAR?</div><br>
	<a href="<?php print $node->field_cal_link[0]['url']; ?>" target="_self">View it here</a>
	<div>or</div>
	<a href="<?php print $node->field_add_cal_link[0]['url']; ?>" target="_self">Subscribe on Google</a>


<?php printEditSectionFooter($user->uid, $node->uid, $node->nid, node_url); ?>
</div> <!-- /.node -->

