<?php
namespace App\Controllers;
use Core\Controller;
use Core\Models\ACL;
use App\Models\Users;
use Core\Lib\Utilities\Arr;
use Core\Models\UserSessions;
use Core\Services\ACLService;
use Core\Models\Notifications;
use Core\Models\ProfileImages;
use Core\Services\AuthService;
use Core\Services\UserService;
use Core\Models\EmailAttachments;
use Core\Lib\Pagination\Pagination;
use Core\Services\DashboardService;
use Core\Services\AttachmentService;
use Core\Services\NotificationService;

/**
 * Implements support for our Admindashboard controller.
 */
class AdmindashboardController extends Controller {
    /**
     * Displays list of attachments.
     *
     * @return void
     */
    public function attachmentsAction(): void {
        $attachments = EmailAttachments::find();
        $this->view->attachments = $attachments;
        $this->view->render('admindashboard.attachments', true, true);
    }

    /**
     * Displays details for a particular E-mail attachment.
     *
     * @param int $id Primary key for attachment record.
     * @return void
     */
    public function attachmentDetailsAction(int $id): void {
        $attachment = EmailAttachments::findById((int)$id);
        $this->view->uploader = AttachmentService::attachmentUploader($attachment->user_id);
        $this->view->attachment = $attachment;
        $this->view->render('admindashboard.attachment_details', true, true);
    }

    /**
     * Deletes ACL from acl table.
     *
     * @param int $id The id for the ACL we want to delete.
     * @return void
     */
    public function deleteAclAction(): void {
        if($this->request->isPost()) {
            $this->request->csrfCheck();
            ACLService::deleteIfAllowed($this->request->get('id'));
        }
        redirect('admindashboard.manageAcls');
    }

    /**
     * Performs delete action on a user.
     *
     * @param integer $id The id for the user we want to delete.
     * @return void
     */
    public function deleteAction(int $id): void {
        if($this->request->isPost()) {
            $this->request->csrfCheck();
            UserService::deleteIfAllowed($id, false);
        }
        redirect('admindashboard');
    }

    /**
     * Deletes an attachment and sets deleted field in table to 1.
     *
     * @param int $id The primary key for the attachment's database 
     * record.
     * @return void
     */
    public function deleteAttachmentAction(int $id): void {
        $attachment = EmailAttachments::findById($id);
        AttachmentService::deleteAttachment($attachment);
        redirect('admindashboard.attachments');
    }

    /**
     * Deletes an image associated with a user's profile.
     *
     * @return void
     */
    public function deleteImageAction(): void {
        $resp = ['success' => false];
        if($this->request->isPost()) {
            $resp = UserService::deleteProfileImage($this->request);
        }
        $this->jsonResponse($resp);
    }

    /**
     * Presents information about a particular user's profile.
     *
     * @param int $id The id of the user whose details we want to view.
     * @return void
     */
    public function detailsAction($id): void {
        $user = Users::findById((int)$id);
        DashboardService::checkIfCurrentUser($user);
        $profileImage = ProfileImages::findCurrentProfileImage($user->id);
        $this->view->profileImage = $profileImage;
        $this->view->user = $user;
        $this->view->render('admindashboard.details', true, true);
    }

    /**
     * Supports ability to edit ACLs not assigned to a user through a web form.
     *
     * @param int|string $id The id of the ACL we want to modify.
     * @return void
     */
    public function editAclAction(int|string $id): void {
        $acl = ($id == 'new') ? new ACL() : ACL::findById((int)$id);
        ACLService::checkACL($acl);
    
        if ($this->request->isPost()) {
            $this->request->csrfCheck();
            if(ACLService::saveACL($acl, $this->request)) {
                flashMessage('info', "ACL record updated.");
                redirect('admindashboard.manageAcls');
            }
        }
    
        $this->view->displayErrors = $acl->getErrorMessages();
        $this->view->acl = $acl;
        $this->view->header = $acl->isNew() ? "Added ACL" : "Edit ACL";
        $this->view->render('admindashboard.edit_acl', true, true);
    }
    

    /**
     * Supports ability for administrators to edit user profiles.
     *
     * @param int $id The id of the user whose profile we want to modify.
     * @return void
     */
    public function editAction($id): void {
        $user = Users::findById((int)$id);
        DashboardService::checkIfCurrentUser($user);
    
        $this->view->user = $user;
    
        // Fetch all available ACLs
        $acls = ACL::getOptionsForForm();
        $this->view->acls = $acls;
    
        // Decode stored ACL JSON string into an array
        $userAcls = ACLService::aclToArray(json_decode($user->acl, true));

        $this->view->userAcls = Arr::map($userAcls, 'strval'); // Ensure values are strings
        $profileImages = ProfileImages::findByUserId($user->id);
    
        if ($this->request->isPost()) {
            $this->request->csrfCheck();
            $user->assign($this->request->get(), Users::blackListedFormKeys);
    
            // Handle ACL updates from checkboxes
            ACLService::updateUserACLs($user, $userAcls, $acls, $_POST['acls']);
            
            if ($user->save()) {
                ProfileImages::updateSortByUserId($user->id, json_decode($_POST['images_sorted']));
                redirect('admindashboard.details', [$user->id]);
            }
        }
    
        $this->view->profileImages = $profileImages;
        $this->view->displayErrors = $user->getErrorMessages();
        $this->view->postAction = route('admindashboard.edit', [$user->id]);
        $this->view->render('admindashboard.edit', true, true);
    }

