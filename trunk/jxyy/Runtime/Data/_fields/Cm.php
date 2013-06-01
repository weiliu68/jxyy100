<?php
return array (
  0 => 'cm_id',
  1 => 'cm_cid',
  2 => 'cm_sid',
  3 => 'cm_uid',
  4 => 'cm_content',
  5 => 'cm_up',
  6 => 'cm_down',
  7 => 'cm_ip',
  8 => 'cm_addtime',
  9 => 'cm_status',
  '_autoinc' => true,
  '_pk' => 'cm_id',
  '_type' => 
  array (
    'cm_id' => 'mediumint(8) unsigned',
    'cm_cid' => 'mediumint(9)',
    'cm_sid' => 'tinyint(1)',
    'cm_uid' => 'mediumint(9)',
    'cm_content' => 'text',
    'cm_up' => 'mediumint(9)',
    'cm_down' => 'mediumint(9)',
    'cm_ip' => 'varchar(20)',
    'cm_addtime' => 'int(11)',
    'cm_status' => 'tinyint(1)',
  ),
);
?>