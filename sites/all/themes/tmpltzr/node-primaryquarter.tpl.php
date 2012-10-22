<?php
	$terms = taxonomy_node_get_terms_by_vocabulary($node, 9); // vid=9 => color-code
		if(!empty($terms)) {
        	foreach ($terms as $term){
            	$color = $term->name;
            }
        }      
?>

<?php 
  $str = preg_replace("'\s+'", '-', $node->title);
?>

<?php if (!$page){ ?>
  <div id="node-<?php print $node->nid; ?>" class="tmpltzr-module tmpltzr-module-240 tmpltzr-primary tmpltzr-primaryquarter node<?php if ($sticky) { print ' sticky'; } ?><?php if (!$status) { print ' node-unpublished'; } ?><?php if ($color) { print ' '.$color; } ?> clearfix">
	<a id="<?php print $str; ?>" name="<?php print $node->title; ?>" class="anchorhash"></a>
<?php } ?>
	

	
	<?php if(!empty($node->field_quarter_image[0]['view'])){ ?>
  		<div class="tmpltzr-image">
  			<?php print $node->field_quarter_image[0]['view']; ?>
  		</div>
  	<?php } ?>
	
	<div class="tmpltzr-title-container">

    <?php
      $link = '';
      $fragment = '';

      if(!empty($node->field_link[0]['url'])){ 
        $link = $node->field_link[0]['url']; 
      }else if(!empty($node->field_link[0]['fragment'])){ 
        $fragment = $node->field_link[0]['fragment']; 
      }

      $uni = '';
      if(!empty($node->field_columbia_uni[0]['view'])){ 
        $uni = $node->field_columbia_uni[0]['view']; 
      }
    ?>

	<?php if(!empty($node->field_title[0]['view'])){ ?>
  		<h2>
        <?php
          if(strlen($link) > 0){
            print '<a href="'.$link.'" target="_self">'.$node->field_title[0]['view'].'</a>';
          }else if(strlen($fragment) > 0){
            print '<a href="#'.$fragment.'" target="_self">'.$node->field_title[0]['view'].'</a>';
          }else if(strlen($uni) > 0){
            print '<a href="/about/people/'.$uni.'columbiaedu" target="_self">'.$node->field_title[0]['view'].'</a>';
          }else{
            print $node->field_title[0]['view'];
          }
        ?>
  		</h2>
  	<?php } ?>
  	

  	<?php if(!empty($node->field_subtitle[0]['view'])){ ?>
  		<div class="tmpltzr-subtitle">
  			<?php print $node->field_subtitle[0]['view']; ?>
  		</div>
  	<?php } ?>
  	</div><!-- .tmpltzr-title-container -->
  	
  	
  	<?php if(!empty($node->field_body[0]['view'])){ ?>

  		<div class="tmpltzr-body">
  			<?php print $node->field_body[0]['view']; ?>
  		</div>
  	<?php } ?>
	
	

<?php printEditSectionFooter($user->uid, $node->uid, $node->nid, node_url); ?>
</div> <!-- /.node -->
