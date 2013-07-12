<?php
class ClientAction extends BaseAction{
	// 资源列表
	public function show(){
		$rs = M("client");
		$client = array();
		$client['continu'] = $_REQUEST['continu'];
		$client['type'] = !empty($_GET['type'])?$_GET['type']:C('admin_order_type');
		$client['order'] = !empty($_GET['order'])?$_GET['order']:'desc';
		$client['p'] = '';

		$limit = C('url_num_admin');
		$order = 'client_'.$client["type"].' '.$client['order'];

		$count = $rs->where()->count('client_id');
		$totalpages = ceil($count/$limit);
		$currentpage = !empty($_GET['p'])?intval($_GET['p']):1;
		$currentpage = get_maxpage($currentpage,$totalpages);
		$pageurl = U('Admin-Client/Show',$client,false,false).'{!page!}'.C('url_html_suffix');
		$pages = '共'.$count.'条记录&nbsp;当前:'.$currentpage.'/'.$totalpages.'页&nbsp;'.getpage($currentpage,$totalpages,8,$pageurl,'pagego(\''.$pageurl.'\','.$totalpages.')');

		$client['pages'] = $pages;

		$list = $rs->where()->order($order)->limit($limit)->page($currentpage)->select();
		$this->assign($client);
		$this->assign('list',$list);
		$this->display('./Public/system/client_conf.html');
	}
	
	public function overview(){
		$client = array();
		
		$rs = M("client");
		$install = $rs->execute('select client_mv from ff_client where client_type = 1 group by client_mv');
		$uninstall = $rs->execute('select client_mv from ff_client where client_type = 2 group by client_mv');
		$avlie = $rs->execute('select client_mv from ff_client where client_type = 3 group by client_mv');
		$data = $rs->query("select YEAR(FROM_UNIXTIME(client_addtime)) y,MONTH(FROM_UNIXTIME(client_addtime)) m,DAY(FROM_UNIXTIME(client_addtime)) d,count(distinct client_mv) c from ff_client where client_type = 1 group by DAY(FROM_UNIXTIME(client_addtime)) order by y,m,d");
		
		$client['install'] = $install;
		$client['uninstall'] = $uninstall;
		$client['alive'] = $avlie;
		$client['data'] = $data;
		$this->assign($client);
		$this->assign('list',$list);
		$this->display('./Public/system/client_overview.html');
	}
}
?>