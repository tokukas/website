<?php

namespace App\Http\Controllers;

use App\Exports\AddBulkTemplate\Export as AddBulkTemplateExport;
use Illuminate\Http\Request;

class BulkController extends Controller
{
    /**
     * Download the add bulk template.
     */
    public function downloadAddBulkTemplate(Request $request)
    {
        return (new AddBulkTemplateExport())->download(
            'add-bulk-template-'.now()->toDateString().'.xlsx'
        );
    }
}
