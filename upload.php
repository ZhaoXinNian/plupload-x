<?php


//确保目录可写

if (!empty($_FILES) && $_FILES['file']['error'] == 0 ) {
    $tempFile = $_FILES['file']['tmp_name'];
    $targetPath = __DIR__  . '/uploads/';
    ensure_writable_dir($targetPath);
    $name = date('YmdHis')."_".rand(1000,9999).'.'.getExt($_FILES['file']['name']);
    $targetFile =  str_replace('\\','/',$targetPath) . $name;
    move_uploaded_file($tempFile,$targetFile);
    exit(json_encode(['status'=>true,'files'=>'uploads/'.$name,'msg'=>'上传成功'], JSON_UNESCAPED_UNICODE));
}


function getExt($fileName){
    $ext = explode(".", $fileName);
    $ext = $ext[count($ext) - 1];
    return strtolower($ext);
}

function ensure_writable_dir($dir)
{
    if (!file_exists($dir)) {
        mkdir($dir, 0766, true);
        chmod($dir, 0766);
        chmod($dir, 0777);
    } else if (!is_writable($dir)) {
        chmod($dir, 0766);
        chmod($dir, 0777);
        if (!is_writable($dir)) {
            echo json_encode(array('status' => false, 'code' => 1007, 'msg' => '创建目录失败'));
            exit;
            //throw new FileSystemException("目录 $dir 不可写");
        }
    }
}