<?php

require_once('../../library/php/config.php');
require_once('../../library/php/session.php');
require_once('../../library/php/mysql.php');

$ses = new Session();
$db = new MySQL();

// login check
if(!$ses->is_login()){
	print "로그아웃 되었습니다.";
	exit();
}

if(isset($_POST['passwd']))	{ $passwd = $_POST['passwd']; 	}
if(isset($_POST['cell']))	{ $cell = $_POST['cell']; 	}
if(isset($_POST['addr']))	{ $addr = $_POST['addr']; 	}

if(!$db->connect($dbconfig)) {
	print '{ "error" : "데이터베이스 연결에 실패했습니다." }';
	exit();
}

$sql = "SELECT auth FROM User WHERE email='".$ses->get_email()."'";

$result = $db->query($sql);
if($result === false){
	$db->close();
	print '{ "error" : "데이터베이스 검색을 실패했습니다." }';
	exit();
}
$data = $db->fetchRow($result);

$db->startTransaction();

if ($data['auth'] == '0000') {
	$sql = "UPDATE User SET passwd=password('".$passwd."'), cell='".$cell."', addr='".$addr."', auth='0001' WHERE email='".$ses->get_email()."'";
} else {
	$sql = "UPDATE User SET passwd=password('".$passwd."'), cell='".$cell."', addr='".$addr."' WHERE email='".$ses->get_email()."'";
}

$result = $db->query($sql);
if($result == false){
	$db->rollback();
	$db->close();
	print '{ "error" : "데이터베이스 업데이트를 실패했습니다." }';
	exit();
}

$db->commit();

$db->close();

$ses->set_cell($cell);
$ses->set_addr($addr);

print "개인정보가 수정되었습니다.";
exit();

?>
