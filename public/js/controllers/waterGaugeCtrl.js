angular.module('App').controller('waterGaugeCtrl', function($scope,$resource){

queue()
   .defer(d3.json, "/api/data/1/latest")
   .await(displayTotals);
   
     function displayTotals(error, apiData){
   //Start Transformations
	var dataSet = apiData;
	var dateFormat = d3.time.format("%m/%d/%Y %H:%M:%S");

	lastpost = new Date(dataSet[0].datetime);
	console.log("Data do Ultimo Post " + lastpost)
	dataAtual = new Date();
	console.log("Data e Hora atual " + dataAtual);

	//calcula a diferença de datas em horas
	var diffHoras = Math.abs(dataAtual.getTime() - lastpost.getTime()) / 3600000; 
	console.log("Diferença de horas: " + diffHoras)

	var imgStatus = new Image();
	var divImgNetwork = document.getElementById('imgNetwork');
	imgStatus.onload = function() {
	  divImgNetwork.appendChild(imgStatus);
	};
	if (diffHoras < 2) {
		console.log("Diferença maior que 2 horas");
		imgStatus.src = './images/online.png';
	}
	else {
		console.log("Diferenca menor que 2 horas");
		imgStatus.src = './images/offline.png';
	}
	
	dataSet.forEach(function(d) {
		d.datetime = dateFormat.parse(d.datetime);
//		console.log(d.datetime);
		if (d.level4 == 1) {
			d.total = 4;
            d.changecolor = "#800080";
			} 
		else if (d.level3 == 1) {
			d.total = 3;
            d.changecolor = "#800080";
			}
		else if (d.level2 == 1) {
			d.total = 2;
            d.changecolor = "#008100";
			}
		else if (d.level1 == 1) {
			d.total = 1;
            d.changecolor = "#FFCE00";
			}	
		 else {
			d.total = 0;
            d.changecolor = "#E53A0F";
		   }	
	});
	
	//Cria Crossfilter
	var ndx = crossfilter(dataSet);
	
    // Cria as dimensões de tempo e de sensorId
	var timeDim = ndx.dimension(function(d) {return new Date(d.datetime).getTime() });
	var sensorDim = ndx.dimension(function(d) {return d.sensorid });
	var blocoDim = ndx.dimension(function(d) {return d.blocoid });
	var sensorLevel3 = ndx.dimension(function(d) {return d.level3 });
	var sensorLevel2 = ndx.dimension(function(d) {return d.level2 });
	var sensorLevel1 = ndx.dimension(function(d) {return d.level1 });
	
	// ultima leitura Cisterna Bloco 2
	sensorDim.filterAll();
	sensorDim.filter(function(d) {return d === 'UCSCistern1'});
	blocoDim.filter(function(d) {return d == 2});
	if (timeDim.top(1)[0] != null) {
		var lastVolC1 = timeDim.top(1)[0].total;
		var colorC1 = timeDim.top(1)[0].changecolor;
	}
	else {
		var lastVolC1 = 0;
		var colorC1 =  "#E53A0F";
	}
		
	// ultima leitura Cisterna Bloco 5
	sensorDim.filterAll();
	sensorDim.filter(function(d) {return d === 'UCScistern1'});
	blocoDim.filter(function(d) {return d == 5});
	if (timeDim.top(1)[0] != null) {
		var lastVolC2 = timeDim.top(1)[0].total;
		var colorC2 = timeDim.top(1)[0].changecolor;
	}
	else {
		var lastVolC2 = 0;
		var colorC2 =  "#E53A0F";
	}
	
	// ultima leitura Caixa Bloco 1
	sensorDim.filterAll();
	sensorDim.filter(function(d) {return d === 'UCSReserv1'});
	blocoDim.filter(function(d) {return d == 1});
	if (timeDim.top(1)[0] != null) {
		var lastVolR1 = timeDim.top(1)[0].total;
		var colorR1 = timeDim.top(1)[0].changecolor;
	}
	else {
		var lastVolR1 = 0;
		var colorR1 =  "#E53A0F";
	}

	// pie chart bloco 1

	var totalEntradasBl1 = ndx.groupAll().reduceCount().value();
	console.log("Total de Leituras Bloco 1: " + totalEntradasBl1)
	sensorLevel1.filter(0);
	sensorLevel2.filter(0);
	sensorLevel3.filter(0);
	
	//quantidade sensor Level 0

	var totalLevel0Bl1 = ndx.groupAll().reduceCount().value();
	console.log("Quantidade de L0 Bl1: " +totalLevel0Bl1);

	//Filtra Qtdade Sensor Level 1

	sensorLevel1.filter(1);
	sensorLevel2.filter(0);
	sensorLevel3.filter(0);
	var totalLevel1Bl1 = ndx.groupAll().reduceCount().value();
	console.log("Quantidade de L1 Bl1: "+ totalLevel1Bl1);

	//Filtra Qtade Sensor Level 2

	sensorLevel1.filter(1);
	sensorLevel2.filter(1);
	sensorLevel3.filter(0);
	var totalLevel2Bl1 = ndx.groupAll().reduceCount().value();
	console.log("Quantidade de L2 Bl1: " +totalLevel2Bl1);

	//Filtra Sensor Level3
	sensorLevel1.filter(1);
	sensorLevel2.filter(1);
	sensorLevel3.filter(1);
	var totalLevel3Bl1 = ndx.groupAll().reduceCount().value();
	console.log("Quantidade de L3 Bl1: "+totalLevel3Bl1)



	PercentL0Bl1 = Math.round((totalLevel0Bl1/totalEntradasBl1) * 100).toFixed(2);
	PercentL1Bl1 = Math.round((totalLevel1Bl1/totalEntradasBl1) * 100).toFixed(2);
	PercentL2Bl1 = Math.round((totalLevel2Bl1/totalEntradasBl1) * 100).toFixed(2);
	PercentL3Bl1 = Math.round((totalLevel3Bl1/totalEntradasBl1) * 100).toFixed(2);

	console.log("Percentual L0 Bl1: " + PercentL0Bl1);
	console.log("Percentual L1 Bl1: " + PercentL1Bl1);
	console.log("Percentual L2 Bl1: " + PercentL2Bl1);
	console.log("Percentual L3 Bl1: " + PercentL3Bl1);

	var ChartBl1 = loadPieChart("pieChart1", PercentL0Bl1, PercentL1Bl1, PercentL2Bl1, PercentL3Bl1);
	// fim pie chart bloco 1
	
	// ultima leitura Caixa Bloco 2
	sensorLevel1.filterAll();
	sensorLevel2.filterAll();
	sensorLevel3.filterAll();
	sensorDim.filterAll();
	sensorDim.filter(function(d) {return d === 'UCSReserv1'});
	blocoDim.filter(function(d) {return d == 2});
	if (timeDim.top(1)[0] != null) {
		var lastVolR2 = timeDim.top(1)[0].total;
		var colorR2 = timeDim.top(1)[0].changecolor;
	}
	else {
		var lastVolR2 = 0;
		var colorR2 =  "#E53A0F";
	}


	//pieChart Bloco 2


	var totalEntradasBl2 = ndx.groupAll().reduceCount().value();
	console.log("Total de Leituras Bloco 2: " + totalEntradasBl2)
	sensorLevel1.filter(0);
	sensorLevel2.filter(0);
	sensorLevel3.filter(0);
	var totalLevel0Bl2 = ndx.groupAll().reduceCount().value();
	console.log("Quantidade de L0 Bl2: " +totalLevel0Bl2);

	//Filtra Qtdade Sensor Level 1

	sensorLevel1.filter(1);
	sensorLevel2.filter(0);
	sensorLevel3.filter(0);
	var totalLevel1Bl2 = ndx.groupAll().reduceCount().value();
	console.log("Quantidade de L1 Bl2: "+ totalLevel1Bl2);

	//Filtra Qtade Sensor Level 2

	sensorLevel1.filter(1);
	sensorLevel2.filter(1);
	sensorLevel3.filter(0);
	var totalLevel2Bl2 = ndx.groupAll().reduceCount().value();
	console.log("Quantidade de L2 Bl2: " +totalLevel2Bl2);

	//Filtra Sensor Level3
	sensorLevel1.filter(1);
	sensorLevel2.filter(1);
	sensorLevel3.filter(1);
	var totalLevel3Bl2 = ndx.groupAll().reduceCount().value();
	console.log("Quantidade de L3 Bl2: "+totalLevel3Bl2)


	PercentL0Bl2 = Math.round((totalLevel0Bl2/totalEntradasBl2) * 100).toFixed(2);
	PercentL1Bl2 = Math.round((totalLevel1Bl2/totalEntradasBl2) * 100).toFixed(2);
	PercentL2Bl2 = Math.round((totalLevel2Bl2/totalEntradasBl2) * 100).toFixed(2);
	PercentL3Bl2 = Math.round((totalLevel3Bl2/totalEntradasBl2) * 100).toFixed(2);

	var ChartBl2 = loadPieChart("pieChart2", PercentL0Bl2, PercentL1Bl2, PercentL2Bl2, PercentL3Bl2);
	
	// fim pie chart bloco 2




			
	// ultima leitura Caixa Bloco 3
	sensorDim.filterAll();
	sensorLevel1.filterAll();
	sensorLevel2.filterAll();
	sensorLevel3.filterAll();
	sensorDim.filter(function(d) {return d === 'UCSReserv1'});
	blocoDim.filter(function(d) {return d == 3});
	if (timeDim.top(1)[0] != null) {
		var lastVolR3 = timeDim.top(1)[0].total;
		var colorR3 = timeDim.top(1)[0].changecolor;
	}
	else {
		var lastVolR3 = 0;
		var colorR3 =  "#E53A0F";
	}
	


	//pieChart Bloco 3


	var totalEntradasBl3 = ndx.groupAll().reduceCount().value();
	console.log("Total de Leituras Bloco 3: " + totalEntradasBl3)
	sensorLevel1.filter(0);
	sensorLevel2.filter(0);
	sensorLevel3.filter(0);
	var totalLevel0Bl3 = ndx.groupAll().reduceCount().value();
	console.log("Quantidade de L0 Bl3: " +totalLevel0Bl3);

	//Filtra Qtdade Sensor Level 1

	sensorLevel1.filter(1);
	sensorLevel2.filter(0);
	sensorLevel3.filter(0);
	var totalLevel1Bl3 = ndx.groupAll().reduceCount().value();
	console.log("Quantidade de L1 Bl3: "+ totalLevel1Bl3);

	//Filtra Qtade Sensor Level 2

	sensorLevel1.filter(1);
	sensorLevel2.filter(1);
	sensorLevel3.filter(0);
	var totalLevel2Bl3 = ndx.groupAll().reduceCount().value();
	console.log("Quantidade de L2 Bl3: " +totalLevel2Bl3);

	//Filtra Sensor Level3
	sensorLevel1.filter(1);
	sensorLevel2.filter(1);
	sensorLevel3.filter(1);
	var totalLevel3Bl3 = ndx.groupAll().reduceCount().value();
	console.log("Quantidade de L3 Bl3: "+totalLevel3Bl3)


	PercentL0Bl3 = Math.round((totalLevel0Bl3/totalEntradasBl3) * 100).toFixed(2);
	PercentL1Bl3 = Math.round((totalLevel1Bl3/totalEntradasBl3) * 100).toFixed(2);
	PercentL2Bl3 = Math.round((totalLevel2Bl3/totalEntradasBl3) * 100).toFixed(2);
	PercentL3Bl3 = Math.round((totalLevel3Bl3/totalEntradasBl3) * 100).toFixed(2);

	var ChartBl3 = loadPieChart("pieChart3", PercentL0Bl3, PercentL1Bl3, PercentL2Bl3, PercentL3Bl3);
	
	// fim pie chart bloco 3



	// ultima leitura Caixa Bloco 4A
	sensorDim.filterAll();
	sensorLevel1.filterAll();
	sensorLevel2.filterAll();
	sensorLevel3.filterAll();
	sensorDim.filter(function(d) {return d === 'UCSReserv1'});
	blocoDim.filter(function(d) {return d == 4});
	if (timeDim.top(1)[0] != null) {
		var lastVolR4 = timeDim.top(1)[0].total;
		var colorR4 = timeDim.top(1)[0].changecolor;
	}
	else {
		var lastVolR4 = 0;
		var colorR4 =  "#E53A0F";
	}

	//pieChart Bloco 4A


	var totalEntradasBl4a = ndx.groupAll().reduceCount().value();
	console.log("Total de Leituras Bloco 4A: " + totalEntradasBl4a)
	sensorLevel1.filter(0);
	sensorLevel2.filter(0);
	sensorLevel3.filter(0);
	var totalLevel0Bl4a = ndx.groupAll().reduceCount().value();
	console.log("Quantidade de L0 Bl4A: " +totalLevel0Bl4a);

	//Filtra Qtdade Sensor Level 1

	sensorLevel1.filter(1);
	sensorLevel2.filter(0);
	sensorLevel3.filter(0);
	var totalLevel1Bl4a = ndx.groupAll().reduceCount().value();
	console.log("Quantidade de L1 Bl4A: "+ totalLevel1Bl4a);

	//Filtra Qtade Sensor Level 2

	sensorLevel1.filter(1);
	sensorLevel2.filter(1);
	sensorLevel3.filter(0);
	var totalLevel2Bl4a = ndx.groupAll().reduceCount().value();
	console.log("Quantidade de L2 Bl4A: " +totalLevel2Bl4a);

	//Filtra Sensor Level3
	sensorLevel1.filter(1);
	sensorLevel2.filter(1);
	sensorLevel3.filter(1);
	var totalLevel3Bl4a = ndx.groupAll().reduceCount().value();
	console.log("Quantidade de L3 Bl4A: "+totalLevel3Bl4a)


	PercentL0Bl4a = Math.round((totalLevel0Bl4a/totalEntradasBl4a) * 100).toFixed(2);
	PercentL1Bl4a = Math.round((totalLevel1Bl4a/totalEntradasBl4a) * 100).toFixed(2);
	PercentL2Bl4a = Math.round((totalLevel2Bl4a/totalEntradasBl4a) * 100).toFixed(2);
	PercentL3Bl4a = Math.round((totalLevel3Bl4a/totalEntradasBl4a) * 100).toFixed(2);

	var ChartBl4a = loadPieChart("pieChart4a", PercentL0Bl4a, PercentL1Bl4a, PercentL2Bl4a, PercentL3Bl4a);
	
	// fim pie chart bloco 4A


	// ultima leitura Caixa Bloco 4B
	sensorDim.filterAll();
	sensorLevel1.filterAll();
	sensorLevel2.filterAll();
	sensorLevel3.filterAll();
	sensorDim.filter(function(d) {return d === 'UCSReserv2'});
	blocoDim.filter(function(d) {return d == 4});
	if (timeDim.top(1)[0] != null) {
		var lastVolR7 = timeDim.top(1)[0].total;
		var colorR7 = timeDim.top(1)[0].changecolor;
	}
	else {
		var lastVolR7 = 0;
		var colorR7 =  "#E53A0F";
	}


	//pieChart Bloco 4B


	var totalEntradasBl4b = ndx.groupAll().reduceCount().value();
	console.log("Total de Leituras Bloco 4B: " + totalEntradasBl4b)
	sensorLevel1.filter(0);
	sensorLevel2.filter(0);
	sensorLevel3.filter(0);
	var totalLevel0Bl4b = ndx.groupAll().reduceCount().value();
	console.log("Quantidade de L0 Bl4B: " +totalLevel0Bl4b);

	//Filtra Qtdade Sensor Level 1

	sensorLevel1.filter(1);
	sensorLevel2.filter(0);
	sensorLevel3.filter(0);
	var totalLevel1Bl4b = ndx.groupAll().reduceCount().value();
	console.log("Quantidade de L1 Bl4B: "+ totalLevel1Bl4b);

	//Filtra Qtade Sensor Level 2

	sensorLevel1.filter(1);
	sensorLevel2.filter(1);
	sensorLevel3.filter(0);
	var totalLevel2Bl4b = ndx.groupAll().reduceCount().value();
	console.log("Quantidade de L2 Bl4B: " +totalLevel2Bl4b);

	//Filtra Sensor Level3
	sensorLevel1.filter(1);
	sensorLevel2.filter(1);
	sensorLevel3.filter(1);
	var totalLevel3Bl4b = ndx.groupAll().reduceCount().value();
	console.log("Quantidade de L3 Bl4B: "+totalLevel3Bl4b)


	PercentL0Bl4b = Math.round((totalLevel0Bl4b/totalEntradasBl4b) * 100).toFixed(2);
	PercentL1Bl4b = Math.round((totalLevel1Bl4b/totalEntradasBl4b) * 100).toFixed(2);
	PercentL2Bl4b = Math.round((totalLevel2Bl4b/totalEntradasBl4b) * 100).toFixed(2);
	PercentL3Bl4b = Math.round((totalLevel3Bl4b/totalEntradasBl4b) * 100).toFixed(2);

	var ChartBl4b = loadPieChart("pieChart4b", PercentL0Bl4b, PercentL1Bl4b, PercentL2Bl4b, PercentL3Bl4b);
	
	// fim pie chart bloco 4B



	
	// ultima leitura Caixa Bloco 5A
	sensorDim.filterAll();
	sensorLevel1.filterAll();
	sensorLevel2.filterAll();
	sensorLevel3.filterAll();
	sensorDim.filter(function(d) {return d === 'UCSReserv1'});
	blocoDim.filter(function(d) {return d == 5});
	if (timeDim.top(1)[0] != null) {
		var lastVolR5 = timeDim.top(1)[0].total;
		var colorR5 = timeDim.top(1)[0].changecolor;
	}
	else {
		var lastVolR5 = 0;
		var colorR5 =  "#E53A0F";
	}
	
	//pieChart Bloco  5A


	var totalEntradasBl5a = ndx.groupAll().reduceCount().value();
	console.log("Total de Leituras Bloco 5A: " + totalEntradasBl5a)
	sensorLevel1.filter(0);
	sensorLevel2.filter(0);
	sensorLevel3.filter(0);
	var totalLevel0Bl5a = ndx.groupAll().reduceCount().value();
	console.log("Quantidade de L0 Bl5A: " +totalLevel0Bl5a);

	//Filtra Qtdade Sensor Level 1

	sensorLevel1.filter(1);
	sensorLevel2.filter(0);
	sensorLevel3.filter(0);
	var totalLevel1Bl5a = ndx.groupAll().reduceCount().value();
	console.log("Quantidade de L1 Bl5A: "+ totalLevel1Bl5a);

	//Filtra Qtade Sensor Level 2

	sensorLevel1.filter(1);
	sensorLevel2.filter(1);
	sensorLevel3.filter(0);
	var totalLevel2Bl5a = ndx.groupAll().reduceCount().value();
	console.log("Quantidade de L2 Bl5A: " +totalLevel2Bl5a);

	//Filtra Sensor Level3
	sensorLevel1.filter(1);
	sensorLevel2.filter(1);
	sensorLevel3.filter(1);
	var totalLevel3Bl5a = ndx.groupAll().reduceCount().value();
	console.log("Quantidade de L3 Bl5A: "+totalLevel3Bl5a)


	PercentL0Bl5a = Math.round((totalLevel0Bl5a/totalEntradasBl5a) * 100).toFixed(2);
	PercentL1Bl5a = Math.round((totalLevel1Bl5a/totalEntradasBl5a) * 100).toFixed(2);
	PercentL2Bl5a = Math.round((totalLevel2Bl5a/totalEntradasBl5a) * 100).toFixed(2);
	PercentL3Bl5a = Math.round((totalLevel3Bl5a/totalEntradasBl5a) * 100).toFixed(2);

	var ChartBl5a = loadPieChart("pieChart5a", PercentL0Bl5a, PercentL1Bl5a, PercentL2Bl5a, PercentL3Bl5a);
	
	// fim pie chart bloco 5A


	// ultima leitura Caixa Bloco 5B
	sensorDim.filterAll();
	sensorLevel1.filterAll();
	sensorLevel2.filterAll();
	sensorLevel3.filterAll();
	sensorDim.filter(function(d) {return d === 'UCSReserv2'});
	blocoDim.filter(function(d) {return d == 5});
	if (timeDim.top(1)[0] != null) {
		var lastVolR8 = timeDim.top(1)[0].total;
		var colorR8 = timeDim.top(1)[0].changecolor;
	}
	else {
		var lastVolR8 = 0;
		var colorR8 =  "#E53A0F";
	}

	//pieChart Bloco  5B


	var totalEntradasBl5b = ndx.groupAll().reduceCount().value();
	console.log("Total de Leituras Bloco 5B: " + totalEntradasBl5b)
	sensorLevel1.filter(0);
	sensorLevel2.filter(0);
	sensorLevel3.filter(0);
	var totalLevel0Bl5b = ndx.groupAll().reduceCount().value();
	console.log("Quantidade de L0 Bl5B: " +totalLevel0Bl5b);

	//Filtra Qtdade Sensor Level 1

	sensorLevel1.filter(1);
	sensorLevel2.filter(0);
	sensorLevel3.filter(0);
	var totalLevel1Bl5b = ndx.groupAll().reduceCount().value();
	console.log("Quantidade de L1 Bl5B: "+ totalLevel1Bl5b);

	//Filtra Qtade Sensor Level 2

	sensorLevel1.filter(1);
	sensorLevel2.filter(1);
	sensorLevel3.filter(0);
	var totalLevel2Bl5b = ndx.groupAll().reduceCount().value();
	console.log("Quantidade de L2 Bl5B: " +totalLevel2Bl5b);

	//Filtra Sensor Level3
	sensorLevel1.filter(1);
	sensorLevel2.filter(1);
	sensorLevel3.filter(1);
	var totalLevel3Bl5b = ndx.groupAll().reduceCount().value();
	console.log("Quantidade de L3 Bl5B: "+totalLevel3Bl5b)


	PercentL0Bl5b = Math.round((totalLevel0Bl5b/totalEntradasBl5b) * 100).toFixed(2);
	PercentL1Bl5b = Math.round((totalLevel1Bl5b/totalEntradasBl5b) * 100).toFixed(2);
	PercentL2Bl5b = Math.round((totalLevel2Bl5b/totalEntradasBl5b) * 100).toFixed(2);
	PercentL3Bl5b = Math.round((totalLevel3Bl5b/totalEntradasBl5b) * 100).toFixed(2);

	var ChartBl5b = loadPieChart("pieChart5b", PercentL0Bl5b, PercentL1Bl5b, PercentL2Bl5b, PercentL3Bl5b);
	
	// fim pie chart bloco 5B




	// ultima leitura Caixa Bloco 6A
	sensorDim.filterAll();
	sensorLevel1.filterAll();
	sensorLevel2.filterAll();
	sensorLevel3.filterAll();
	sensorDim.filter(function(d) {return d === 'UCSReserv1'});
	blocoDim.filter(function(d) {return d == 6});
	if (timeDim.top(1)[0] != null) {
		var lastVolR6 = timeDim.top(1)[0].total;
		var colorR6 = timeDim.top(1)[0].changecolor;
	}
	else {
		var lastVolR6 = 0;
		var colorR6 =  "#E53A0F";
	}

	
	//pieChart Bloco  6A


	var totalEntradasBl6a = ndx.groupAll().reduceCount().value();
	console.log("Total de Leituras Bloco 6A: " + totalEntradasBl6a)
	sensorLevel1.filter(0);
	sensorLevel2.filter(0);
	sensorLevel3.filter(0);
	var totalLevel0Bl6a = ndx.groupAll().reduceCount().value();
	console.log("Quantidade de L0 Bl6A: " +totalLevel0Bl6a);

	//Filtra Qtdade Sensor Level 1

	sensorLevel1.filter(1);
	sensorLevel2.filter(0);
	sensorLevel3.filter(0);
	var totalLevel1Bl6a = ndx.groupAll().reduceCount().value();
	console.log("Quantidade de L1 Bl6A: "+ totalLevel1Bl6a);

	//Filtra Qtade Sensor Level 2

	sensorLevel1.filter(1);
	sensorLevel2.filter(1);
	sensorLevel3.filter(0);
	var totalLevel2Bl6a = ndx.groupAll().reduceCount().value();
	console.log("Quantidade de L2 Bl6A: " +totalLevel2Bl6a);

	//Filtra Sensor Level3
	sensorLevel1.filter(1);
	sensorLevel2.filter(1);
	sensorLevel3.filter(1);
	var totalLevel3Bl6a = ndx.groupAll().reduceCount().value();
	console.log("Quantidade de L3 Bl6A: "+totalLevel3Bl6a)


	PercentL0Bl6a = Math.round((totalLevel0Bl6a/totalEntradasBl6a) * 100).toFixed(2);
	PercentL1Bl6a = Math.round((totalLevel1Bl6a/totalEntradasBl6a) * 100).toFixed(2);
	PercentL2Bl6a = Math.round((totalLevel2Bl6a/totalEntradasBl6a) * 100).toFixed(2);
	PercentL3Bl6a = Math.round((totalLevel3Bl6a/totalEntradasBl6a) * 100).toFixed(2);

	var ChartBl6a = loadPieChart("pieChart6a", PercentL0Bl6a, PercentL1Bl6a, PercentL2Bl6a, PercentL3Bl6a);
	
	// fim pie chart bloco 6A

	

	// ultima leitura Caixa Bloco 6B
	sensorDim.filterAll();
	sensorLevel1.filterAll();
	sensorLevel2.filterAll();
	sensorLevel3.filterAll();
	sensorDim.filter(function(d) {return d === 'UCSReserv2'});
	blocoDim.filter(function(d) {return d == 6});
	if (timeDim.top(1)[0] != null) {
		var lastVolR9 = timeDim.top(1)[0].total;
		var colorR9 = timeDim.top(1)[0].changecolor;
	}
	else {
		var lastVolR9 = 0;
		var colorR9 =  "#E53A0F";
	}

	//pieChart Bloco  6B


	var totalEntradasBl6b = ndx.groupAll().reduceCount().value();
	console.log("Total de Leituras Bloco 6B: " + totalEntradasBl6b)
	sensorLevel1.filter(0);
	sensorLevel2.filter(0);
	sensorLevel3.filter(0);
	var totalLevel0Bl6b = ndx.groupAll().reduceCount().value();
	console.log("Quantidade de L0 Bl6B: " +totalLevel0Bl6b);

	//Filtra Qtdade Sensor Level 1

	sensorLevel1.filter(1);
	sensorLevel2.filter(0);
	sensorLevel3.filter(0);
	var totalLevel1Bl6b = ndx.groupAll().reduceCount().value();
	console.log("Quantidade de L1 Bl6B: "+ totalLevel1Bl6b);

	//Filtra Qtade Sensor Level 2

	sensorLevel1.filter(1);
	sensorLevel2.filter(1);
	sensorLevel3.filter(0);
	var totalLevel2Bl6b = ndx.groupAll().reduceCount().value();
	console.log("Quantidade de L2 Bl6B: " +totalLevel2Bl6b);

	//Filtra Sensor Level3
	sensorLevel1.filter(1);
	sensorLevel2.filter(1);
	sensorLevel3.filter(1);
	var totalLevel3Bl6b = ndx.groupAll().reduceCount().value();
	console.log("Quantidade de L3 Bl6B: "+totalLevel3Bl6b)


	PercentL0Bl6b = Math.round((totalLevel0Bl6b/totalEntradasBl6b) * 100).toFixed(2);
	PercentL1Bl6b = Math.round((totalLevel1Bl6b/totalEntradasBl6b) * 100).toFixed(2);
	PercentL2Bl6b = Math.round((totalLevel2Bl6b/totalEntradasBl6b) * 100).toFixed(2);
	PercentL3Bl6b = Math.round((totalLevel3Bl6b/totalEntradasBl6b) * 100).toFixed(2);

	var ChartBl6b = loadPieChart("pieChart6b", PercentL0Bl6b, PercentL1Bl6b, PercentL2Bl6b, PercentL3Bl6b);
	
	// fim pie chart bloco 6A


// Configura gaugues
	var config1 = liquidFillGaugeDefaultSettings();
	config1.circleColor = colorC1;	// The color of the outer circle.
	//config1.waveColor = colorC1;	// The color of the 
	
	var config2 = liquidFillGaugeDefaultSettings();
	config2.circleColor = colorC2; 	// The color of the outer circle.
	
	var config3 = liquidFillGaugeDefaultSettings();
	config3.circleColor = colorR1; 	// The color of the outer circle.	
	
	var config4 = liquidFillGaugeDefaultSettings();
	config4.circleColor = colorR2; 	// The color of the outer circle.
	
	var config5 = liquidFillGaugeDefaultSettings();
	config5.circleColor = colorR3; 	// The color of the outer circle.
	
	var config6 = liquidFillGaugeDefaultSettings();
	config6.circleColor = colorR4; 	// The color of the outer circle.
	
	var config7 = liquidFillGaugeDefaultSettings();
	config7.circleColor = colorR5; 	// The color of the outer circle.
	
	var config8 = liquidFillGaugeDefaultSettings();
	config8.circleColor = colorR6; 	// The color of the outer circle.

//4b
	var config9 = liquidFillGaugeDefaultSettings();
	config9.circleColor = colorR7; 	// The color of the outer circle.
//5b
	var config10 = liquidFillGaugeDefaultSettings();
	config10.circleColor = colorR8; 	// The color of the outer circle.
//6b
	var config11 = liquidFillGaugeDefaultSettings();
	config11.circleColor = colorR9; 	// The color of the outer circle.

// Mostra gauges
//Cisternas
	 var gauge100 = loadLiquidFillGauge("fillgauge100", lastVolC1,config1);  //cisterna bloco 2
     var gauge101 = loadLiquidFillGauge("fillgauge101", lastVolC2,config2); //cisterna bloco 5
//Caixas D agua dos Blocos
     var gauge1 = loadLiquidFillGauge("fillgauge1", lastVolR1, config3); //caixa d agua bloco 1
     var gauge2 = loadLiquidFillGauge("fillgauge2", lastVolR2, config4); //caixa d agua bloco 2	 
     var gauge3 = loadLiquidFillGauge("fillgauge3", lastVolR3, config5); //caixa d agua bloco 3	 	 
     var gauge4a = loadLiquidFillGauge("fillgauge4a", lastVolR4, config6); //caixa d agua bloco 4a	 	 	 
     var gauge5a = loadLiquidFillGauge("fillgauge5a", lastVolR5, config7); //caixa d agua bloco 5a 	 	 
	 var gauge6a = loadLiquidFillGauge("fillgauge6a", lastVolR6, config8); //caixa d agua bloco 6a 	  
//Não definidas
     var gauge4b = loadLiquidFillGauge("fillgauge4b", lastVolR7, config9); // caixa d agua bloco 4B
     var gauge5b = loadLiquidFillGauge("fillgauge5b", lastVolR8, config10); //caixa d agua bloco 5B
     var gauge6b = loadLiquidFillGauge("fillgauge6b", lastVolR9, config11); //caixa d agua bloco 6B		

     
//Função para criar pieChart


function loadPieChart(elemenetId, value0, value1, value2, value3) {

	 	 var chart = new CanvasJS.Chart(elemenetId, {
			
		backgroundColor: "#D5F0FD",
		title:{
			text: "Histórico dos últimos 5 dias"
		},
                animationEnabled: true,
		legend:{
			verticalAlign: "center",
			horizontalAlign: "center",
			fontSize: 12,
			fontFamily: "Helvetica"        
		},
		theme: "theme1",
		data: [
		{        
			type: "pie",       
			indexLabelFontFamily: "Arial",       
			indexLabelFontSize: 14,
			indexLabel: "{label} {y}%",
			startAngle:-20,      
			showInLegend: false,
			toolTipContent:"{legendText} {y}%",
			dataPoints: [
				{  y: value0, legendText:"Vazio", label: "Vazio", color: "#E53A0F"},
				{  y: value1, legendText:"Baixo", label: "Baixo", color: "#FFA500" },
				{  y: value2, legendText:"Normal", label: "Normal", color: "#008100"},
				{  y: value3, legendText:"Transbordo" , label: "Transbordo", color:"#800080"}
			]
		}
		]
	});
	chart.render();
	}




};




});
	