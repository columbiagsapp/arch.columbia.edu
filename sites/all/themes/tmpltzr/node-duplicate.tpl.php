	<?php 
    if(!empty($node->field_original[0]['nid'])){
      $viewName = 'Duplicate';
      $display_id = 'page_1';
      print views_embed_view($viewName, $display_id, $node->field_original[0]['nid']);
    }
  ?>

<?php printEditSectionFooter($user->uid, $node->uid, $node->nid, node_url); ?>