<?php

require_once('../../library/php/config.php');
require_once('../../library/php/session.php');
require_once('../../library/php/mysql.php');

$ses = new session();

if(!($ses->is_login())){
	print '{ "error" : "로그인되지 않았습니다." }';
	exit();
}

$board 		= (isset($_POST['board'])) ? $_POST['board'] : "";
$id 		= (isset($_POST['id'])) ? $_POST['id'] : "";

$db = new MySQL();

if(!$db->connect($dbconfig)) {
	$db->close();
	print '{ "error" : "데이터베이스 연결에 실패했습니다." }';
	exit();
}

$db->startTransaction();

$sql = "DELETE FROM ".$board." WHERE id=".$id;

$result = $db->query($sql);
if($result == false){
	$db->rollback();
	$db->close();
	print '{ "error" : "데이터베이스 테이블에서 지워지지 않았습니다." }';
	exit();
}

$db->commit();

$db->close();

print  0;
exit();

?>
