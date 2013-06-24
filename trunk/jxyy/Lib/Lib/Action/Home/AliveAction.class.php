<?php
class AliveAction extends AllAction{
	public function index(){
		if($_GET['mid']!=""){
			$rs = M("Client");
			$data['client_mv'] = $_GET['mid'];
			$data['client_addtime'] = time();
			$data['client_type'] = 3;
			$data['client_ip'] = get_client_ip();
			import('ORG.Net.IpLocation');// 导入IpLocation类
			$Ip = new IpLocation(); // 实例化类
			$location = $Ip->getlocation(get_client_ip()); // 获取某个IP地址所在的位置
			$data['client_location'] = $location['country'];
			$resule = $rs->add($data);
		}
		$this->ajaxReturn(get_client_ip());
	}
}
?>
