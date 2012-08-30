<div class="entry node <?php print $node_classes; ?>" id="node-<?php print $node->nid; ?>">
	<?php if(user_access('edit any page content')): ?>
		<div class='views-field-edit-node'>
			<span class="field-content">
				<?php print l('Edit','node/'.$node->nid.'/edit?destination='.$_GET['q']);?>
			</span>
		</div>
	<?php endif; ?>

	<?php if ($unpublished): ?>
	<div class="unpublished"><?php print t('Unpublished'); ?></div>
	<?php endif; ?>

  <div class="content">
    <?php
		print $node->field_text[0]['value'];
	?>
  </div>
</div> <!-- /node -->