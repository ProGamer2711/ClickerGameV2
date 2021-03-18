<?php

    $config = fopen('./config.json', 'r') or die('File "config.json" not found.');
    $text = fread($config, filesize('./config.json'));
    $json = json_decode($text);
    $json_db = $json->database;

    $mysqli = new mysqli($json_db->hostname, $json_db->username, $json_db->password, $json_db->database, $json_db->port);
    
    if($mysqli->connect_error){
        die('Connection failed: '.$mysqli->connect_error);
    } 
?>