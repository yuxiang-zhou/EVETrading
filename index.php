<!DOCTYPE html>
<html lang="en">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta charset="utf-8">

		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="">
		<meta name="author" content="">

		<link href="./css/custom.css" rel="stylesheet">
		<link href="./css/bootstrap.css" rel="stylesheet">

		<link href="./css/bootstrap-responsive.css" rel="stylesheet">
		<link rel="shortcut icon" href="./img/icon.png">


	    <style type="text/css">
	      body {
	        padding-top: 60px;
	        padding-bottom: 40px;
	      }
	      .sidebar-nav {
	        padding: 9px 0;
	      }
	      #invisable_content
	      {
	      	display: none;
	      }
	    </style>

	    <title>EVE Market Comparer</title>
	</head>

  	<body>

  		<div class="container">

  			<div class="row">
  				<div class="span12">
  					<h1> EVE Trading Analyser</h1>
  				</div>
  			</div>

  			<div class="row">
  				<div class="span2">QDU</div>
  				<div class="span2">QDL</div>
  				<div class="span2">TU</div>
  				<div class="span2">FL</div>
  				<div class="span2">DLL</div>
  				<div class="span2">DLU</div>
  			</div>

  			<div class="row">
  				<div class="span2"><input id="QDU" type="text" value="15"/></div>
  				<div class="span2"><input id="QDL" type="text" value="2" /></div>
  				<div class="span2"><input id="TU" type="text" value="5000" /></div>
  				<div class="span2"><input id="FL" type="text" value="100" /></div>
  				<div class="span2"><input id="DLL" type="text" value="600000" /></div>
  				<div class="span2"><input id="DLU" type="text" value="6000000" /></div>
  			</div>

  			<div class="row">
  				<div class="span12">
  					<button class="btn btn-primary" type="button" onclick="TradeTable.ShowInContent('#price_content');">Filter</button>
  				</div>
  			</div>
	    </div>


	    <div class="container" id="price_content">

	    </div>

	    <div id="invisable_content">
	    	<?php

	    		if($_GET['fname'])
	    		{
	    			$fname = $_GET['fname'];
	    			$fsys = $_GET['fsys'];
	    			$tname = $_GET['tname'];
	    			$tsys = $_GET['tsys'];
	    			$url = "http://eve-central.com/tradetool/compare?name=" . $fname ."&system1=" . $fsys ."&name=" . $tname ."&system2=" . $tsys .""; 
					$html = file_get_contents($url);

					echo $html;
	    		}
	    		else
	    		{
	    			//var TradingCenters = [{Name:Jita,System:30000142},{Name:Hek,System:30002053},{Name:Jita,System:30000142}];
					$url = "http://eve-central.com/tradetool/compare?name=Jita&system1=30000142&name=Hek&system2=30002053"; 
					$html = file_get_contents($url);

					echo $html;

					$url = "http://eve-central.com/tradetool/compare?name=Rens&system1=30002510&name=Hek&system2=30002053"; 
					$html = file_get_contents($url);

					echo $html;
				}
			?>
	    </div>

	    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
		<script src="./js/bootstrap.min.js"></script>
		<script src="./js/websupport.js"></script>
	</body>
</html>