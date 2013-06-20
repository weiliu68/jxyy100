<?php
class InstallAction extends AllAction{
	public function index(){
		if($_GET['mid']!=""){
			$rs = M("Client");
			$data['client_mv'] = $_GET['mid'];
			$data['client_addtime'] = time();
			$data['client_type'] = 1;
			$resule = $rs->add($data);
		}
	}
}
?>
