<?php

require_once('../../library/php/config.php');
require_once('../../library/php/session.php');
require_once('../../library/php/mysql.php');

$board 		= (isset($_POST['board'])) ? $_POST['board'] : "";
$page = (isset($_POST['page'])) ? $_POST['page'] : "";

$db = new MySQL();

if(!$db->connect($dbconfig)) {
	$db->close();
	print '{ "error" : "데이터베이스 연결에 실패했습니다." }';
	exit();
}

$sql = "SELECT id, subject, date, count FROM ".$board." ORDER BY id DESC LIMIT ".($page*20).", 20";

$result = $db->query($sql);
if($result == false){
	$db->close();
	print '{ "error" : "데이터베이스 테이블에서 제목을 불러오지 못했습니다." }';
	exit();
}
$data = $db->fetchArray($result);

$sql = "SELECT COUNT(*) AS total FROM ".$board;

$result = $db->query($sql);
if($result == false){
	$db->close();
	print '{ "error" : "데이터베이스 테이블에서 제목을 불러오지 못했습니다." }';
	exit();
}
$count = $db->fetchRow($result);

$db->close();

$strJSON = '{"boardPage":[';
for ($i=0; $i<count($data); $i++) {
	if ($i != 0)
		$strJSON .= ',';
	$strJSON .= '{"id":'.$data[$i]["id"].',"subject":"'.$data[$i]["subject"].'","date":"'.$data[$i]["date"].'","count":'.$data[$i]["count"].'}';
}
$strJSON .= '], "page":'.$page.', "count":'.$count["total"].'}';
	
print  $strJSON;
exit();

?>
