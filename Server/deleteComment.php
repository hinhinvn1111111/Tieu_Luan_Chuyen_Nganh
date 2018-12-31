<?php
	$localhost = "localhost";
	$usn = "root";
	$password = "";
	$database = "tlcn_findnearplace";
	$conn = mysqli_connect($localhost,$usn,$password,$database);
	mysqli_set_charset($conn,'utf8');
	
	$json = file_get_contents('php://input');

	$obj = json_decode($json,true);

	$IDL = $obj['IDL'];
	$IDP = $obj['IDP'];
	$Content = $obj['content'];

	//$pw = $obj['pw'];



	$query = "DELETE FROM comment WHERE ID_Login=$IDL AND IDPlace=$IDP AND Content='$Content'";

	$data = mysqli_query($conn,$query);

	$query1 = "SELECT l.ID,l.Username,l.Avatar,c.Content FROM COMMENT as c, login as l, place as p WHERE l.ID=c.ID_Login and p.ID=c.IDPlace and c.IDPlace=$IDP";

	$data1 = mysqli_query($conn,$query1);

	$arrComment = array();
	while ($row=mysqli_fetch_assoc($data1)) {
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