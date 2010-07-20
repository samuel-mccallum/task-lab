<?php
/* 
 * Created by Palo Verde Programming Services, LLC.
 * All rights reserved unless otherwise specified under contract.
 * http://palo-verde.us/
 * @author Sam McCallum <sam@palo-verde.us>
 * @copyright Jun 25, 2010
 */

/**
 * Description of Status
 *
 * @author Sam McCallum <sam@palo-verde.us>
 */
class App_Db_Status extends Doctrine_Record {
	public function setTableDefinition() {
		$this->setTableName("status");
		$this->hasColumn("name", "string", null, array("unique"=>true, "notblank"=>true));
	}

	public function setUp() {
		$this->hasMany("App_Db_Task as tasks",
			array(
				"foreign"=>"status_id",
				"local"=>"id"
			)
		);
	}
}
?>
