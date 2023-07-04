<?php
function OpenCon()
 {
 $dbhost = "mysql.s422.sureserver.com";
 $dbuser = "default";
 $dbpass = "cawblemon";
 $db = "caworkbench_app";
 $dbport = "3308";
 $conn = new mysqli($dbhost, $dbuser, $dbpass, $db, $dbport) or die("Connect failed: %s\n". $conn -> error);
 
 return $conn;
 }
 
function CloseCon($conn)
 {
 $conn -> close();
 }
   
?>