<?php

$dataId 	= (isset($_POST['dataId'])) ? $_POST['dataId'] : "";

if ($dataId == "header")
	$filename = "./header/".$dataId.".html";
else if ($dataId == "footer")
	$filename = "./footer/".$dataId.".html";
else
	$filename = "./container/".$dataId.".html";

$fp = fopen($filename, "r");
$data = fread($fp, filesize($filename));
fclose($fp);

if ($dataId == "footer") {
	$fileCNT = "./counter/total.cnt";
	$fp = fopen($fileCNT, "r");
	$cntTotal = fread($fp, filesize($fileCNT));
	fclose($fp);
	$cntTotal += 1;
	$fp = fopen($fileCNT, "w");
	fwrite($fp, $cntTotal);
	fclose($fp);

	$today = date("Y/m/d");
	
	$fileCNT = "./counter/today.cnt";
	$fp = fopen($fileCNT, "r");
	$dataToday = fread($fp, filesize($fileCNT));
	fclose($fp);
	$arrToday = explode("#", $dataToday);
	if ($arrToday[0] == $today)
		$arrToday[1] += 1;
	else
		$arrToday[1] = 1;
	$dataToday = $today."#".$arrToday[1];
	$fp = fopen($fileCNT, "w");
	fwrite($fp, $dataToday);
	fclose($fp);
	
	$data = '<div class="color2" style="position:relative;top:60px;width:100px;float:left;">
			&nbsp;&nbsp;Today : <span class="color5">'.$arrToday[1].'</span></br> 
			&nbsp;&nbsp;Total &nbsp;&nbsp;: <span class="color5">'
			.$cntTotal.'</span></div>'
			.$data;	
}

print $data;
exit();

?>
