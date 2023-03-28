<?php

namespace App\Http\Controllers;

use App\Exports\AddBulkTemplate\Export as AddBulkTemplateExport;
use App\Imports\AddBulk\Import as AddBulkImport;
use App\Traits\FlashStatus;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;
use Maatwebsite\Excel\Exceptions\NoFilePathGivenException;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class BulkController extends Controller
{
    use FlashStatus;

    /**
     * Download the add bulk template.
     */
    public function downloadAddBulkTemplate(Request $request): Response|BinaryFileResponse
    {
        return (new AddBulkTemplateExport())->download(
            'add-bulk-template-'.now()->toDateString().'.xlsx'
        );
    }

    /**
     * Upload the add bulk template.
     */
    public function uploadAddBulkTemplate(Request $request)
    {
        try {
            (new AddBulkImport())->import($request->file('template'));
            $this->setFlashSuccess('File uploaded successfully');
        } catch (NoFilePathGivenException $th) {
            $this->setFlashError('File failed to upload');
        } catch (ValidationException $th) {
            $this->setFlashError($th->getMessage());
        }

        return redirect()->back();
    }
}
