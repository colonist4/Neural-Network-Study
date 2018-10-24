class Model{
    
    constructor(){
        // input, hidden, output
        // input : [x_dist, y_dist, y_vel].T
        // output : jump?
        const nodes = [3, 5, 1];
        this.dimension = 0;
        for(let i=0; i<nodes.length-1; i++)
            this.dimension += nodes[i]*nodes[i+1];
        
        // weight1 : 5x3
        // weight2 : 1x5
        this.weights = [];
        for(let i=0; i<nodes.length-1; i++){
            this.weights.push(makeWeight(nodes[i], nodes[i+1]));
        }
        
        this.mutationRate = 0.1;
        this.score = 0;
        this.maxScore = 0;
        this.stepSize = 0.2;
        
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
    
    nextStep(){
        let d = this.dimension - 1;
        
        let r = 0; for(let i=0; i<6; i++) r+=Math.random(); r /= 6;
        
        let step = this.stepSize * r;
        let direction_cos = [];
        for(; d>=0; d--){
            direction_cos[d] = 2*Math.random() -1;
        }
        let sum = direction_cos.reduce((acc, cur)=>acc+cur*cur);
        sum = Math.sqrt(sum);
        direction_cos.forEach((cur, ind, arr)=>{arr[ind]=arr[ind]/sum});
        
        let prevWeight = [];
        d = 0;
        for(let l=0; l<this.weights.length; l++){
            prevWeight[l] = [];
            for(let i=0; i<this.weights[l].length; i++){
                prevWeight[l][i] = [];
                for(let j=0; j<this.weights[l][i].length; j++){
                    if(this.maxScore <= this.score){
                        prevWeight[l][i][j] = this.weights[l][i][j];
                        this.weights[l][i][j] += direction_cos[d++]*step;
                        if(isNaN(this.weights[l][i][j])) 
                            noLoop();
                    } else{
                        this.weights[l][i][j] = this.prevWeight[l][i][j] + direction_cos[d++]*step;
                    }
                }
            }
        }
        
        if(this.maxScore <= this.score) {
            this.prevWeight = prevWeight;
            this.maxScore = this.score;
        }
    }
    
    copyFrom(model){
        for(let l=0; l<this.weights.length; l++){
            for(let i=0; i<this.weights[l].length; i++){
                for(let j=0; j<this.weights[l][i].length; j++){
                    this.weights[l][i][j] = model.weights[l][i][j];
                }
            }
        }
    }
}