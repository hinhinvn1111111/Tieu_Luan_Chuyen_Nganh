<?php
	$localhost = "localhost";
	$usn = "root";
	$password = "";
	$database = "tlcn_findnearplace";
	$conn = mysqli_connect($localhost,$usn,$password,$database);
	mysqli_set_charset($conn,'utf8');
	
	$json = file_get_contents('php://input');

	$obj = json_decode($json,true);

	// $name = $obj['username'];

	// $email = $obj['email'];

	// $pass = $obj['password'];

	$keySearch = $obj['keySearch'];

	//echo json_encode($keySearch);

	
	// $query = "INSERT INTO `demoinsert` (`ID`, `Username`, `Email`, `Passwrod`) VALUES (NULL, '$name', '$email', '$pass')";
	// if(mysqli_query($conn,$query)){
	// 	$MSG = 'SUSSCESS';
	// 	$json = json_encode($MSG);
	// 	echo $json;
	// }
	// else{
	// 	echo "Something went wrong";
	// }
	
	

	$query1 = "SELECT p.ID,p.Latitude,p.Longitude,p.Place_Name,p.Decription,p.Image from place as p, produce as pr, cost as c WHERE p.ID=c.ID_Place AND pr.ID=c.ID_Produce AND pr.Produce_Name LIKE '%$keySearch%'";

	$data = mysqli_query($conn,$query1);

	$arrLogin = array();

	while ($row=mysqli_fetch_assoc($data)) {
		array_push($arrLogin, new Login(
			$row['ID'],
			$row['Latitude'],
			$row['Longitude'],
			$row['Place_Name'],
			$row['Decription'],
			$row['Image']
		));
	}

	echo json_encode($arrLogin);
	class Login{
		function Login($ID,$Latitude,$Longtitude,$Title,$Decription,$Image){
			$this->ID=$ID;
			$this->Latitude=$Latitude;
			$this->Longtitude=$Longtitude;
			$this->Title=$Title;
			$this->Decription=$Decription;
			$this->Image=$Image;
		}
	}

	
	mysqli_close($conn);
?>