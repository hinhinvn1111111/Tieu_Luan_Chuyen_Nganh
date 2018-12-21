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



	$query = "INSERT INTO login (Username,Password,ID_Role,Avatar) VALUES('$usn','$pw',1,'https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1')";
	mysqli_query($conn,$query);
	$query1 = "SELECT * FROM `login`";
	$data = mysqli_query($conn,$query1);

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