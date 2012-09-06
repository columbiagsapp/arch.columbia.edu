<?php printEditPageHeader($user->uid, $node->uid, $node->nid, $node_url); ?>




<?php 
	$color = array();
    $terms = taxonomy_node_get_terms_by_vocabulary($node, 9); // vid=9 => color-code
		if(!empty($terms)) {
        	foreach ($terms as $term){
            	$color[] = $term->name;
            }
        } else {
            $color[] = 'none';
        }          
?>


<?php 
	$pg = array(); //array to store all the programs this course might belong to
    $programs = taxonomy_node_get_terms_by_vocabulary($node, 10); // vid=10 => program
		if(!empty($programs)) {
        	foreach ($programs as $program){
            	$pg[] = $program->name;
            }
        }         
?>

<?php 
	$sm = array(); //array to store all the programs this course might belong to
    $semesters = taxonomy_node_get_terms_by_vocabulary($node, 2); // vid=2 => semester
		if(!empty($semesters)) {
        	foreach ($semesters as $semester){
            	$sm[] = $semester->name;
            }
        }      
           
?>
	


	<?php if(!empty($node->field_image[0]['view'])){ ?>
  		<div class="tmpltzr-image">
  			<?php print $node->field_image[0]['view']; ?>
  		</div>
  	<?php } ?>
  	
	<?php if(!empty($node->field_page_title[0]['view'])){ ?>
		<div class="title-container">
			<h1><?php print $node->field_page_title[0]['view']; ?></h1>
		</div>
	<?php } ?>

	<div id="main">
	<?php
	/*
		Use the "Page" view to pull in all the modules associated with this page
	*/
		$viewName = 'course_listing_wrapper';
		$display_id = 'page_1';
		print views_embed_view($viewName, $display_id, $pg[0], $sm[0]);
	?>
	</div>
	<div id="right-sidebar"></div>

</div>




