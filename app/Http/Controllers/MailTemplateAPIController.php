<?php

namespace App\Http\Controllers;

use App\Http\Requests\MailTemplateUpdateRequest;
use App\Http\Resources\MailCollection;
use App\Http\Resources\MailResource;
use App\Models\MailTemplate;
use App\Repositories\MailRepository;
use Illuminate\Http\Request;

class MailTemplateAPIController extends AppBaseController
{

    /** @var  mailRepository */
    private $mailRepository;

    public function __construct(MailRepository $mailRepository)
    {
        $this->mailRepository = $mailRepository;
    }

    /**
     * @param Request $request
     *
     *
     * @return MailCollection
     */
    public function index(Request $request)
    {
        $input = $request->except(['skip', 'limit']);
        $mailTemplates = $this->mailRepository->all(
            $input,
            $request->get('skip'),
            $request->get('limit')
        );

        // $perPage = getPageSize($request);

        // $mailTemplates = $this->mailRepository;

        // $mailTemplates = $mailTemplates->paginate($perPage);

        MailResource::usingWithCollection();

        return new MailCollection($mailTemplates);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }


    /**
     * @param MailTemplate $mailTemplate
     *
     *
     * @return MailResource
     */
    public function edit(MailTemplate $mailTemplate)
    {
        return new MailResource($mailTemplate);
    }


    /**
     * @param MailTemplateUpdateRequest $request
     * @param $id
     *
     *
     * @return MailResource
     */
    public function update(MailTemplateUpdateRequest $request, $id)
    {
        $input = $request->all();

        $mailTemplate = $this->mailRepository->updateMailTemplate($input, $id);

        return new MailResource($mailTemplate);
    }


    /**
     * @param $id
     *
     *
     * @return MailResource
     */
    public function changeActiveStatus($id)
    {
        $mailTemplate = MailTemplate::findOrFail($id);
        $status = !$mailTemplate->status;
        $mailTemplate->update(['status' => $status]);

        return new MailResource($mailTemplate);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
