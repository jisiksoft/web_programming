<?php

require_once('../../library/php/session.php');

$ses = new session();

if($ses->is_login()){
	print 1;
} else {
	print 0;
}

exit();
	
?>
