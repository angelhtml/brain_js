const brain = require('brain.js');
const RSI = require('technicalindicators').RSI
const fs = require('fs')

//=============data===============
var a = []
/*
const clossingValue = [92,108,110,125.02,135,170,97,110,126,114,90,78,102.3,117,123,121,98,101,100,96,119,92,124,104,93,90,112,129.125,122,95,90,102,92,108,127]
const highValue = [98,118,112,135.02,145,190,107,120,136,134,100,88,112.3,127,133,131,108,111,110,106,129,102,124,114,103,100,122,139.135,132,105,100,122,102,118,147]
const lowValue = [90,98,100,105.02,115,150,87,100,106,104,80,68,92.3,107,113,111,88,91,90,86,109,82,104,94,83,80,102,119.105,102,85,80,92,82,98,97]
const volumeValue = [9002,10008,10010,12005.02,10035,17000,9007,11000,10026,10014,9000,7008,10002.3,11007,10023,12001,9008,10001,10000,9006,10019,9002,12004,10004,9300,9000,11200,12009.12500,12200,9500,9000,10002,9200,10008,12700]
const openingValue = [42,108,110,105.02,135,170,97,100,126,114,90,68,102.3,107,123,121,98,101,90,96,109,92,124,104,93,90,102,129.125,102,95,90,92,95,104,117]
*/
const clossingValue = [200,170,140,120,100,95,90, 90,89,70,130,120,115,110     ,200,170,140,120,100,95,90, 90,89,70,130,120,115,110]
const highValue = [220,200,170,150,140,120,140, 140,120,140,150,170,200,220]
const lowValue = [170,110,100,110,90,80,75, 75,80,90,110,100,110,170]
const volumeValue = [800,650,440,330,240,230,230, 230,230,240,330,440,650,800]
const openingValue = [180,150,120,112,120,85,80, 80,85,120,112,120,150,180]

const config = {
  binaryThresh: 0.5,
  // array of ints for the sizes of the hidden layers in the network
  activation: 'sigmoid', // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
  leakyReluAlpha: 0.01, // supported for activation type 'leaky-relu'
  iterations: 100,
  //hiddenLayers: [2000],
  //learningRate: 0.001,
  log: state => { console.log(state) }
};

const net = new brain.NeuralNetwork(config);
/*
for(var i = 0; i<clossingValue.length; ++i){
 const DATA = [clossingValue[i],highValue[i],lowValue[i],volumeValue[i],openingValue[i]]
  a.push(DATA)
  //console.log(DATA)  
}
*/

var inputRSI = {
    values : clossingValue,
    //values : [95,100,102.75,129.02,132.75,145.40,148.98,137.52,147.38,139.05,137.23,149.30,162.45,178.95,200.35,221.90,243.23,243.52,286.42,280.27,277.35,269.02,263.23,214.90],
    period : 2
};
var resultRSI = RSI.calculate(inputRSI) 
for(var Rsi = 0; Rsi<resultRSI.length-1; ++Rsi){
  var rsi1 = resultRSI[resultRSI.length - Rsi]
  a.push(rsi1)
}
/*
var rsi1 = resultRSI[resultRSI.length - 1]
var rsi2 = resultRSI[resultRSI.length - 2]
var rsi3 = resultRSI[resultRSI.length - 3]
*/
/*
const ANALIZdata ={RSI1: rsi1, RSI2: rsi2, RSI3: rsi3}
const output = net.run(ANALIZdata);
console.log(output)
*/
console.log(a)
console.log([a[1],a[2],a[3]])
net.train([
  { input: ([70,75,70]), output: [1]},
  { input: ([30,25,30]), output: [0]}
]); 
//const output = net.run([rsi1,rsi2,rsi3]);
const output = net.run([a[1],a[2],a[3]]);
console.log(output,net.run([30,25,30]))

const json = net.toJSON();
const jsonString = JSON.stringify(json);

fs.writeFile(

  './traning.json',

  jsonString,

  function (err) {
      
      if (err) {
          console.error('Crap happens');
      }
      if (!err) {
          console.error('done');
      }
  }
);