    /**
     * Creates or edits the details of an existing E-mail attachment.
     *
     * @param int|string $id The primary key for the record associated with an 
     * E-mail attachment.
     * @return void
     */
    public function editAttachmentsAction(int|string $id): void {
        $attachment = ($id == 'new') ? new EmailAttachments() : 
            EmailAttachments::findById((int)$id);

        if($this->request->isPost()) {
            $this->request->csrfCheck();
            AttachmentService::processAttachment($attachment, $this->request);
            if($attachment->validationPassed()) {
                redirect('admindashboard.attachments');
            }
        }

        $this->view->attachment = $attachment;
        $this->view->errors = $attachment->getErrorMessages();
        $this->view->uploadMessage = $attachment->isNew() ? "Upload file" : "Update Attachment";
        $this->view->header = $attachment->isNew() ? "Added Attachment" : "Edit Attachment";
        $this->view->render('admindashboard/attachments_form', true, true);
    }

    /** 
     * The default action for this controller.  It performs rendering of this 
     * site's admin dashboard page.
     * 
     * @return void
     */
    public function indexAction(): void {
        // Determine current page
        $page = Pagination::currentPage($this->request);
        $pagination = new Pagination($page, 10, DashboardService::totalUserCountExceptCurrent());
        $users = DashboardService::paginateUsers($pagination);

        $this->view->pagination = Pagination::pagination($page, $pagination->totalPages());
        $this->view->users = $users;
        $this->view->render('admindashboard.index', true, true);
    }

    /**
     * Renders view for managing ACLs.
     *
     * @return void
     */
    public function manageACLsAction(): void {
        $this->view->usedAcls = ACLService::usedACLs();
        $this->view->unUsedAcls = ACLService::unUsedACLs();
        $this->view->render('admindashboard.manage_acls', true, true);
    }

    /**
     * Runs when the object is constructed.
     *
     * @return void
     */
    public function onConstruct(): void {
        $this->view->setLayout('admin');
    }

    /**
     * Previews an attachment
     *
     * @param int $id The primary key for the record of the attachment.
     * @return void
     */
    public function previewAction(int $id): void {
        AttachmentService::previewAttachment($id);
    }

    /**
     * Support ability to toggle on or off the reset password flag for a 
     * particular user.
     *
     * @param int $id The id of the user whose reset password flag we want to 
     * modify.
     * @return void
     */
    public function setResetPasswordAction($id) {
        $user = Users::findById((int)$id);
        $resetPW = $user->reset_password;
        DashboardService::checkIfCurrentUser($user);

        if($this->request->isPost()) {
            $this->request->csrfCheck();
            $user->assign($this->request->get(), Users::blackListedFormKeys);
            //$shouldSendEmail = UserService::toggleResetPassword($user, $this->request, $resetPW);
            if($user->save()) {
                //UserService::sendWhenSetToResetPW($user, $shouldSendEmail);
                redirect('admindashboard.details', [$user->id]);
            }
        }

        $this->view->user = $user;
        $this->view->displayErrors = $user->getErrorMessages();
        $this->view->postAction = route('admindashboard.setResetPassword', [$user->id]);
        $this->view->render('admindashboard.set_reset_password', true, true);
    }

    /**
     * Sets active status for a particular user.  The administrator can 
     * toggle the setting on or off using a web form.
     *
     * @param int $id The id of the user we want to activate or inactivate.
     * @return void
     */
    public function setStatusAction($id) {
        $user = Users::findById((int)$id);
        $inactive = $user->inactive;
        DashboardService::checkIfCurrentUser($user);

        if($this->request->isPost()) {
            $this->request->csrfCheck();
            $user->assign($this->request->get(), Users::blackListedFormKeys);
            $shouldSendEmail = UserService::toggleAccountStatus($user, $this->request, $inactive);
            if($user->save()) {
                UserService::sendWhenSetToInactive($user, $shouldSendEmail);
                redirect('admindashboard.details', [$user->id]);
            }
        }

        $this->view->user = $user;
        $this->view->displayErrors = $user->getErrorMessages();
        $this->view->postAction = route('admindashboard.setStatus', [$user->id]);
        $this->view->render('admindashboard.set_account_status', true, true);
    }
}