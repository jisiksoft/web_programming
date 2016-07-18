<?php

$radius = 80;
$degree = (((time() * 3) % 360) * M_PI) / 180;

$sin = round(sin($degree) * $radius);
$cos = round(cos($degree) * $radius);

print '{ "sin":'.$sin.', "cos":'.$cos.' }';
exit();

?>
