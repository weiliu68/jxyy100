<?php
class AliveAction extends AllAction{
	public function index(){
		if($_GET['mv']!=""){
			$rs = M("Client");
			$data['client_mv'] = $_GET['mv'];
			$data['client_addtime'] = time();
			$data['client_type'] = 3;
			$resule = $rs->add($data);
		}
	}
}
?>