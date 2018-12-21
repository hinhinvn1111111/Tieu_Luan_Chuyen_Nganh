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

	$pw = $obj['pw'];

	$sex = $obj['sex'];

	$email = $obj['email'];

	$query = "UPDATE `login` SET PASSWORD='$pw',Sex='$sex',Email='$email' WHERE Username='$usn'";
	mysqli_query($conn,$query)
	

?>