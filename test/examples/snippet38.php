<?php
declare(strict_types=1);

namespace App\Domain\ConventionalCommit;

use JsonException;
use Exception;

class FilesUpdater
{
    public function __construct()
    {
        try {
            $content = json_decode($content, false, 512, JSON_THROW_ON_ERROR);
        } catch (JsonException | Exception $error) {
            throw new FileIsNotJson($file->getPath() . ' ' . $file->getName());
        }
    }
}