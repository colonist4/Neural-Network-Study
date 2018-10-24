class Model{
    
    constructor(){
        // input, hidden, output
        // input : [x_dist, y_dist, y_vel].T
        // output : jump?
        const nodes = [3, 5, 1];
        
        // weight1 : 5x3
        // weight2 : 1x5
        this.weights = [];
        for(let i=0; i<nodes.length-1; i++){
            this.weights.push(makeWeight(nodes[i], nodes[i+1]));
        }
        
        this.mutationRate = 0.1;
        this.score = 0;
        
        function makeWeight(nodeFrom, nodeTo){
            var weight = [];
            for(let i=0; i<nodeTo; i++){
                weight[i] = [];
                for(let j=0; j<nodeFrom; j++){
                    weight[i][j] = Math.random()*2 - 1;
                }
            }
            return weight;
        }
        
    }
    
    rebuildFrom(parent1, parent2){
        this._crossover(parent1, parent2);
        this._mutation();
    }
        
    _crossover(parent1, parent2){
        let weights1 = parent1.weights;
        let weights2 = parent2.weights;
        
        let decisionBoundary = parent1.score / (parent1.score + parent2.score);

        for(let l=0; l<this.weights.length; l++){
            for(let i=0; i<this.weights[l].length; i++){
                for(let j=0; j<this.weights[l][i].length; j++){
                    if(Math.random() < decisionBoundary){
                        this.weights[l][i][j] = weights1[l][i][j];
                    } else{
                        this.weights[l][i][j] = weights2[l][i][j];
                    }
                }
            }
        }
    }
    
    _mutation(){
        for(let l=0; l<this.weights.length; l++){
            for(let i=0; i<this.weights[l].length; i++){
                for(let j=0; j<this.weights[l][i].length; j++){
                    if(Math.random() < this.mutationRate){
                        this.weights[l][i][j] = 2*Math.random()-1;
                    }
                }
            }
        }
    }
}