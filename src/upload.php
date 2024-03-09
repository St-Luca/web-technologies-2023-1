<?php
function logRequest()
{
    $logFile = 'log.txt';
    $logData = date('Y-m-d H:i:s') . "\n";

    $currentLog = file_get_contents($logFile);
    $logLines = explode("\n", $currentLog);
    $numLines = count($logLines);

    if ($numLines > 10) {
        $newLogFile = generateNewLogFileName();
        rename($logFile, $newLogFile);

        file_put_contents($logFile, '');
    }

    file_put_contents($logFile, $logData, FILE_APPEND | LOCK_EX);
}

function generateNewLogFileName()
{
    $logFiles = glob('log*.txt');
    $numArchives = count($logFiles);
    $newLogFileName = 'log' . $numArchives . '.txt';

    return $newLogFileName;
}

function resizeImage($sourceFile, $targetFile, $maxWidth, $maxHeight)
{
    list($sourceWidth, $sourceHeight, $sourceType) = getimagesize($sourceFile);

    switch ($sourceType) {
        case IMAGETYPE_JPEG:
            $sourceImage = imagecreatefromjpeg($sourceFile);
            break;
        case IMAGETYPE_PNG:
            $sourceImage = imagecreatefrompng($sourceFile);
            break;
        case IMAGETYPE_GIF:
            $sourceImage = imagecreatefromgif($sourceFile);
            break;
        default:
            return;
    }

    $aspectRatio = $sourceWidth / $sourceHeight;
    $targetWidth = $maxWidth;
    $targetHeight = $maxHeight;

    if ($aspectRatio > 1) {
        $targetHeight = $maxWidth / $aspectRatio;
    } else {
        $targetWidth = $maxHeight * $aspectRatio;
    }

    $targetImage = imagecreatetruecolor($targetWidth, $targetHeight);
    imagecopyresampled($targetImage, $sourceImage, 0, 0, 0, 0, $targetWidth, $targetHeight, $sourceWidth, $sourceHeight);

    switch ($sourceType) {
        case IMAGETYPE_JPEG:
            imagejpeg($targetImage, $targetFile);
            break;
        case IMAGETYPE_PNG:
            imagepng($targetImage, $targetFile);
            break;
        case IMAGETYPE_GIF:
            imagegif($targetImage, $targetFile);
            break;
    }

    imagedestroy($sourceImage);
    imagedestroy($targetImage);
}

if (isset($_POST['submit'])) {
    $targetDirectory = 'images/';
    $targetFile = $targetDirectory . basename($_FILES['image']['name']);
    $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

    $allowedTypes = ['jpg', 'jpeg', 'png', 'gif'];
    if (!in_array($imageFileType, $allowedTypes)) {
        echo 'Only JPG, JPEG, PNG, and GIF files are allowed.';
        exit;
    }

    if ($_FILES['image']['size'] > 5 * 1024 * 1024) {
        echo 'File size should not exceed 5MB.';
        exit;
    }

    $uploadedFile = $_FILES['image']['tmp_name'];
    $thumbnailFile = $targetDirectory . 'thumbnail_' . basename($_FILES['image']['name']);
    move_uploaded_file($uploadedFile, $targetFile);

    resizeImage($targetFile, $thumbnailFile, 200, 200);

    logRequest();
    header('Location: index.php');
    exit;
}
