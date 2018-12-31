<?php
	$localhost = "localhost";
	$usn = "root";
	$password = "";
	$database = "tlcn_findnearplace";
	$conn = mysqli_connect($localhost,$usn,$password,$database);
	mysqli_set_charset($conn,'utf8');
	
	$json = file_get_contents('php://input');

	$obj = json_decode($json,true);

	$id = $obj['ID'];

	//$pw = $obj['pw'];



	$query = "SELECT c.ID,pd.Produce_Name,c.price,c.Image,c.Decription FROM cost as c, place as p, produce as pd WHERE p.ID=c.ID_Place and pd.ID=c.ID_Produce AND p.ID=$id";

	$data = mysqli_query($conn,$query);

	$arrProduce = array();
	while ($row=mysqli_fetch_assoc($data)) {
		array_push($arrProduce, new Produce(
			$row['ID'],
			$row['Produce_Name'],
			$row['price'],
			$row['Image'],
			$row['Decription']
		));
	}

	echo json_encode($arrProduce);
	class Produce{
		function Produce($ID,$Produce_Name,$Price,$Image,$Decription){
			$this->key=$ID;
			$this->Produce_Name=$Produce_Name;
			$this->Price=$Price;
			$this->Image=$Image;
			$this->Decription=$Decription;
		}
	}

	
	mysqli_close($conn);
?>