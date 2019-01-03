
<?php
	$localhost = "localhost";
	$usn = "root";
	$password = "";
	$database = "tlcn_findnearplace";
	$conn = mysqli_connect($localhost,$usn,$password,$database);
	mysqli_set_charset($conn,'utf8');
	
	$json = file_get_contents('php://input');

	$obj = json_decode($json,true);

	$ID = $obj['ID'];

	$query = "DELETE FROM cost WHERE ID=$ID";

	$data = mysqli_query($conn,$query);
	
	mysqli_close($conn);
?>