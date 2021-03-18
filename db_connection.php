<?php

    $config = require('config.php');
    $config = $config['database'];

    $mysqli = new mysqli($config['hostname'], $config['username'], $config['password'], $config['database'], $config['port']);
    
    if($mysqli->connect_error){
        die('Connection failed: '.$mysqli->connect_error);
    } 
?>