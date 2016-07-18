<?php

require_once('../../library/php/config.php');
require_once('../../library/php/session.php');
require_once('../../library/php/mysql.php');

$ses = new Session();
$db = new MySQL();

// login check
if($ses->is_login()){
	print 0;
	exit();
}

// Parsing Parameters
if(isset($_POST['email']))	{ $email = $_POST['email']; 	}
if(isset($_POST['name']))	{ $name = $_POST['name']; 	}
if(isset($_POST['cell']))	{ $cell = $_POST['cell']; 	}
if(isset($_POST['addr']))	{ $addr = $_POST['addr']; 	}

$passwd = rand(100000, 999999);

$curTime = date("Y-m-d h:i:s", time());

if(!$db->connect($dbconfig)) {
	print '{ "error" : "데이터베이스 연결에 실패했습니다." }';
	exit();
}

$sql = "SELECT COUNT(email) FROM User WHERE email = '".$email."' ";

$result = $db->query($sql);
if($result == false){
	$db->close();
	print '{ "error" : "데이터베이스 검색을 실패했습니다." }';
	exit();
}
$data = $db->fetchRow($result);
        
if ($data['COUNT(email)'] != 0) {
	$db->close();
	print '{ "error" : "이미 등록된 이메일입니다. 비밀번호 찾기를 해주시기 바랍니다." }';
	exit();
}

$db->startTransaction();

$sql = "INSERT INTO User VALUES ('".$email."', '".$name."', password('".$passwd."'), '".$cell."', '".$addr."', '0000', '".$curTime."', '".$curTime."', 0)";

$result = $db->query($sql);
if($result == false){
	$db->rollback();
	$db->close();
	print '{ "error" : "데이터베이스에 등록되지 않았습니다." }';
	exit();
}

$db->commit();

$db->close();

//================================== Email 보내기 ===================================
$subject = '(지식소프트) 임시 비밀번호를 확인하시기 바랍니다.';

$message = "지식소프트의 회원가입에 감사합니다.
			
			임시 비밀번호는 아래와 같습니다.
			
			".$passwd."
			
			로그인 후 비밀번호를 변경하시기 바랍니다.";

$headers  = "From: 지식소프트<thankyou@jisiksoft.com>"."\r\n".
			"Content-Type: text/plain;charset=utf-8\r\n".
	        "X-Mailer: PHP/".phpversion();
	        
mail($email, $subject, $message, $headers);
//=================================================================================

print 1;
exit();

?>
