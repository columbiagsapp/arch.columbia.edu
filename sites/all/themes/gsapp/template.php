<?php
// $Id: template.php,v 1.16 2007/10/11 09:51:29 goba Exp $


/**
 * Implementation of HOOK_theme().
 */
function gsapp_theme(&$existing, $type, $theme, $path) {
  return zen_theme($existing, $type, $theme, $path);
}

function gsapp_preprocess(&$vars, $hook){
	global $user;
	if($hook == 'node'){
	  if ($vars['page'] == TRUE) {
		if (isset($vars['field_require_wind'])) { 
		  if ($vars['field_require_wind'][0]['value'] == 1) { /* WIND-required pages */
			if (!$user->uid) {
			  drupal_goto("user/wind", "wind_destination_path=node/". $vars['nid']);
			}
		  }
		}
	  }
	}
}



function gsapp_preprocess_page(&$vars, $hook) {
  global $user,$base_url, $includes_dir;

  $vars['includes_dir'] = $includes_dir;

  
  if($_SESSION['main_filter'])
  {
  	$vars['main_filter_title'] = (taxonomy_get_term($_SESSION['main_filter'])->name);
  }
  /* tct2003: NOT SURE WE NEED THIS, BUT I DON'T KNOW WHAT MAIN_FILTER IS */
 if(arg(0)== 'user' && arg(2) == 'edit')
  {
  	 $user_profile = user_load(arg(1));
	  if(!empty($user_profile->profile_name)){
	  	$vars['title'] = $user_profile->profile_name;
	  }
  }
  
  /* tct2003: NOT SURE WE NEED THIS, BUT I DON'T KNOW WHAT IT IS */
  if($user->uid){
  	drupal_set_header('Expires: Thu, 01 Dec 1994 16:00:00 GMT');
  }

}


function gsapp_preprocess_node(&$vars, $hook) {
}



function gsapp_preprocess_views_view(&$variables) {
	$variables['view']->is_cacheable = 0;
}



/**
 * Return a themed form element.
 *
 * @param element
 *   An associative array containing the properties of the element.
 *   Properties used: title, description, id, required
 * @param $value
 *   The form element's data.
 * @return
 *   A string representing the form element.
 *
 * @ingroup themeable
 */
function gsapp_form_element($element, $value) {
  // This is also used in the installer, pre-database setup.
  $t = get_t();


  $output = '<div class="form-item"';
  if (!empty($element['#id'])) {
    $output .= ' id="'. $element['#id'] .'-wrapper"';
  }
  $output .= ">\n";
  $required = !empty($element['#required']) ? '<span class="form-required" title="'. $t('This field is required.') .'">*</span>' : '';
  if(is_array($element['#options']))
  {
  	$option_keys = array_keys($element['#options']);
  }

  if (!empty($element['#title'])) {
    $title = $element['#title'];
    if (!empty($element['#id'])) {
      $output .= ' <label for="'. $element['#id'] .'">'. $t('!title: !required', array('!title' => filter_xss_admin($title), '!required' => $required)) ."</label>\n";
    }
    elseif (!empty($element['inline']['keys']['#id'])) {
      $output .= ' <label for="'. $element['inline']['keys']['#id'] .'">'. $t('!title: !required', array('!title' => filter_xss_admin($title), '!required' => $required)) ."</label>\n";
    }
    elseif (!empty($element[$option_keys[0]]['#id'])) {
      $output .= ' <label for="'. $element[$option_keys[0]]['#id'] .'">'. $t('!title: !required', array('!title' => filter_xss_admin($title), '!required' => $required)) ."</label>\n";
    }
    else {
      $output .= ' <label for="test">'. $t('!title: !required', array('!title' => filter_xss_admin($title), '!required' => $required)) ."</label>\n";
    }
  }

  $output .= " $value\n";

  if (!empty($element['#description'])) {
    $output .= ' <div class="description">'. $element['#description'] ."</div>\n";
  }

  $output .= "</div>\n";

  return $output;
}








function gsapp_username($object) {

  if($object->profile_name)
  {
  	$object->name = $object->profile_name;
  }

  if ($object->uid && $object->name) {
    // Shorten the name when it is too long or it will break many tables.
    if (drupal_strlen($object->name) > 20) {
      $name = drupal_substr($object->name, 0, 15) .'...';
    }
    else {
      $name = $object->name;
    }

    if (user_access('access user profiles')) {
      $output = l($name, 'user/'. $object->uid, array('attributes' => array('title' => t('View user profile.'))));
    }
    else {
      $output = check_plain($name);
    }
  }
  else if ($object->name) {
    // Sometimes modules display content composed by people who are
    // not registered members of the site (e.g. mailing list or news
    // aggregator modules). This clause enables modules to display
    // the true author of the content.
    if (!empty($object->homepage)) {
      $output = l($object->name, $object->homepage, array('attributes' => array('rel' => 'nofollow')));
    }
    else {
      $output = check_plain($object->name);
    }

    $output .= ' ('. t('not verified') .')';
  }
  else {
    $output = variable_get('anonymous', t('Anonymous'));
  }

  return $output;
}

