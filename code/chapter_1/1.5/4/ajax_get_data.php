<?php

$data = '{"chartData":[';

for ($i=0; $i<7; $i++) {
	if ($i != 0)
		$data .= ',';
	$data .= '{"score":' . rand(0,100) . '}';
}

$data .= ']}';

print $data;
exit();

//print '{"chartData":[{"score":67},{"score":30},{"score":40},{"score":60},{"score":100},{"score":10},{"score":98}]}';
//exit();

?>
