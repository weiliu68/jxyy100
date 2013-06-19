<?php
class UnInstallAction extends AllAction{
	public function index(){
		if($_GET['mv']!=""){
			$rs = M("Client");
			$data['client_mv'] = $_GET['mv'];
			$data['client_addtime'] = time();
			$data['client_type'] = 2;
			$resule = $rs->add($data);
		}
	}
}
?>