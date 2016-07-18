<?php

$password;
if(isset($_GET['password']))	{ $password = $_GET['password']; }

if ($password != 'jisiksoft') {
	print "Error: id or password is incorrect.";
	exit();
}

$filename = "../2016/data/alldata.data";
$handle = fopen($filename, "r");
$strData = fread($handle, filesize($filename));
fclose($handle);

$arrPeople = split("&&&&", $strData);

// Include PHPExcel
require_once './lib/PHPExcel/Classes/PHPExcel.php';

// Create new PHPExcel object
$objPHPExcel = new PHPExcel();

// Set document properties
$objPHPExcel->getProperties()->setCreator("jisiksoft.com")
							 ->setLastModifiedBy("jisiksoft.com")
							 ->setTitle("Survey Result")
							 ->setSubject("Survey Result 2016")
							 ->setDescription("Survey Result 2016")
							 ->setKeywords("office 2007 openxml php")
							 ->setCategory("Survey Result 2016");

	$objPHPExcel->setActiveSheetIndex(0)
	            ->setCellValue('B2', 'No')
	            ->setCellValue('C2', '이름')
	            ->setCellValue('D2', '전화번호')
	            ->setCellValue('E2', 'Q1')
	            ->setCellValue('F2', 'Q2')
	            ->setCellValue('G2', 'Q3')
	            ->setCellValue('H2', 'Q4')
	            ->setCellValue('I2', 'Q5')
	            ->setCellValue('J2', 'Q6')
	            ->setCellValue('K2', 'Q7')
	            ->setCellValue('L2', 'Q8')
	            ->setCellValue('M2', 'Q9')
	            ->setCellValue('N2', 'Q10')
	            ->setCellValue('O2', 'Q11')
	            ->setCellValue('P2', '날자');
// Add some data
for ($i=1; $i<count($arrPeople); $i++) {
	$data = split("##", $arrPeople[$i]);
	$objPHPExcel->setActiveSheetIndex(0)
	            ->setCellValue('B'.($i+2), $i)
	            ->setCellValue('C'.($i+2), $data[0])
	            ->setCellValue('D'.($i+2), $data[1])
	            ->setCellValue('E'.($i+2), $data[2])
	            ->setCellValue('F'.($i+2), $data[3])
	            ->setCellValue('G'.($i+2), $data[4])
	            ->setCellValue('H'.($i+2), $data[5])
	            ->setCellValue('I'.($i+2), $data[6])
	            ->setCellValue('J'.($i+2), $data[7])
	            ->setCellValue('K'.($i+2), $data[8])
	            ->setCellValue('L'.($i+2), $data[9])
	            ->setCellValue('M'.($i+2), $data[10])
	            ->setCellValue('N'.($i+2), $data[11])
	            ->setCellValue('O'.($i+2), $data[12])
	            ->setCellValue('P'.($i+2), $data[13]);
}

// Rename worksheet
$objPHPExcel->getActiveSheet()->setTitle('Survey Result');

// Redirect output to a client’s web browser (Excel 2007)
header('Content-Type: application/vnd.ms-excel;charset=utf-8');
header('Content-Type: application/x-msexcel;charset=utf-8');
header('Content-Disposition: attachment;filename="survey.xls"');
header('Cache-Control: max-age=0');

$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
$objWriter->save('php://output');

exit();

?>
