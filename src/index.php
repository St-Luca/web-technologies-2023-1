<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Photo Gallery</title>
</head>

<body>
    <h1>Photo Gallery</h1>

    <h2>Upload New Image</h2>
    <form action="upload.php" method="post" enctype="multipart/form-data">
        <input type="file" name="image" accept="image/*" required>
        <button type="submit" name="submit">Upload</button>
    </form>

    <?php
    function buildGallery($imageDirectory)
    {
        $images = glob($imageDirectory . '/thumbnail_*.{jpg,jpeg,png,gif}', GLOB_BRACE);

        echo '<div style="display: flex; flex-wrap: wrap;">';
        foreach ($images as $thumbnail) {
            $originalImage = str_replace('thumbnail_', '', $thumbnail);

            echo '<a href="' . $originalImage . '" target="_blank"><img src="' . $thumbnail . '" style="margin: 5px;"></a>';
        }
        echo '</div>';
    }

    $imageDirectory = 'images/';
    buildGallery($imageDirectory);
    ?>
</body>

</html>