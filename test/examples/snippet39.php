<?php
declare(strict_types=1);

/**
 * Using classes inside a method and foreach
 */

namespace App\Domain\ConventionalCommit;

use App\Domain\DomainException\FileIsNotJson;
use JsonException;

class FilesUpdater
{
    public function makeRelease()
    {
        foreach ($files as $file) {
            try {
                $content = json_decode($content, false, 512, JSON_THROW_ON_ERROR);
            } catch (JsonException $error) {
                throw new FileIsNotJson($file->getPath() . ' ' . $file->getName());
            }
        }
    }
}