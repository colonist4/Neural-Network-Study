class NN{
    // L : total number of layers
    // nodeNum : (array) number of perceptrons in ith layer
    // include outputLayer
    constructor(L, nodeNum){
        this.weight = [];
        this.L = L;
        this.nodeNum = nodeNum;
        
        this.initWeight();
    }
    
    initWeight(){
        for(let i=0; i<L; i++){
            this.weight[i] = [];
            let w = this.weight[i];
            for(let j=0; j<nodeNum[i]; j++){
                w[j] = [];  
                for(let k=0; k<nodeNum[i-1]; k++){
                    w[j][k] = Math.random();
                }
            }
        }
    }
    
    forwardNN(input){
        
    }
}

