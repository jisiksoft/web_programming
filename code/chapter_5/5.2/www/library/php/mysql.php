<?php

class MySQL {

	var $mConn;
	var $mConnected = false;
	
	function connect($data) {
		$host 		= $data['hostname'];
		$username 	= $data['username'];
		$password 	= $data['password'];
		$database 	= $data['database'];
		
		$this->mConn = mysqli_connect($host, $username, $password, $database);
		
		if(!$this->mConn){
			return false;
		}
		
		mysqli_set_charset($this->mConn,'utf8');
		$this->mConnected = true;
		
		return true;
	}
	
	function close() {
		if($this->mConnected == true) {
			if(!mysqli_close($this->mConn)){
				$this->mConnected = false;
			}
		}
	}
	
	function query($sql) {
		if($this->mConnected == true) {
			$result = mysqli_query($this->mConn, $sql);
			return $result;
		}
		return false;
	}
	
	function fetchArray($result) {
		if($this->mConnected == true) {
			$resultArray = array();
			while($data = mysqli_fetch_assoc($result)){
				array_push($resultArray,$data);
			}
			return $resultArray;
		}
		return false;
	}
	
	function fetchRow($result) {
		if($this->mConnected == true) {
			return mysqli_fetch_assoc($result);
		}
		return false;
	}
	
	function startTransaction() {
		return $this->query("START TRANSACTION");
	}

	function commit() {
		return $this->query("COMMIT");
	}

	function rollback() {
		return $this->query("ROLLBACK");
	}
}

?>
