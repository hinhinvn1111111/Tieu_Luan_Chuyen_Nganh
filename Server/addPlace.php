<?php
	$localhost = "localhost";
	$usn = "root";
	$password = "";
	$database = "tlcn_findnearplace";
	$conn = mysqli_connect($localhost,$usn,$password,$database);
	mysqli_set_charset($conn,'utf8');
	
	$json = file_get_contents('php://input');

	$obj = json_decode($json,true);

	$Latitude = $obj['Latitude'];
	$Longitude = $obj['Longitude'];
	$Place_Name = $obj['Place_Name'];
	$Decription = $obj['Decription'];
	$Image = $obj['Image'];
	$Username = $obj['Username'];

	//$pw = $obj['pw'];



	//$query = "INSERT INTO place(Latitude,Longitude,Place_Name,Decription,Image,Username) VALUES($Latitude,$Longitude,$Place_Name,$Decription,$Image,$Username)";

	$query = "INSERT INTO place(Latitude,Longitude,Place_Name,Decription,Image,Username) VALUES($Latitude,$Longitude,'$Place_Name','$Decription','$Image','$Username')";

	$data = mysqli_query($conn,$query);

	$query1 = "SELECT *FROM place";

	$data1 = mysqli_query($conn,$query1);

	$arrPlace = array();
	while ($row=mysqli_fetch_assoc($data1)) {
		array_push($arrPlace, new PLACE(
			$row['ID'],
			$row['Latitude'],
			$row['Longitude'],
			$row['Place_Name'],
			$row['Decription'],
			$row['Image'],
			$row['Username']
		));
	}

	echo json_encode($arrPlace);
	class PLACE{
		function PLACE($ID,$Latitude,$Longitude,$Place_Name,$Decription,$Image,$Username){
			$this->ID=$ID;
			$this->Latitude=$Latitude;
			$this->Longitude=$Longitude;
			$this->Place_Name=$Place_Name;
			$this->Decription=$Decription;
			$this->Image=$Image;
			$this->Username=$Username;
		}
	}

	
	mysqli_close($conn);
?>