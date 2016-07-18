<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

$load = sys_getloadavg();
echo "data: ".($load[0] * 100)." %\n\n";
flush();
?>
