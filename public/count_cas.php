<?php
include 'db_connection.php';
$conn = OpenCon();
$result = $conn->query("SELECT COUNT(*) FROM `published_cas`");
echo json_encode($result->fetch_assoc());
CloseCon($conn);
?>