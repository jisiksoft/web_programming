<?php

$data;
if(isset($_POST['data']))	{ $data = $_POST['data']; }

$date = date('Y').date('m').date('d');
$data .= "##".$date;

$filename = "./data/".$date.".data";
$handle = fopen($filename, "a+");
fwrite($handle, $data."\n");
fclose($handle);

$filename = "./data/alldata.data";
$handle = fopen($filename, "a+");
fwrite($handle, $data."\n");
fclose($handle);

$count;

$filename = "./data/count.data";
$handle = fopen($filename, "r");
$count = fread($handle, filesize($filename));
fclose($handle);

$count += 1;

$filename = "./data/count.data";
$handle = fopen($filename, "w");
fwrite($handle, $count);
fclose($handle);

print 1;
exit();

?>
