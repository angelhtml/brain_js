const brain = require("brain.js");

const colors = [
    {green: 0.2, blue: 0.4},
    {red: 0.2, green: 0.8, blue:0.8},
    {green: 0.9}
]

const brightnesses = [
    {dark: 0.8},
    {neutral: 0.8},
    {light: 0.7},
    {light: 0.8},
    {light: 0.9},
    {light: 0.1},
    {light: 0.8},
    {neutral: 0.7, light:0.5},
    {dark: 0.7, neutral:0.5},
    {dark: 0.6, neutral:0.3},
    {dark: 0.85},
    {dark: 0.9}
]

const trainingData = [];

for (var i = 0; i<colors.length; i++){
    trainingData.push({
        input: colors[i],
        output: brightnesses[i]
    })
}

const net = new brain.NeuralNetwork({hiddenLayers: [3] })

const states = net.train(trainingData);
console.log(states)

console.log(net.run({green:0.7}))