function gsapp_menu_local_tasks() {
  global $user;
  $output = '';

  if ($primary = menu_primary_local_tasks()) {
  	if(!user_access('change own username'))
	{
		$primary = ereg_replace("user/[0-9]+/edit","user/".$user->uid."/edit/Additional%20Information",$primary);
	}
	$primary = preg_replace("/<li(.*)guestbook(.*)?>/",'',$primary);
    $output .= "<ul class=\"tabs primary clear-block\">\n". $primary ."</ul>\n";

  }
  if ($secondary = menu_secondary_local_tasks()) {
  	if(!user_access('change own username'))
	{
		$secondary = preg_replace("/<li(.*)Account(.*)?>/",'',$secondary);
	}
	if(!user_access('administer my_site_lite'))
	{
		$secondary = preg_replace("/<li(.*)My Site(.*)?>/",'',$secondary);
	}
	if(!user_access('administer my_site_lite'))
	{
		$secondary = preg_replace("/<li(.*)Personal Information(.*)?>/",'',$secondary);
	}

	$secondary = preg_replace("/<li(.*)guestbook(.*)?>/",'',$secondary);

    $output .= "<ul class=\"tabs secondary clear-block\">\n". $secondary ."</ul>\n";
  }

  return $output;
}

function gsapp_preprocess_user_profile(&$variables) {
  $variables['profile'] = array();
  // Sort sections by weight
  uasort($variables['account']->content, 'element_sort');
  // Provide keyed variables so themers can print each section independantly.
  foreach (element_children($variables['account']->content) as $key) {
    $variables['profile'][$key] = drupal_render($variables['account']->content[$key]);
  }
  // Collect all profiles to make it easier to print all items at once.
  $variables['user_profile'] = implode($variables['profile']);
}

function _generateAtoZ($view,$args,&$nodes,&$output,$type='node')
{
  $index = array('A' => NULL, 'B' => NULL, 'C' => NULL, 'D' => NULL, 'E' => NULL, 'F' => NULL, 'G' => NULL, 'H' => NULL, 'I' => NULL, 'J' => NULL, 'K' => NULL, 'L' => NULL, 'M' => NULL, 'N' => NULL, 'O' => NULL, 'P' => NULL, 'Q' => NULL, 'R' => NULL, 'S' => NULL, 'T' => NULL, 'U' => NULL, 'V' => NULL, 'W' => NULL, 'X' => NULL, 'Y' => NULL, 'Z' => NULL);

		foreach($nodes as $node)
		{
			if($type == 'user'){
				$node = user_load($node->uid);
			}
			elseif($type = 'node'){
				$node = node_load($node->nid);
			}



			$key = strtoupper(substr($node->profile_lastname,0,1));
			if(array_key_exists($key,$index))
			{
				$index[$key][] = $node;
			}
			/*else
			{
				if($node->profile_lastname)
				$index['*'][] = $node;
			}*/
		}

		/*if(!isset($index['Other']))
		{ //set the other index even if the node does not exist
			$index['Other'] = NULL;
		}*/
		$alpha_index .= '<div id="alpha-index">';
		foreach ($index as $alpha => $service)
		{

			if(!empty($service))
			{
				if(arg(1) == '')
				{
					drupal_goto(arg(0).'/'. strtoupper($alpha));
					exit;
				}
				/* Output alpha index */
				$alpha_index .= "<a href='/".arg(0).'/'. strtoupper($alpha) ."'>$alpha</a>";

			}
			else
				$alpha_index .= "<span class='no-listing'>$alpha</span>";
		}

		$alpha_index .= "</div>";
		$output .= "<div id='atoz-container'>";
		$output .= $alpha_index;
		$output .= "</div>";
}

