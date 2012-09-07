<?php //wrapper div with Page Wrapper color code based on color-code taxonomy
	$terms = taxonomy_node_get_terms_by_vocabulary($node, 10); // vid=10 => program
		if(!empty($terms)) {
			$program = '';
			foreach ($terms as $term){
				$cleanTerm = str_replace(" ", "-", $term->name);
				$cleanTerm = str_replace("/", "", $cleanTerm);
				$program = $program.' '.$cleanTerm;
			}
		} 
?>

<?php //wrapper div with Page Wrapper color code based on color-code taxonomy
	$regions = taxonomy_node_get_terms_by_vocabulary($node, 12); // vid=10 => program
		if(!empty($regions)) {
			$region = '';
			foreach ($regions as $reg){
				$replace = str_replace(" ", "-", $reg->name);
				$replace = strtolower($replace);
				$region = $region.' '.$replace;
			}
		} 
?>

<?php if(!empty($node->field_external_link[0]['view'])){ ?>
		<a class="term-index-term unselected<?php if($program){ print $program; } ?><?php if($region){ print $region; } ?>" href="<?php print $node->field_external_link[0]['url']; ?>" title="<?php print $node->field_external_link[0]['title']; ?>" target="_blank">
			<?php //wrapper div with Page Wrapper color code based on color-code taxonomy
				$terms = taxonomy_node_get_terms_by_vocabulary($node, 11); // vid=9 => color-code
					if(!empty($terms)) {
						foreach ($terms as $term){
							print $term->name . ' ';
						}
					} 
				print $node->field_external_link[0]['title'];
			?>
		</a>
<?php } ?>
	


