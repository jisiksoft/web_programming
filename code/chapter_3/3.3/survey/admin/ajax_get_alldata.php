<?php

$password;

if(isset($_POST['password']))	{ $password = $_POST['password']; }

if ($password != 'jisiksoft') {
	print 0;
	exit();
}

$filename = "../2016/data/alldata.data";
$handle = fopen($filename, "r");
$data = fread($handle, filesize($filename));
fclose($handle);

print $data;
exit();

?>
