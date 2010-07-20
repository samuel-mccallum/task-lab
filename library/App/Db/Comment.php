<?php
/* 
 * Created by Palo Verde Programming Services, LLC.
 * All rights reserved unless otherwise specified under contract.
 * http://palo-verde.us/
 * @author Sam McCallum <sam@palo-verde.us>
 * @copyright Jun 25, 2010
 */

/**
 * Description of Comment
 *
 * @author Sam McCallum <sam@palo-verde.us>
 */
class App_Db_Comment extends Doctrine_Record {
	public function setTableDefinition() {
		$this->setTableName("comment");
		$this->hasColumn("task_id", "integer");
		$this->hasColumn("author", "string", null, array("notblank"=>true));
		$this->hasColumn("body", "string", null, array("notblank"=>true));
		$this->HasColumn("created_on");
	}
}
?>
