<?php
namespace App\Controllers;
use Core\Controller;

/**
 * Undocumented class
 */
class HourlyController extends Controller {
    public function indexAction(): void {
        $this->view->renderJsx('hourly.Index');
    }

    /**
     * Runs when the object is constructed.
     *
     * @return void
     */
    public function onConstruct(): void {
        $this->view->setLayout('default');
    }
}
