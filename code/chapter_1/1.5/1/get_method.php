<?php

$name 	= (isset($_GET['name'])) ? $_GET['name'] : "";
$id 	= (isset($_GET['id'])) ? $_GET['id'] : "";

$html = '<!DOCTYPE html><html><head><title>Hello JISIKSOFT</title><meta charset="utf-8"></meta></head><body>';

$html .= '<br>Your Name is "' . $name . '".<br><br>';
$html .= 'Your Id is "' . $id . '".<br>';

$html .= '</body></html>';

print $html;
exit();

?>
