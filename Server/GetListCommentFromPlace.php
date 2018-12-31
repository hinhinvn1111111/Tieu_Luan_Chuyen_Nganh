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



	$query = "SELECT l.ID,l.Username,l.Avatar,c.Content FROM COMMENT as c, login as l, place as p WHERE l.ID=c.ID_Login and p.ID=c.IDPlace and c.IDPlace=$id";

	$data = mysqli_query($conn,$query);

	$arrComment = array();
	while ($row=mysqli_fetch_assoc($data)) {
		array_push($arrComment, new COMMENT(
			$row['ID'],
			$row['Username'],
			$row['Avatar'],
			$row['Content']
		));
	}

	echo json_encode($arrComment);
	class COMMENT{
		function COMMENT($ID,$Username,$Avatar,$Content){
			$this->key=$ID;
			$this->Username=$Username;
			$this->Avatar=$Avatar;
			$this->Content=$Content;
		}
	}

	
	mysqli_close($conn);
?>