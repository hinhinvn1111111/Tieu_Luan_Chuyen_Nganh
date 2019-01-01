<?php
	$localhost = "localhost";
	$usn = "root";
	$password = "";
	$database = "tlcn_findnearplace";
	$conn = mysqli_connect($localhost,$usn,$password,$database);
	mysqli_set_charset($conn,'utf8');
	
	$json = file_get_contents('php://input');

	$obj = json_decode($json,true);

	$Username = $obj['Username'];
	//$IDP = $obj['IDP'];
	//$Content = $obj['content'];

	//$pw = $obj['pw'];



	$query = "SELECT * FROM `place` WHERE Username='$Username'";

	$data = mysqli_query($conn,$query);
	
	
	$arrComment = array();
	while ($row=mysqli_fetch_assoc($data)) {
		array_push($arrComment, new COMMENT(
			$row['ID'],
			$row['Username']
		));
	}
	
	echo json_encode($arrComment);
	// if($arrComment.length >0) echo "true";
	// else echo "false";
	class COMMENT{
		function COMMENT($ID,$Username){
			$this->ID=$ID;
			$this->Username=$Username;
		}
	}

	
	mysqli_close($conn);
?>