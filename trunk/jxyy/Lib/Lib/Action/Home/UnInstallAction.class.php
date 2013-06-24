<?php
class UnInstallAction extends AllAction{
	public function index(){
		if($_GET['mid']!=""){
			$rs = M("Client");
			$data['client_mv'] = $_GET['mid'];
			$data['client_addtime'] = time();
			$data['client_type'] = 2;
			$data['client_ip'] = get_client_ip();
			$resule = $rs->add($data);
		}
	}
}
?>
