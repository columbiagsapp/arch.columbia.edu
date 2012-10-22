<?php
	$terms = taxonomy_node_get_terms_by_vocabulary($node, 9); // vid=9 => color-code
	if(!empty($terms)) {
  	foreach ($terms as $term){
      	$color = $term->name;
      }
  } 

  $scrollFrom = false;
  if(!empty($node->field_scroll_from)){
    if($node->field_width[0]['view'] == 'Yes'){
      $scrollFrom = true;
    }
  }     
?>

<?php 
  $str = preg_replace("'\s+'", '-', $node->title);
?>

<?php if (!$page) { ?>
  <div id="node-<?php print $node->nid; ?>" class="tmpltzr-module tmpltzr-module-500 tmpltzr-primary tmpltzr-primaryfull node<?php if ($sticky) { print ' sticky'; } ?><?php if (!$status) { print ' node-unpublished'; } ?><?php if ($color) { print ' '.$color; } ?> clearfix">
	<a id="<?php print $str; ?>" name="<?php print $node->title; ?>" class="anchorhash"></a>
<?php } ?>
	
	<?php if(!empty($node->field_image[0]['view'])){ ?>
  		<div class="tmpltzr-image">
  			<?php print $node->field_image[0]['view']; ?>
  		</div>
  	<?php } ?>
	

  <?php if(!empty($node->field_title_link)){ ?>
    <h2>
      <?php if(strlen($node->field_title_link[0]['url']) > 0){
        print $node->field_title_link[0]['view'];
      }else if(strlen($node->field_title_link[0]['fragment']) > 0){
        print '<a href="#'.$node->field_title_link[0]['fragment'].'" class="scrollFrom">'.$node->field_title_link[0]['title'].'</a>'; 
      }else{
        print $node->field_title_link[0]['title'];
      } ?>
    </h2>
  <?php } ?>
  	

  	<?php if(!empty($node->field_subtitle[0]['view'])){ ?>
  		<div class="tmpltzr-subtitle">
  			<?php print $node->field_subtitle[0]['view']; ?>
  		</div>
  	<?php } ?>
  	
  	<?php if(!empty($node->field_body[0]['view'])){ ?>
  		<div class="tmpltzr-body">
  			<?php print $node->field_body[0]['view']; ?>
  		</div>
  	<?php } ?>
	
	

<?php printEditSectionFooter($user->uid, $node->uid, $node->nid, node_url); ?>
</div> <!-- /.node -->