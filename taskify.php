<?php
// Path to the file where tasks are stored
$tasksFile = 'tasks.txt';

// Fetch tasks
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($tasksFile)) {
        $tasks = file($tasksFile, FILE_IGNORE_NEW_LINES);
        echo json_encode($tasks);
    } else {
        echo json_encode([]);
    }
    exit;
}

// Save a new task
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $task = $_POST['task'];
    if ($task) {
        file_put_contents($tasksFile, $task . PHP_EOL, FILE_APPEND);
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error']);
    }
    exit;
}
?>
