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



	$query = "SELECT * FROM `login` ";

	$data = mysqli_query($conn,$query);

	$arrLogin = array();

	while ($row=mysqli_fetch_assoc($data)) {
		array_push($arrLogin, new Login(
			$row['ID'],
			$row['Username'],
			$row['Password'],
			$row['Avatar'],
			$row['ID_Role'],
			$row['Sex'],
			$row['Email']
		));
	}

	echo json_encode($arrLogin);
	class Login{
		function Login($ID,$Username,$Password,$Avatar,$ID_Role,$Sex,$Email){
			$this->ID=$ID;
			$this->Username=$Username;
			$this->Password=$Password;
			$this->Avatar=$Avatar;
			$this->ID_Role=$ID_Role;
			$this->Sex=$Sex;
			$this->Email=$Email;
		}
	}

	
	mysqli_close($conn);
?>