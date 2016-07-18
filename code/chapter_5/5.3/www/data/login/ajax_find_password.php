<?php

require_once('../../library/php/config.php');
require_once('../../library/php/session.php');
require_once('../../library/php/mysql.php');

$ses = new session();
$db = new MySQL();

if($ses->is_login()){
	print 0;
	exit();
}

if(isset($_POST['email']))	{ $email = $_POST['email']; }

$passwd = rand(100000, 999999);

if(!$db->connect($dbconfig)) {
	print '{ "error" : "데이터베이스 연결에 실패했습니다." }';
	exit();
}

$sql = "SELECT COUNT(email) FROM User WHERE email = '".$email."' ";

$result = $db->query($sql);
if($result == false){
	$db->close();
	print '{ "error" : "데이터베이스에서 이메일 정보를 가져오지 못했습니다." }';
	exit();
}
$data = $db->fetchRow($result);
        
if ($data['COUNT(email)'] == 0) {
	$db->close();
	print '{ "error" : "등록되지 않은 이메일입니다." }';
	exit();
}

$db->startTransaction();

$sql = "UPDATE User SET passwd=password('".$passwd."') WHERE email='".$email."'";

$result = $db->query($sql);
if($result == false){
	$db->rollback();
	$db->close();
	print '{ "error" : "데이터베이스에 임시패스워드가 등록되지 않았습니다." }';
	exit();
}

$db->commit();

$db->close();

//================================== Email 보내기 ===================================
$subject = '(지식소프트) 임시 비밀번호를 확인하시기 바랍니다.';

$message = "비밀번호를 초기화 했습니다.
			
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
