<div class="node <?php print $node_classes; ?>" id="node-<?php print $node->nid; ?>">

  <?php if (!$page): ?>
    <h2 class="title">
      <a href="<?php print $node_url; ?>"><?php print $title; ?></a>
    </h2>
  <?php else: ?>
    <h2>
      <?php print $title; ?>
    </h2>
  <?php endif; ?>

  <?php if ($unpublished): ?>
    <div class="unpublished"><?php print t('Unpublished'); ?></div>
  <?php endif; ?>

  
  <div class="content">
    <?php 
    print $node->field_job_title[0]["value"].", ".$node->field_affiliation[0]["value"];
    print $node->field_text[0]["value"];
    ?>
  </div>
  
</div> <!-- /node -->
