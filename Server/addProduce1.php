
<?php
	$localhost = "localhost";
	$usn = "root";
	$password = "";
	$database = "tlcn_findnearplace";
	$conn = mysqli_connect($localhost,$usn,$password,$database);
	mysqli_set_charset($conn,'utf8');
	
	$json = file_get_contents('php://input');

	$obj = json_decode($json,true);

	$ID_Place = $obj['ID_Place'];

	$ID_Produce = $obj['ID_Produce'];

	$price = $obj['price'];

	$Image = $obj['Image'];

	$query = "INSERT INTO cost(ID_Place,ID_Produce,price,Image,Decription) VALUES($ID_Place,$ID_Produce,'$price','$Image','')";

	$data = mysqli_query($conn,$query);

	mysqli_close($conn);
?>