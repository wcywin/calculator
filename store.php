<?php

    // Allow CORS
    header("Access-Control-Allow-Origin: *");

    // Chceck if sum is provided
    if(isset($_POST['sum'])) {
        $sum = htmlspecialchars($_POST['sum']);

        // Try to get IP address via different methods
        if(!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        } elseif(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            $ip = $_SERVER['REMOTE_ADDR'];
        }

        // Get current datetime
        $date = date('d.m.y H:i:s');

        // Get browser, replace all ',' with ';' since we will use ',' as delimiter in *.csv file
        $browser = str_replace(',', ';', $_SERVER['HTTP_USER_AGENT']);

        // Open file for appending and write the results
        $out = fopen('results.csv', 'a');
        fputcsv($out, [
            $sum,
            $ip,
            $date,
            $browser
        ]);
        fclose($out);

        echo json_encode(['success' => 'Your result has been saved!']);
    } else {
        echo json_encode(['error' => 'Please provide sum from calculator']);
    }

?>