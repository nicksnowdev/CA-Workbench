<?php
include 'db_connection.php';
$rule = $_GET["rule"];
$title = $_GET["title"];
$iterations = $_GET["iterations"];
$init = $_GET["init"];
$user = $_GET["user"];
$conn = OpenCon();
$sql = "INSERT INTO published_cas (rule, title, iterations, init, user, date)
VALUES ('$rule', '$title', '$iterations', '$init', '$user', CURDATE());";
if($conn->query($sql) === TRUE) {
  echo "upload successful";
  mail("nicksnowdev@gmail.com","New CA '" . $title . "'","View '" . $title . "' at:\nhttps://ca-workbench.com?rule=" . $rule);
} else {
  echo "Error: \n" . $sql . "\n" . $conn->error;
}
CloseCon($conn);
?>