<?php
class InstallAction extends AllAction{
	public function index(){
		$mv = $_GET['mv'];
		$pid = $_GET['pid'];
		$mid = $_GET['mid'];
		$t = $_GET['t'];
		$sign = $_GET['sign'];
		
		$calcSign = md5("Jimv="+$mv+"&pid="+$pid+"&mid="+$mid+"&t="+$timestamp+"Xun");
		
		if($sign == $calcSign){
			//写数据库
		}
	}
}
?>