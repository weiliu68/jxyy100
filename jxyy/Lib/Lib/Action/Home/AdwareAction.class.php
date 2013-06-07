<?php
class AdwareAction extends HomeAction{
	public function index(){
		$id = $_GET['id'];
		if($id == 1){
			$this->display('ad1');
		}else if($id == 2){
			$this->display('ad2');
		}
	}
}
?>