<?php
/* 
 * Created by Palo Verde Programming Services, LLC.
 * All rights reserved unless otherwise specified under contract.
 * http://palo-verde.us/
 * @author Sam McCallum <sam@palo-verde.us>
 * @copyright Jun 29, 2010
 */

/**
 * Description of Task
 *
 * @author Sam McCallum <sam@palo-verde.us>
 */
class App_Service_Task {
	const ERROR_NOT_VALID = "Hmm, looks like the database really doesn't like something about your task. Check the values and try again.";
	const ERROR_SAVE_FAILED = "Uh oh, looks like the database is having problems.  Your task wasn't saved, sorry.";
	const ERROR_INVALID_STATUS = "Can't find the status you selected.";

	public $db;

	public function __construct() {
		$this->db = Doctrine_Core::getTable("App_Db_Task");
	}

	protected function resolve_status($received_status) {
		/*
		 * Status value 0=queued, 1=current, 2=complete
		 */
		$statuses = Doctrine_Core::getTable("App_Db_Status");

		switch ($received_status) {
			case 0:
				$status_name = "queued";
			break;

			case 1:
				$status_name = "in progress";
			break;

			case 2:
				$status_name = "completed";
			break;
		}
		
		$status = $statuses->findOneByName($status_name);
		if ($status)
			return $status->id;
		throw new Exception(self::ERROR_INVALID_STATUS);
	}

	public function create($lab_id, $name, $description, $status) {
		$task = $this->db->create();
		$task->lab_id = $lab_id;
		$task->name = $name;
		$task->description = $description;
		$task->status_id = $this->resolve_status($status);

		if ($task->isValid()) {
			try {
				$task->save();
			} catch (Exception $e) {
				throw new Exception(self::ERROR_SAVE_FAILED);
			}
		} else {
			throw new Exception(self::ERROR_NOT_VALID);
		}

		return $task->toArray();
	}

	public function findByLabId($lab_id) {
		$tasks = $this->db->findByLabId($lab_id);
		return $tasks->toArray();
	}

    public function update($task) {
        
    }

    public function change_status($task_id, $task_status) {
        $valid_statuses = array(
            "queued",
            "current",
            "completed"
        );
        $status_map = array(
            "queued"=>"0",
            "current"=>"1",
            "completed"=>"2"
        );

        if (in_array($task_status, $valid_statuses)) {
            $status = $status_map[$task_status];
            $task = $this->db->find($task_id);
            $task->status_id = $this->resolve_status($status);
            $task->save();
            return $task->toArray();
        }

        throw new Exception("Could not update task status.");
    }

    public function destory($task_id) {
        $this->db->find($task_id)->delete();
        return array("id"=>$task_id);
    }
}
?>
