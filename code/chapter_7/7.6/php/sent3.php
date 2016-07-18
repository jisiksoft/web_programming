<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

$free = shell_exec('free');
$free = (string)trim($free);
$free_arr = explode("\n", $free);
$mem = explode(" ", $free_arr[1]);
$mem = array_filter($mem);
$mem = array_merge($mem);
$memory_usage = $mem[2]/$mem[1]*100;
$result = substr($memory_usage, 0, strpos($memory_usage,'.'));

echo "data: ".$result." %\n\n";
flush();
?>
