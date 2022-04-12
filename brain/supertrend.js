const Stock = require("stock-technical-indicators")
const Indicator = Stock.Indicator
const { Supertrend } = require("stock-technical-indicators/study/Supertrend")
const axios = require('axios').default;

async function load(){
const coinex = await axios.get('https://angelhtml.github.io/json/coinex.json')
const highValues = coinex.data.data.map(e=> e[3]*1    )
const lowValues = coinex.data.data.map(e=> e[4]*1    )
const clossingValues = coinex.data.data.map(e=> e[2]*1    )
const volumeValues = coinex.data.data.map(e=> e[5]*1    )
const openingValues = coinex.data.data.map(e=> e[1]*1    )
const date = coinex.data.data.map(e=> e[0]*1    )
console.log('start')
const superData = []
for (let index = 0; index < 1000; index++) {
const a = [date[index],openingValues[index],highValues[index] ,lowValues[index],clossingValues[index],volumeValues[index]    ]
superData.push(a)
}
const newStudyATR = new Indicator(new Supertrend());
const trend = newStudyATR.calculate(superData,{ period: 10, multiplier: 1 })
console.log(trend[999])

const direction_Buy = (trend[999].Supertrend.Direction > 0)
const direction_Sell = (trend[999].Supertrend.Direction < 0)
const sumTrueRange = (trend[999].ATR.SumTrueRange < 0.01)
const Supertrande_stoploss_Buy = ( trend[999].ATR.Value*75/100 - trend[999].ATR.Value > 0)
const Supertrande_stoploss_Sell = ( trend[999].ATR.Value*75/100 - trend[999].ATR.Value < 0)

if((direction_Buy == true && sumTrueRange == true ) || (direction_Buy == true && sumTrueRange == true && Supertrande_stoploss_Buy == true)){
    console.log("Buy it now")
}else if((direction_Sell == true && sumTrueRange == true ) || (direction_Sell == true && sumTrueRange == true && Supertrande_stoploss_Sell == true)){
    console.log("sell it now")
}else{
    console.log(direction_Buy,direction_Sell,sumTrueRange,Supertrande_stoploss_Buy,Supertrande_stoploss_Sell)
}


}
setInterval(()=>{
    function run() {
        load()
    }
    run()
},1000)

