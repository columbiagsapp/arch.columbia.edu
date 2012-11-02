<?php printEditPageHeader($user->uid, $node->uid, $node->nid, $node_url); ?>

<div id="fixed-header" class="course-blog-listing-page">
	<h1><?php print $title; ?></h1>



<?php 
	function applyRegionClass($term){
		switch($term){
			case 'Africa':
				return 'africa';
				break;
			case 'North America':
				return 'north-america';
				break;
			case 'Latin America':
				return 'latin-america';
				break;
			case 'Europe':
				return 'europe';
				break;
			case 'Middle East':
				return 'middle-east';
				break;
			case 'South Asia':
				return 'south-asia';
				break;
			case 'Asia':
				return 'asia';
				break;
			case 'Other':
				return 'other';
				break;
			default:
				return 'none';
				break;
			
		}
	}

	$semesters = taxonomy_node_get_terms_by_vocabulary($node, 14); // vid=14 => Year and Semester
	foreach ($semesters as $semester){
		if(!empty($semester)) {
			$start = strlen($semester->name) - 4;
			$year = substr($semester->name , $start);
			$term = substr($semester->name , 0, $start - 1);

			if($term == 'Fall'){
				$semesterArray[$year][0] = $term;
			}elseif($term == 'Summer'){
				$semesterArray[$year][1] = $term;
			}elseif($term == 'Spring'){
				$semesterArray[$year][2] = $term;
			}
		}
	}
	krsort($semesterArray);//key sort: invert the order by key so that the most recent year comes first

?>

	<div id="program-list">	
		<h4>By Program:</h4>
		<ul class="term-list">
			<?php //list of Programs
	    		$terms = taxonomy_get_tree(10); // vid=10 => program
				if(!empty($terms)) {
        			foreach ($terms as $term){
        				$cleanTerm = str_replace(" ", "-", $term->name);
            			$cleanTerm = str_replace("/", "", $cleanTerm);
            			print '<li><a class="term-index-term" id="' .$cleanTerm. '">' . $term->name . '</a></li>';
  		          	}
    	    	}       
			?>
			
		</ul><!-- .term-list -->
	</div><!-- #program-list -->
	<div id="region-list">	
		<h4>By Region:</h4>
		<ul class="term-list">
			<?php //list of Programs
	    		$terms = taxonomy_get_tree(12); // vid=12 => region
				if(!empty($terms)) {
        			foreach ($terms as $term){
            			print '<li><a class="term-index-term ' . applyRegionClass($term->name) .'" id="'.applyRegionClass($term->name).'">' . $term->name . '</a></li>';
  		          	}
    	    	}else{
    	    		print '<li>No terms</li>';
    	    	}    
			?>
			
		</ul><!-- .term-list -->
		<div id="x-affiliation"><span class="x-affiliated">X</span>Studio-X Affiliation</div>
	</div><!-- #region-list -->

<?php /*
	<div id="semester-list">
		<h4>Semester:</h4>
		<ul class="term-list">
			<?php 
				foreach($semesterArray as $semYear => $sem){
					foreach($sem as $semTerm){
						print '<li><a class="term-index-term" href="#'.$semTerm.'-'.$semYear.'">' . $semTerm . ' ' . $semYear . '</a></li>';

					}
				}
			?>
		</ul><!-- .term-list -->
	</div><!-- /#semester-list -->

	*/ ?>
	
	
	
	
	
	
</div><!-- #fixed-header -->
	





<div id="course-blogs-index-listing">
	<?php
	foreach($semesterArray as $semYear => $sem){
		foreach($sem as $semTerm){
			print '<h4 id="'.$semTerm."-".$semYear.'">'.$semTerm." ".$semYear.'</h4>';
			print '<div class="two-col-list">' . views_embed_view('courseblogs', 'page_1', $semYear, $semTerm) . '</div>';
			print '<div class="three-col-list">' . views_embed_view('courseblogs', 'page_2', $semYear, $semTerm) . '</div>';
		}
	}

	?>
	
</div>






