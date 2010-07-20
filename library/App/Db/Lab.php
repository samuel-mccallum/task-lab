<?php
/* 
 * Created by Palo Verde Programming Services, LLC.
 * All rights reserved unless otherwise specified under contract.
 * http://palo-verde.us/
 * @author Sam McCallum <sam@palo-verde.us>
 * @copyright Jun 25, 2010
 */

/**
 * Description of Lab
 *
 * @author Sam McCallum <sam@palo-verde.us>
 */
class App_Db_Lab extends Doctrine_Record {
	public function setTableDefinition() {
		$this->setTableName("lab");
		$this->hasColumn("name", "string", null, array("notblank"=>true));
		$this->hasColumn("code", "string", null, array("unique"=>true,"notblank"=>true));
		$this->hasColumn("created_on");
	}

	public function setUp() {
		$this->hasMany("App_Db_Task as tasks",
			array(
				"foreign"=>"lab_id",
				"local"=>"id"
			)
		);
	}
}