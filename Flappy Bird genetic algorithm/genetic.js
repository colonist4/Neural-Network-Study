class Genetic{
    constructor(speciesNum){
        this.NN = new NN();
        this.generation = 0;
        
        this.models = [];
        for(let i=0; i<speciesNum; i++){
            this.models.push(new Model());
        }
    }
    
    modelDead(i, score){
        this.models[i].score = score;
    }
    
    getOutput(i, data){
        return this.NN.forward(data, this.models[i]);
    }
    
    nextGen(){
        this.generation ++;
        this.modelSort();
        var minScore = this.models.reduce((acc, cur) => acc.score<cur.score?acc:cur).score - 1;
        var pool = [];
        for(let model of this.models){
            for(let i=0; i<model.score - minScore; i++)
                pool.push(model);
        }
        for(let i=2; i<this.models.length; i++){
            let r1 = parseInt(Math.random()*pool.length);
            let r2 = parseInt(Math.random()*pool.length);
            this.models[i].rebuildFrom(pool[r1], pool[r2]);
        }
    }
    
    modelSort(){
        this.models.sort((model1, model2)=>{
            return model1.score < model2.score? 1:-1;
        })
    }
}