<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\EventsModel;

class EventsController extends BaseController
{
    public function __construct()
    {
        helper(["html"]);
    }


    public function index()
    {
        return view('events/fullcalendar');
    }

    public function loadData()
    {
        $event = new EventsModel();

        // onpage load this ajax code block will be run
        $data = $event->where([
            'start >=' => $this->request->getVar('start'),
            'end <=' => $this->request->getVar('end'),
        ])->findAll();

        return json_encode($data);
    }


    public function ajax()
    {
        $event = new EventsModel();

        switch ($this->request->getVar('type')) {
                // for add event
            case 'add':
                $data = [
                    'title' => $this->request->getVar('title'),
                    'start' => $this->request->getVar('start'),
                    'end' => $this->request->getVar('end'),
                ];
                $event->insert($data);
                return json_encode($event);
                break;

                // for update event
            case 'update':
                $data = [
                    'title' => $this->request->getVar('title'),
                    'start' => $this->request->getVar('start'),
                    'end' => $this->request->getVar('end'),
                ];

                $event_id = $this->request->getVar('id');

                $event->update($event_id, $data);

                return json_encode($event);
                break;
                // for delete event
            case 'delete':
                $event_id = $this->request->getVar('id');

                $event->delete($event_id);

                return json_encode($event);
                break;
            default:
                break;
        }
    }
}
