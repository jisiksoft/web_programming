<?php

$dataId 	= (isset($_POST['dataId'])) ? $_POST['dataId'] : "";

if ($dataId == "header")
	$filename = "./header/".$dataId.".html";
else if ($dataId == "info")
	$filename = "./info/".$dataId.".html";
else if ($dataId == "footer")
	$filename = "./footer/".$dataId.".html";
else if ($dataId == "login")
	$filename = "./login/".$dataId.".html";
else if ($dataId == "register")
	$filename = "./login/".$dataId.".html";
else if ($dataId == "personalinfo")
	$filename = "./login/".$dataId.".html";
else
	$filename = "./container/".$dataId.".html";

$fp = fopen($filename, "r");
$data = fread($fp, filesize($filename));
fclose($fp);

print $data;
exit();

?>
