<?php

require_once('../../library/php/config.php');
require_once('../../library/php/session.php');
require_once('../../library/php/mysql.php');

$board 	= (isset($_POST['board'])) ? $_POST['board'] : "";
$id 	= (isset($_POST['id'])) ? $_POST['id'] : "";

$ses = new session();
$db = new MySQL();

if(!$db->connect($dbconfig)) {
	$db->close();
	print '{ "error" : "데이터베이스 연결에 실패했습니다." }';
	exit();
}

if (!($ses->is_login())){
	
	$db->startTransaction();
	
	$sql = "UPDATE ".$board." SET count = count + 1 WHERE id='".$id."'";
	
	$result = $db->query($sql);
	if($result == false){
		$db->rollback();
		$db->close();
		print '{ "error" : "데이터베이스 테이블에서 제목을 불러오지 못했습니다." }';
		exit();
	}
	
	$db->commit();
}

$sql = "SELECT subject, contents FROM ".$board." WHERE id='".$id."'";

$result = $db->query($sql);
if($result == false){
	$db->close();
	print '{ "error" : "데이터베이스 테이블에서 제목을 불러오지 못했습니다." }';
	exit();
}
$data = $db->fetchRow($result);
  
$db->close();

$strJSON = '{"article":{"subject":"'.$data["subject"].'","contents":"'.$data["contents"].'"}}';

print  $strJSON;
exit();

?>
