<?php
namespace App\Controllers;
use Core\Controller;
use Core\Services\AuthService;

/**
 * Supports operations for rendering current conditions.  This is our 
 * DEFAULT_CONTROLLER.
 */
class CurrentController extends Controller {
    /** 
     * Home page that renders current conditions.
     * 
     * @return void
     */
    public function indexAction(): void {
        $user = AuthService::currentUser(); 
        unset($user->password);
        $props = ['user' => $user ?? null,];
        $this->view->renderJSX('current.Index', $props);
    }
}