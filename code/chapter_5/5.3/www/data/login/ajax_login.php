<?php

require_once('../../library/php/config.php');
require_once('../../library/php/session.php');
require_once('../../library/php/mysql.php');

$ses = new Session();
$db = new MySQL();

if($ses->is_login()){
	print 0;
	exit();
}

if(isset($_POST['email']))	{ $email = $_POST['email']; 	}
if(isset($_POST['passwd']))	{ $passwd = $_POST['passwd']; 	}

if(!$db->connect($dbconfig)) {
	print '{ "error" : "데이터베이스 연결에 실패했습니다." }';
	exit();
}

$sql = "SELECT * FROM User WHERE email='".$email."' AND cancel=0";

$result = $db->query($sql);
if($result === false){
	$db->close();
	print '{ "error" : "데이터베이스 조회에 실패했습니다. (1)" }';
	exit();
}
$data = $db->fetchArray($result);

if($data == null){
	$db->close();
	print '{ "error" : "등록되지 않은 이메일입니다." }';
	exit();
}

$sql = "SELECT * FROM User WHERE email='".$email."' AND passwd=password('".$passwd."')";

$result = $db->query($sql);
if($result === false){
	$db->close();
	print '{ "error" : "데이터베이스 조회에 실패했습니다. (2)" }';
	exit();
}
$data = $db->fetchRow($result);

if($data == null){
	$db->close();
	print '{ "error" : "비밀번호가 맞지 않습니다." }';
	exit();
}

$curTime = date("Y-m-d h:i:s", time());

$db->startTransaction();

$sql = "UPDATE User SET date_cur='".$curTime."' WHERE email='".$email."'";

$result = $db->query($sql);
if($result == false){
	$db->rollback();
	$db->close();
	print '{ "error" : "데이터베이스에 최근 접속시간을 업데이트하지 못했습니다." }';
	exit();
}

$db->commit();
$db->close();

$ses->create($data);
	
if (strlen($passwd) > 7)
	print 1;
else
	print 2;
	
exit();

?>
