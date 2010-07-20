<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{
	/**
	 * Initilize the Zend Autoloader
	 * @return Zend_Application_Module_Autoloader
	 */
	protected function _initAutoload() {
        $autoloader = new Zend_Application_Module_Autoloader(array(
            'namespace' => 'Default_',
            'basePath'  => dirname(__FILE__),
        ));
        return $autoloader;
    }

	/**
	 * Initilize the Zend Registry
	 * @return Zend_Registry
	 */
	protected function _initRegistry() {
	    $registry = new Zend_Registry();

		// List of all US states
		$registry["us_states"] = array('AL'=>"Alabama",'AK'=>"Alaska",'AZ'=>"Arizona",'AR'=>"Arkansas",'CA'=>"California",'CO'=>"Colorado",'CT'=>"Connecticut",'DE'=>"Delaware",'DC'=>"District Of Columbia",'FL'=>"Florida",'GA'=>"Georgia",'HI'=>"Hawaii",'ID'=>"Idaho",'IL'=>"Illinois", 'IN'=>"Indiana", 'IA'=>"Iowa",  'KS'=>"Kansas",'KY'=>"Kentucky",'LA'=>"Louisiana",'ME'=>"Maine",'MD'=>"Maryland", 'MA'=>"Massachusetts",'MI'=>"Michigan",'MN'=>"Minnesota",'MS'=>"Mississippi",'MO'=>"Missouri",'MT'=>"Montana",'NE'=>"Nebraska",'NV'=>"Nevada",'NH'=>"New Hampshire",'NJ'=>"New Jersey",'NM'=>"New Mexico",'NY'=>"New York",'NC'=>"North Carolina",'ND'=>"North Dakota",'OH'=>"Ohio",'OK'=>"Oklahoma", 'OR'=>"Oregon",'PA'=>"Pennsylvania",'RI'=>"Rhode Island",'SC'=>"South Carolina",'SD'=>"South Dakota",'TN'=>"Tennessee",'TX'=>"Texas",'UT'=>"Utah",'VT'=>"Vermont",'VA'=>"Virginia",'WA'=>"Washington",'WV'=>"West Virginia",'WI'=>"Wisconsin",'WY'=>"Wyoming");

		// Load our configuration file
		$registry["config"] = new Zend_Config_Ini(APPLICATION_PATH . "/configs/config.ini", APPLICATION_ENV);

		// US Timezones
		$registry["timezones"] = array(
			"America/Juneau"=>"Alaska",
			"America/Phoenix"=>"Arizona",
			"Pacific/Honolulu"=>"Hawaii-Aleutian",
			"America/Seattle"=>"Pacific",
			"America/Denver"=>"Mountain",
			"America/Chicago"=>"Central",
			"America/New_York"=>"Eastern",
			"America/Manaus"=>"Atlantic"
		);

		Zend_Registry::setInstance($registry);
		return $registry;
	}

	/**
	 * Set up our application libraries for autoloading
	 * @return Zend_Loader_Autoloader
	 */
	protected function _initLibraries () {
    	$autoloader = Zend_Loader_Autoloader::getInstance();

    	// Application library
    	$autoloader->registerNamespace('App_');

		// Doctrine 1.2
		$autoloader->registerNamespace('Doctrine_');

		$autoloader->suppressNotFoundWarnings(true);
		return $autoloader;
	}

	/**
	 * Set up our Controller and View helpers
	 * @return Zend_View
	 */
	protected function _initHelpers() {
		// Controller Action Helper
		Zend_Controller_Action_HelperBroker::addPrefix("App_Controller_Helper");

		// View Helper
		$this->bootstrap('view');
		$view = $this->getResource('view');
		$view->doctype('XHTML1_STRICT');
		$view->addHelperPath(APPLICATION_PATH . "/../library/App/View/Helper/","App_View_Helper");
		return $view;
	}

	/**
	 * Start the Zend Session
	 */
    protected function _initSession() {
    	Zend_Session::start();
    }

	/**
	 * Make the Zend Framework modular in structure.
	 */
    protected function _initModules() {
    	$front = Zend_Controller_Front::getInstance();
		/*
		 * Enable throwing exception
		 * instead of built in error Zf Error Contorller
		 */
		$front->throwExceptions(true);
		$front->setModuleControllerDirectoryName('controllers');
		$front->addModuleDirectory(APPLICATION_PATH . '/modules');
    }

	/**
	 * Set the default timezone.
	 */
    protected function _initTimezone() {
    	date_default_timezone_set('America/Phoenix');
    }

	/**
	 * Setup the Doctrine ORM
	 * @return Doctrine_Manager
	 */
	protected function _initDoctrine() {
		$database_path = APPLICATION_PATH . "/../library/App/Db/Sqlite/database.sqlite";
		$data_source_name = "sqlite:///" . $database_path;
		if (is_file($database_path)) {
			Doctrine_Manager::connection($data_source_name);
			$manager = Doctrine_Manager::getInstance();
			$manager->setAttribute(Doctrine_Core::ATTR_MODEL_LOADING, Doctrine_Core::MODEL_LOADING_PEAR);
			$manager->setAttribute(Doctrine_Core::ATTR_VALIDATE, Doctrine_Core::VALIDATE_ALL);
			$manager->setAttribute(Doctrine_Core::ATTR_AUTOLOAD_TABLE_CLASSES, true);
			// $manager->setAttribute(Doctrine_Core::ATTR_TABLE_CLASS, "App_Table");
			return $manager;
		}
    }

	/**
	 * Create custom routes
	 */
	protected function _initRoutes() {
		$router = Zend_Controller_Front::getInstance()->getRouter();
		$lab_route = new Zend_Controller_Router_Route(
			"/:code",
			array(
				"module"=>"default",
				"controller"=>"lab",
				"action"=>"index"
			)
		);
		$router->addRoute("lab", $lab_route);
	}
}