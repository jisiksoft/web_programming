<?php

session_start();

if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity'] > 1800)) {
    session_unset();
    session_destroy();
}
$_SESSION['last_activity'] = time();

class Session {
	
	function create($data){
		$_SESSION['login'] 		= 	"y";
		$_SESSION['email'] 		= 	$data['email'];		//email
		$_SESSION['name'] 		= 	$data['name']; 		//이름
		$_SESSION['cell'] 		= 	$data['cell'];		//전화번호
		$_SESSION['addr'] 		= 	$data['addr'];		//주소
		$_SESSION['auth']		=	$data['auth'];		//권한
		$_SESSION['date_reg']	=	$data['date_reg'];	//등록일
		$_SESSION['date_rec']	=	$data['date_rec'];	//최근접속일
		
		return true;
	}
	
	function is_login() {
		if(isset($_SESSION['login']) && ($_SESSION['login'] == "y")) {
			return true;
		} else {
			return false;
		}
	}
	
	function get_data_all(){
		return $_SESSION;
	}
	
	function get_email(){
		return $_SESSION['email'];
	}
	
	function set_cell($cell) {
		$_SESSION['cell'] = $cell;
	}
	
	function set_addr($addr) {
		$_SESSION['addr'] = $addr;
	}

	function destroy(){
		$_SESSION = array();
		session_destroy();
		return true;
	}
}

?>
