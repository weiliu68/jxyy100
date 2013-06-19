<?php 
class ClientModel extends Model {
	protected $_validate = array(
		array('mv','require',''),
	);
}
?>