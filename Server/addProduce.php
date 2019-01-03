<?php
	$localhost = "localhost";
	$usn = "root";
	$password = "";
	$database = "tlcn_findnearplace";
	$conn = mysqli_connect($localhost,$usn,$password,$database);
	mysqli_set_charset($conn,'utf8');
	
	$json = file_get_contents('php://input');

	$obj = json_decode($json,true);

	$TenSP = $obj['TenSP'];

	$query = "INSERT INTO produce(Produce_Name) VALUES('$TenSP')";

	$data = mysqli_query($conn,$query);

	$query1 = "SELECT * FROM `produce` WHERE ID=(SELECT MAX(ID) from produce)";

	$data1 = mysqli_query($conn,$query1);

	$arrPRODUCE = array();

	while ($row=mysqli_fetch_assoc($data1)) {
		array_push($arrPRODUCE, new PRODUCE(
			$row['ID'],
			$row['Produce_Name']
		));
	}

	echo json_encode($arrPRODUCE);
	class PRODUCE{
		function PRODUCE($ID,$Produce_Name){
			$this->ID=$ID;
			$this->Produce_Name=$Produce_Name;
		}
	}

	// $arrPlace = array();
	// while ($row=mysqli_fetch_assoc($data1)) {
	// 	array_push($arrPlace, new PLACE(
	// 		$row['ID'],
	// 		$row['Latitude'],
	// 		$row['Longitude'],
	// 		$row['Place_Name'],
	// 		$row['Decription'],
	// 		$row['Image'],
	// 		$row['Username']
	// 	));
	// }

	// echo json_encode($arrPlace);
	// class PLACE{
	// 	function PLACE($ID,$Latitude,$Longitude,$Place_Name,$Decription,$Image,$Username){
	// 		$this->ID=$ID;
	// 		$this->Latitude=$Latitude;
	// 		$this->Longitude=$Longitude;
	// 		$this->Place_Name=$Place_Name;
	// 		$this->Decription=$Decription;
	// 		$this->Image=$Image;
	// 		$this->Username=$Username;
	// 	}
	// }

	
	mysqli_close($conn);
?>