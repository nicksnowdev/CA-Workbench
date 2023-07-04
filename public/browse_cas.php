<?php
include 'db_connection.php';
$num = $_GET["num"];
$edgeID = $_GET["edgeID"];
$seek = $_GET["seek"];
$sort = $_GET["sort"];
$conn = OpenCon();
switch ($sort) {
  case "newest":
    if($num > -1) {
      switch ($seek) {
        case "older":
          if($edgeID > -1) {
            $sql = "SELECT * FROM published_cas WHERE id < ? ORDER BY id DESC LIMIT ?";
            $statement = $conn->prepare($sql);
            $statement->bind_param('ii', $edgeID, $num);
            $statement->execute();
            $result = $statement->get_result();
          } else {
            $sql = "SELECT * FROM published_cas ORDER BY id DESC LIMIT ?";
            $statement = $conn->prepare($sql);
            $statement->bind_param('i', $num);
            $statement->execute();
            $result = $statement->get_result();
          }
          break;
        case "newer":
          $sql = "SELECT * FROM published_cas WHERE id > ? ORDER BY id ASC LIMIT ?";
          $statement = $conn->prepare($sql);
          $statement->bind_param('ii', $edgeID, $num);
          $statement->execute();
          $result = $statement->get_result();
          break;
      }
    } else {
      $result = $conn->query("SELECT * FROM `published_cas` ORDER BY id DESC");
    }
    break;
  case "oldest":
    if($num > -1) {
      switch ($seek) {
        case "older":
          if($edgeID > -1) {
            $sql = "SELECT * FROM published_cas WHERE id < ? ORDER BY id DESC LIMIT ?";
            $statement = $conn->prepare($sql);
            $statement->bind_param('ii', $edgeID, $num);
            $statement->execute();
            $result = $statement->get_result();
          } else {
            $sql = "SELECT * FROM published_cas ORDER BY id ASC LIMIT ?";
            $statement = $conn->prepare($sql);
            $statement->bind_param('i', $num);
            $statement->execute();
            $result = $statement->get_result();
          }
          break;
        case "newer":
          $sql = "SELECT * FROM published_cas WHERE id > ? ORDER BY id ASC LIMIT ?";
          $statement = $conn->prepare($sql);
          $statement->bind_param('ii', $edgeID, $num);
          $statement->execute();
          $result = $statement->get_result();
          break;
      }
    } else {
      $result = $conn->query("SELECT * FROM `published_cas` ORDER BY id ASC");
    }
    break;
}
echo json_encode($result->fetch_all(MYSQLI_ASSOC));
CloseCon($conn);
?>