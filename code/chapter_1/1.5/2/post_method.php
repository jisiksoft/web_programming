<?php

$name 	= (isset($_POST['name'])) ? $_POST['name'] : "";
$id 	= (isset($_POST['id'])) ? $_POST['id'] : "";

$html = '<br>Your Name is "' . $name . '".<br><br>';
$html .= 'Your Id is "' . $id . '".<br>';

print $html;
exit();

?>
