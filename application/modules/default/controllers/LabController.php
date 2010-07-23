<?php
/* 
 * Created by Palo Verde Programming Services, LLC.
 * All rights reserved unless otherwise specified under contract.
 * http://palo-verde.us/
 * @author Sam McCallum <sam@palo-verde.us>
 * @copyright Jun 28, 2010
 */

/**
 * Description of LabController
 *
 * @author Sam McCallum <sam@palo-verde.us>
 */
class LabController extends Zend_Controller_Action {
	const ERROR_NO_CODE = "No lab code present.";
	const ERROR_INVALID_CODE = "The lab code is invlaid.";

	/**
	 * @var Doctrine_Table
	 */
	public $db;

	/**
	 * Initialize our controller
	 */
	public function init() {
		$this->db = Doctrine_Core::getTable("App_Db_Lab");
	}

	/**
	 * Our index action, show a lab.
	 */
	public function indexAction() {
		$this->view->headScript()
			->appendFile("/js/taffydb/taffy.js")
			->appendFile("/js/labs/views/task.js")
			->appendFile("/js/labs/models/task.js")
			->appendFile("/js/labs/controllers/add_task.js")
			->appendFile("/js/labs/controllers/task_list.js");

		// Check for a code
		if (!$this->_request->has("code"))
			throw new Exception(self::ERROR_NO_CODE, 404);

		// get the passed code
		$code = $this->_request->getParam("code");
		$lab = $this->db->findOneByCode($code);

		// check if the code is valid
		if (!($lab instanceOf App_Db_Lab))
			throw new Exception(self::ERROR_INVALID_CODE, 404);

		$this->view->lab = $lab;

        $this->view->headTitle($lab->name);
	}

    public function taskAction() {
        $this->_helper->layout->disableLayout();
    }
}
?>
