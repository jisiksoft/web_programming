<?php

require_once('../../library/php/session.php');

$ses = new session();

if(!$ses->is_login()){
	print 2;
	exit();
}

$data = $ses->get_data_all();

print '{"email":"'.$data["email"].'", "name":"'.$data["name"].'", "cell":"'.$data["cell"].'", "addr":"'.$data["addr"].'"}';
 
exit();
	
?>
