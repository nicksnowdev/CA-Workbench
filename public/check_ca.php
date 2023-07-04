<?php
include 'db_connection.php';
$rule = $_GET["rule"];
$conn = OpenCon();
$result = $conn->query("SELECT * FROM `published_cas` WHERE `rule`='$rule'");
echo json_encode($result->fetch_assoc());
CloseCon($conn);
?>