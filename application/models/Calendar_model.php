CREATE TABLE `calendar_events` (
 `ID` int(11) NOT NULL,
 `title` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
 `start` datetime NOT NULL,
 `end` datetime NOT NULL,
 `description` varchar(1000) COLLATE utf8_unicode_ci NOT NULL
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci


<?php

class Calendar_Model extends CI_Model
{
public function get_events($start, $end)
{
    return $this->db->where("start >=", $start)->where("end <=", $end)->get("calendar_events");
}

public function add_event($data)
{
    $this->db->insert("calendar_events", $data);
}

public function get_event($id)
{
    return $this->db->where("ID", $id)->get("calendar_events");
}

public function update_event($id, $data)
{
    $this->db->where("ID", $id)->update("calendar_events", $data);
}

public function delete_event($id)
{
    $this->db->where("ID", $id)->delete("calendar_events");
}

}

?>
