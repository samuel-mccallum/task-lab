<?php
/* 
 * Created by Palo Verde Programming Services, LLC.
 * All rights reserved unless otherwise specified under contract.
 * http://palo-verde.us/
 * @author Sam McCallum <sam@palo-verde.us>
 * @copyright Jun 28, 2010
 */

/**
 * Description of Lab
 *
 * @author Sam McCallum <sam@palo-verde.us>
 */
class App_Service_Lab {
	const ERROR_INVALID_NAME = "The lab name you entered is invalid.";
	const ERROR_NOT_SAVED= "Uh oh, Looks like there was a problem and your lab can't be saved to the database.";
	const ERROR_NOT_VALID = "Hmm, looks like your lab data isn't valid.  Why don't you try another name?";

	/**
	 * The Lab Table
	 * @var Doctrine_Table $db
	 */
	public $db;

	/**
	 * Initialize the service
	 */
	public function __construct() {
		$this->db = Doctrine_Core::getTable("App_Db_Lab");
	}

	/**
	 * Create a new lab
	 * @param <type> $name
	 * @return <type>
	 */
    public function create($name) {
		if ($name == "")		
			throw new Exception(self::ERROR_INVALID_NAME);
	
		$code_generator = new App_Value_Code();

		do {
			$code = $code_generator->get();
		} while ($this->db->findByCode($code)->count() != 0);

		$lab = $this->db->create();
		$lab->name = $name;
		$lab->code = $code;

		if ($lab->isValid()) {
			try {
				$lab->save();
			} catch (Exception $e) {
				throw new Exception(self::ERROR_NOT_SAVED);
			}
		} else {
			throw new Exception(self::ERROR_NOT_VALID . $lab->getErrorStackAsString());
		}
		return $lab->toArray();
	}
}