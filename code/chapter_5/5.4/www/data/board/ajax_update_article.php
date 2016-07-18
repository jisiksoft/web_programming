<?php

require_once('../../library/php/config.php');
require_once('../../library/php/session.php');
require_once('../../library/php/mysql.php');

$ses = new session();

if(!($ses->is_login())){
	print '{ "error" : "로그인되지 않았습니다." }';
	exit();
}

$db = new MySQL();

$board 		= (isset($_POST['board'])) ? $_POST['board'] : "";
$id 		= (isset($_POST['id'])) ? $_POST['id'] : "";
$title 		= (isset($_POST['title'])) ? $_POST['title'] : "";
$contents 	= (isset($_POST['contents'])) ? $_POST['contents'] : "";

$curDate = date("Y-m-d", time());

if(!$db->connect($dbconfig)) {
	$db->close();
	print '{ "error" : "데이터베이스 연결에 실패했습니다." }';
	exit();
}

$db->startTransaction();

$sql = "UPDATE ".$board." SET subject='".$title."', contents='".$contents."' WHERE id=".$id;

$result = $db->query($sql);
if($result == false){
	$db->rollback();
	$db->close();
	print '{ "error" : "데이터베이스 테이블에서 업데이트되지 않았습니다." }';
	exit();
}

$db->commit();

$db->close();

print  0;
exit();

?>