function gsapp_imagecache($namespace, $path, $alt = '', $title = '', $attributes = NULL) {

	if ($image = image_get_info(imagecache_create_path($namespace, $path))) {
    $attributes['width'] = $image['width'];
    $attributes['height'] = $image['height'];
  }
  // check is_null so people can intentionally pass an empty array of attributes to override
  // the defaults completely... if
  if (is_null($attributes)) {
    $attributes['class'] = 'imagecache imagecache-'. $namespace;
  }
  $attributes = drupal_attributes($attributes);
  $imagecache_url = imagecache_create_url($namespace, $path);
  $caption = '';

  return '<img src="'. $imagecache_url .'" alt="'. check_plain($alt) .'" title="'. check_plain($title) .'" '. $attributes .' />'.$caption;
}


/* tct2003: not sure we really need this anymore, we're using menu_tree_all_data() in page.tpl.php instead, but might be dependency elsewhere. */
function menu_link_load_by_path($path) {
  if ($item = db_fetch_array(db_query("SELECT link_title title FROM menu_links WHERE link_path = '%s'", $path))) {
  	 _menu_link_translate($item);
    return $item;
  }
  return FALSE;
}

function gsapp_guestbook_form_entry_form(&$form_state) {

  $output  = '';
  $access  = $form_state['access']['#value'];
  $display = $form_state['display']['#value'];
  $uid     = $form_state['uid']['#value'];


  switch ($access) {
    case 'allowed':
      if ($display == 'link') {
        // Output only a link to a page with the form.
        //$output .= '<p>&raquo; '. l(t('Add guestbook entry'), guestbook_path($uid) .'/sign') .'</p>';
      }
      else {
        $output .= $display == 'page' ? '' : '<div class="box"><h2 class="title">'. t('Contribute') .'</h2></div>';
        $output .= drupal_render($form_state);
      }
      break;

    case 'own guestbook':
      $output .= ' ';
      break;

    case 'not logged in':
      $output .= ' ';
      break;

    case 'not allowed':
      $output .= ' ';
      break;
  }
  return $output;
}

function gsapp_guestbook($uid, $entries, $comment_entry, $limit = 20) {
  global $user;
  $form_location = variable_get('guestbook_form_location', 'above');
  $pager_position = variable_get('guestbook_pager_position', GUESTBOOK_PAGER_BELOW);

  // intro text
  $intro = _guestbook_info($uid, 'intro');
  $output = $intro ? check_markup($intro) : '';
  //$output .= _guestbook_user_profile_link($uid);


  // form on separate page
  $output .= ($form_location == 'separate page' ? guestbook_form_entry($uid, 'link') : '');
  // form and pager above entries
  $output .= ($form_location == 'above' ? guestbook_form_entry($uid) : '');
  $output .= ($pager_position & GUESTBOOK_PAGER_ABOVE ? theme('pager', NULL, $limit, 0) : '');

  $i = 0;
  foreach ($entries as $entry) {
    $zebra = ($i % 2) ? 'odd' : 'even';
    $output .= theme('guestbook_entry', $uid, $entry, $comment_entry, $zebra);
    $i++;
  }

  // form and pager below entries
  $output .= $pager_position & GUESTBOOK_PAGER_BELOW ? theme('pager', NULL, $limit, 0) : '';
  $output .= $form_location == 'below' ? guestbook_form_entry($uid) : '';
  if(ereg('guestbook-entry',$output)){
  	$output = '<h2 id="comments-title">Discussion</h2><div id="comments">'. $output ."</div>\n";
  }

  return $output;
}


