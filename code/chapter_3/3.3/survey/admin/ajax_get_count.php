<?php

$filename = "../2016/data/count.data";
$handle = fopen($filename, "r");
$data = fread($handle, filesize($filename));
fclose($handle);

print $data;
exit();

?>
