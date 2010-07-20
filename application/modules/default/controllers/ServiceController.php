<?php
/* 
 * Created by Palo Verde Programming Services, LLC.
 * All rights reserved unless otherwise specified under contract.
 * http://palo-verde.us/
 * @author Sam McCallum <sam@palo-verde.us>
 * @copyright Jun 28, 2010
 */

/**
 * Description of ServiceController
 *
 * @author Sam McCallum <sam@palo-verde.us>
 */
class ServiceController extends Zend_Controller_Action {

	/**
	 * The lab service
	 */
    public function labAction() {
		$this->service("App_Service_Lab");
	}

	/**
	 * The task service
	 */
	public function taskAction() {
		$this->service("App_Service_Task");
	}

	/**
	 * Start a JSON-RPC server, passing the handler class.
	 * @param string $service_class
	 */
	public function service($service_class) {
		$request = new Zend_Json_Server_Request();
		$request->setOptions(array(
			"method"=>$this->_request->getParam("method"),
			"id"=>$this->_request->getParam("id"),
			"params"=>$this->_request->getParam("params")
		));

		$server = new Zend_Json_Server();
		$server->setClass($service_class);
		$server->handle($request);
		exit();
	}
}