<?php
	$localhost = "localhost";
	$usn = "root";
	$password = "";
	$database = "tlcn_findnearplace";
	$conn = mysqli_connect($localhost,$usn,$password,$database);
	mysqli_set_charset($conn,'utf8');
	
	$json = file_get_contents('php://input');

	$obj = json_decode($json,true);

	$usn = $obj['usn'];

	$id = $obj['id_role'];

	$query = "UPDATE `login` SET ID_Role='$id' WHERE Username='$usn'";
	
	mysqli_query($conn,$query)
	

?>