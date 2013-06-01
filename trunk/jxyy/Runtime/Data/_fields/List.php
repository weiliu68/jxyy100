<?php
return array (
  0 => 'list_id',
  1 => 'list_pid',
  2 => 'list_oid',
  3 => 'list_sid',
  4 => 'list_name',
  5 => 'list_skin',
  6 => 'list_dir',
  7 => 'list_status',
  8 => 'list_keywords',
  9 => 'list_title',
  10 => 'list_description',
  11 => 'list_jumpurl',
  '_autoinc' => true,
  '_pk' => 'list_id',
  '_type' => 
  array (
    'list_id' => 'smallint(6) unsigned',
    'list_pid' => 'smallint(3)',
    'list_oid' => 'smallint(3)',
    'list_sid' => 'tinyint(1)',
    'list_name' => 'char(20)',
    'list_skin' => 'char(20)',
    'list_dir' => 'varchar(90)',
    'list_status' => 'tinyint(1)',
    'list_keywords' => 'varchar(255)',
    'list_title' => 'varchar(50)',
    'list_description' => 'varchar(255)',
    'list_jumpurl' => 'varchar(150)',
  ),
);
?>