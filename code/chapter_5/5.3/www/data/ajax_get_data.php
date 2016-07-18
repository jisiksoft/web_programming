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
else {
	require_once('../library/php/session.php');
	$filename = "./container/".$dataId.".html";
}

$fp = fopen($filename, "r");
$data = fread($fp, filesize($filename));
fclose($fp);

if ($dataId == "footer") {

	require_once('../library/php/config.php');
	require_once('../library/php/mysql.php');

	$today = date("Y-m-d");
	
	$db = new MySQL();

	if(!$db->connect($dbconfig)) {
		print '{ "error" : "데이터베이스 연결에 실패했습니다." }';
		exit();
	}

	$sql = "SELECT total, today, date FROM Count ORDER BY date DESC LIMIT 1";

	$result = $db->query($sql);
	if($result == false){
		$db->close();
		print '{ "error" : "데이터베이스 테이블에서 정보를 불러오지 못했습니다." }';
		exit();
	}
	$arrCount = $db->fetchRow($result);
	
	$db->startTransaction();
		
	if ($arrCount['date'] == $today) {
		$sql = "UPDATE Count SET total=total+1, today=today+1 WHERE date='".$today."'";
	} else {
		$sql = "INSERT INTO Count VALUES ('".$today."', ".($arrCount['total']+1).", 1)";

	}

	$result = $db->query($sql);
	if($result == false){
		$db->rollback();
		$db->close();
		print '{ "error" : "데이터베이스 테이블에서 을 방문자수를 업데이트하지 못했습니다." }';
		exit();
	}
	
	$db->commit();
	
	$db->close();
	
	$data = '<div class="color2" style="position:relative;left:10px;width:100px;height:40px;float:left;">
			Today : <span class="color5">'
			.($arrCount['date'] == $today ? ($arrCount['today']+1) : 1).
			'</span></br>
			Total &nbsp;&nbsp;: <span class="color5">'
			.($arrCount['total']+1).
			'</span></div>'
			.$data;	
}

print $data;
exit();

?>
