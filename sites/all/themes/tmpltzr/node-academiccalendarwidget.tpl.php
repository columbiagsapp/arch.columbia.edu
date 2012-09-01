<div id="node-<?php print $node->nid; ?>" class="tmpltzr-module tmpltzr-module-240 tmpltzr-widget tmpltzr-academiccalendarwidget node<?php if ($sticky) { print ' sticky'; } ?><?php if (!$status) { print ' node-unpublished'; } ?><?php if ($color) { print ' '.$color; } ?> clearfix">
	<a id="<?php print $node->title; ?>" name="<?php print $node->title; ?>" class="anchorhash"></a>
  	
  	<div class="ac-today">
		<?php
			print '<div id="fetched-output"></div>' .
				'<script type="text/javascript">' .
				'gsappFetcher.getTodaysDate("#fetched-output");' .
				'</script>';
		?>
	</div>
	<div>Looking for the<br>ACADEMIC CALENDAR?</div><br>
	<?php print $node->field_cal_link[0]['view']; ?>
	<div>or</div>
	<?php print $node->field_add_cal_link[0]['view']; ?>


<?php printEditSectionFooter($user->uid, $node->uid, $node->nid, node_url); ?>
</div> <!-- /.node -->

