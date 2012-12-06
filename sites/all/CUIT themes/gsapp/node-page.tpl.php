<div class="entry node <?php print $node_classes; ?>" id="node-<?php print $node->nid; ?>">

	<?php if ($unpublished): ?>
	<div class="unpublished"><?php print t('Unpublished'); ?></div>
	<?php endif; ?>

  <div class="content">
    <?php
		print $node->field_text[0]['value'];
	?>
  </div>
</div> <!-- /node -->