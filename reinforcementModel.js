class NeuralNetwork{
    constructor(inputSize, hiddenSize, outputSize){
        this.weights1 = this.randomMatrix(inputSize, hiddenSize);
        this.weights2 = this.randomMatrix(hiddenSize, outputSize);
        this.bias1 = this.zeros([1, hiddenSize]);
        this.bias2 = this.zeros([1, outputSize]);
    }

    randomMatrix(rows, cols) {
        let matrix = [];
        for (let i = 0; i < rows; i++) {
            let row = []
            for (let j = 0; j < cols; j++) {
                row.push(Math.random() * 0.01);
            }
            matrix.push(row);
        }
        return matrix;
    }

    zeros(shape) {
        return Array(shape[0]).fill().map(() => Array(shape[1]).fill(0));
    }

    dot(a,b){
        let result = this.zeros([a.length, b[0].length]);
        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < b[0].length; j++) {
                for (let k = 0; k < a[0].length; k++) {
                    result[i][j] += a[i][k] * b[k][j];
                }
            }
        }
        return result;
    }

    add(a,b) {
        return a.map((row, i) => row.map((val, j) => val + b[i][j]));
    }

    relu(x) {
        return x.map(row => row.map(val => Math.max(0, val)));
    }

    forward(x) {
        this.z1 = this.add(this.dot(x, this.weights1), this.bias1);
        this.a1 = this.relu(this.z1);
        this.z2 = this.add(this.dot(this.a1, this.weights2), this.bias2);
        return this.z2;
    }
    
    predict(x) {
        return this.forward(x);
    }
}

class ReplayBuffer{
    constructor(size){
        this.size = size;
        this.buffer = [];
    }

    add(data){
        if(this.buffer.length >= this.size){
            this.buffer.shift();
        }
        this.buffer.push(data);
    }

    sample(size){
        let sample = [];
        for(let i = 0; i < size; i++){
            sample.push(this.buffer[Math.floor(Math.random() * this.buffer.length)]);
        }
        return sample;
    }

}

// let nn = new NeuralNetwork(3, 4, 2);
// let input = new Array(3).fill(0);
// console.log(nn.predict([input]))