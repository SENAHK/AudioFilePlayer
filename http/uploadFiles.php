<?php

require './db.php';
session_start();
$data = $_POST['data'];

if (isset($data)) {
    echo 0;
}else{
    echo "ok";
}