function gsapp_guestbook_entry($uid, $entry, $comment_entry = NULL, $zebra, $confirm_delete = false) {
  global $user;
  $output = '';
  $display = (array) variable_get('guestbook_display', array('date', 'email', 'website', 'comments'));

  $output .= "\n<div class=\"comment entry guestbook-entry $zebra\">\n";
  if ($comment_entry == $entry['id']) {
    $output .= '<a name="comment-entry"></a>';
  }



  // date, email, website
  $output .= '<div class="submitted">';
  if (in_array('date', $display)) {
    $output .= format_date($entry['created'], 'medium');
  }
  if (in_array('email', $display) && !empty($entry['anonemail'])) {
    $output .= '&nbsp;|&nbsp;<a href="mailto:'. check_url($entry['anonemail']) .'">'. t('E-mail') .'</a>';
  }
  if (in_array('website', $display) && !empty($entry['anonwebsite'])) {
    // Auto-prepend HTTP protocol if website contains no protocol.
    if (strpos($entry['anonwebsite'], '://') === FALSE) {
      $entry['anonwebsite'] = 'http://'. $entry['anonwebsite'];
    }
    $output .= '&nbsp;|&nbsp;<a href="'. check_url($entry['anonwebsite']) .'">'. t('Website') .'</a>&nbsp;';
  }
  $output .= '</div>';

  // message
  $output .= '<div class="content guestbook-message">'. check_markup($entry['message'], variable_get('guestbook_input_format', 1), FALSE) .'</div>';

  if ($entry['picture']) {
    $output .= '<div style="clear:both;"></div>';
  }

  // comment
  $output .= theme('guestbook_entry_comment', $uid, $entry, $comment_entry);

  // author
  if ($entry['author'] == 0) {
    $author = check_plain($entry['anonname']);
  }
  else {
    $author = theme('guestbook_user_picture', $entry['author']);
  }

  $output .= '<div class="entryshare">Posted by: '. $author .'</div>';

  // links
  if (_guestbook_access('administer', $uid) && !$confirm_delete) {
    if ($comment_entry != $entry['id']) {
      $pager = !empty($_GET['page']) ? 'page='. $_GET['page'] : NULL;
      $output .= '<div class="links">';
      $output .= l(t('Delete'), guestbook_path($uid) .'/guestbook/delete/'. $entry['id'], array('query' => $pager)) .'&nbsp;&nbsp;';
      //$output .= l($entry['comment'] == '' ? t('Add') : t('Edit'), guestbook_path($uid) .'/comment/'. $entry['id'], array('query' => $pager, 'fragment' => 'comment-entry'));
      $output .= '</div>';
    }
  }

  $output .= "\n</div>";
  return $output;
}

/* tct2003: not sure we need this, seems search-specific, and we are overriding search. */
/**
 * Override or insert PHPTemplate variables into the templates.
 */
function phptemplate_preprocess_page(&$vars) {
  // ProfilePlus module: remove the Users tab from the search page
  if (module_exists('profileplus')) {
    _removetab('Users', $vars);
  }
  _removetab('Help', $vars);
}


/* tct2003: not sure we need this, seems search-specific, and we are overriding search. */
/**
 * Removes a tab from the $tabs array.
 * ProfilePlus uses this function to remove the 'Users' tab
 * from the search page.
 */
function _removetab($label, &$vars) {
  $tabs = explode("\n", $vars['tabs']);
  $vars['tabs'] = '';

  foreach($tabs as $tab) {
    if(strpos($tab, '>' . $label . '<') === FALSE) {
      $vars['tabs'] .= $tab . "\n";
    }
  }
}


function phptemplate_menu_overview_form($form) {
  drupal_add_tabledrag('menu-overview', 'match', 'parent', 'menu-plid', 'menu-plid', 'menu-mlid', TRUE, MENU_MAX_DEPTH - 1);
  drupal_add_tabledrag('menu-overview', 'order', 'sibling', 'menu-weight');

  $header = array(
    t('Menu item'),
    array('data' => t('Enabled'), 'class' => 'checkbox'),
//    array('data' => t('Expanded'), 'class' => 'checkbox'),
    t('Weight'),
    array('data' => t('Operations'), 'colspan' => '2'),
  );

  $rows = array();
  foreach (element_children($form) as $mlid) {
    unset($element['expanded']);
    if (isset($form[$mlid]['hidden'])) {
    
      $element = &$form[$mlid];
      // Build a list of operations.
      $operations = array();
      foreach (element_children($element['operations']) as $op) {
        $operations[] = drupal_render($element['operations'][$op]);
      }
      while (count($operations) < 2) {
        $operations[] = '';
      }

      // Add special classes to be used for tabledrag.js.
      $element['plid']['#attributes']['class'] = 'menu-plid';
      $element['mlid']['#attributes']['class'] = 'menu-mlid';
      $element['weight']['#attributes']['class'] = 'menu-weight';

      // Change the parent field to a hidden. This allows any value but hides the field.
      $element['plid']['#type'] = 'hidden';

      $row = array();
      $row[] = theme('indentation', $element['#item']['depth'] - 1) . drupal_render($element['title']);
      $row[] = array('data' => drupal_render($element['hidden']), 'class' => 'checkbox');
//      $row[] = array('data' => drupal_render($element['expanded']), 'class' => 'checkbox');
      $row[] = drupal_render($element['weight']) . drupal_render($element['plid']) . drupal_render($element['mlid']);
      $row = array_merge($row, $operations);

      $row = array_merge(array('data' => $row), $element['#attributes']);
      $row['class'] = !empty($row['class']) ? $row['class'] .' draggable' : 'draggable';
      $rows[] = $row;
    }
  }
  $output = '';
  if ($rows) {
    $output .= theme('table', $header, $rows, array('id' => 'menu-overview'));
  }
  $output .= drupal_render($form);
  return $output;
}
