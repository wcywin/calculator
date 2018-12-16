<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,700" rel="stylesheet">
    <link rel="stylesheet" href="css/styles.css">

    <title>Results - Calculator ITM</title>
</head>
<body>
    <h1>Results</h1>

    <?php
    // Get data from *.csv file as array
    $results = array_map('str_getcsv', file('results.csv'));

    // Reverse array to get newest results on top
    $reversed = array_reverse($results);
    ?>

    <table>
        <thead>
        <th>Sum</th>
        <th>IP</th>
        <th>Date</th>
        <th>Browser</th>
        </thead>

        <tbody>
        <?php
        // Loop through each row and cell and display it
        foreach($reversed as $row) {
            echo "\t<tr>\r\n";
            foreach($row as $cell) {
                echo "\t\t<td>$cell</td>\r\n";
            }
            echo "\t</tr>\r\n";
        }
        ?>
        </tbody>
    </table>

</body>
</html>