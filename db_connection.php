<?php

    $hostname = '127.0.0.1';
    $username = 'root';
    $password = '';
    $database = 'clickergamev2';

    $mysqli = new mysqli($hostname, $username, $password, $database);
    
    if($mysqli->connect_error){
        die('Connection failed: '.$mysqli->connect_error);
    }
?>