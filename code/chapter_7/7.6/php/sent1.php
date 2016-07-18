<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

$time = date("h:i:sa");
echo "data: ".$time."\n\n";
flush();
?>
