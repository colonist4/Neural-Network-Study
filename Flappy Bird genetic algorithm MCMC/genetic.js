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
        this.models.sort((a, b)=>a.score>b.score?-1:1);
        console.log(this.models[0].score);
        for(let i=1; i<this.models.length; i++)
            this.models[i].copyFrom(this.models[0]);
        
        for(let model of this.models){
            model.nextStep();
        }
    }
}