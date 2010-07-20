<?php
/* 
 * Created by Palo Verde Programming Services, LLC.
 * All rights reserved unless otherwise specified under contract.
 * http://palo-verde.us/
 * @author Sam McCallum <sam@palo-verde.us>
 * @copyright Jun 25, 2010
 */

/**
 * Description of Task
 *
 * @author Sam McCallum <sam@palo-verde.us>
 */
class App_Db_Task extends Doctrine_Record {
	public function setTableDefinition() {
		$this->setTableName("task");
		$this->hasColumn("lab_id", "integer");
		$this->hasColumn("status_id", "integer");
		$this->hasColumn("name", "string");
		$this->hasColumn("description", "string");
		$this->hasColumn("sort_order", "integer");
		$this->hasColumn("created_on");
	}

	public function setUp() {
		$this->hasOne("App_Db_Lab as lab",
			array(
				"foreign"=>"id",
				"local"=>"lab_id"
			)
		);

		$this->hasOne("App_Db_Status as status",
			array(
				"foreign"=>"id",
				"local"=>"status_id"
			)
		);
	}
}
?>
