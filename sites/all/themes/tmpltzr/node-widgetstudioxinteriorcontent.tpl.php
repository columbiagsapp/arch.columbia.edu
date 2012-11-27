<?php 
    $lab = false;
	if(!empty($node->field_x_or_lab)){
		if($node->field_x_or_lab[0]['view'] == 'Lab'){
			$lab = true;
		}
	}   
?>

<div id="node-<?php print $node->nid; ?>" class="tmpltzr-widgetstudioxinteriorcontent">
	<?php	
		if(!empty($node->field_studiox_city[0])){
			$city = $node->field_studiox_city[0]['view'];
			$city_clean = str_replace(' ', '-', $city);
			$city_clean = strtolower($city_clean);
		}	
		/*			
		

		function gsapp_customsearch(&$form_state) {
			$form['searchterm'] = array(
			'#type' => 'textfield',
			'#size' => 33,
			'#maxlength' => 64,
			'#default_value' => t($city),
			'#prefix' => '<div id="search-form-wrapper">',
			'#suffix' => '</div>',
		  );  
		  $form['submit'] = array('#type' => 'submit', '#value' => t($city));//do i need a submit button??
		  return $form;
		}
		
		function gsapp_customsearch_submit($form, &$form_state) {
			$search_term = $form_state['values']['searchterm'];
			$form_state['redirect'] = array(
				'/search/', 
				'searchterm=' . $search_term);
		}
		
		$search_form = drupal_get_form('gsapp_customsearch');
		print $search_form;
		*/
		klqdckkljdclvkjvc
	?>
	
  	<a class="defuse <?php print $city_clean; ?>" id="studiox-search-<?php print $city_clean; ?>" href="<?php if(!empty($node->field_link[0]['url'])){ print $node->field_link[0]['url']; }else{ print '#'; } ?>">

  		<div class="image">
  			<?php 
  				if(!empty($node->field_image[0])){
  					print $node->field_image[0]['view'];
  				}
  			?>
  		</div><!-- /.image -->
  	
  		<div class="bottom-container">
  			<div class="city-name">
  				<?php if($lab){
  					print '<span class="border-bottom">' . $city . ' Lab</span>';
  				}else{
  					print '<span class="border-bottom">Studio-X ' . $city . '</span>';
  				} ?>
  			</div><!-- /.city-name -->
  			<div class="city-time">
  			</div><!-- /.city-time -->
  		</div><!-- /.bottom-container -->
	
  	</a><!-- #studiox-search-city -->


<?php printEditSectionFooter($user->uid, $node->uid, $node->nid, node_url); ?>
</div> <!-- /.node -->

