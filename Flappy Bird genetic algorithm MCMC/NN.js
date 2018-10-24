class NN{
    constructor(){}
    
    // data : n x 1
    forward(data, model){
        var h = data;
        for(let i=0; i<model.weights.length; i++){
            h = this.matrixProduct(model.weights[i], h);
            h = this.sigmoid(h);
        }
        
        return h;
    }
    
    sigmoid(mat){
        var result = [];
        for(let i=0; i<mat.length; i++){
            result.push([]);
            for(let j=0; j<mat[i].length; j++){
                result[i][j] = 1/(1+Math.exp(-mat[i][j]));
            }
        }
        return result;
    }
    
    matrixProduct(mat1, mat2){
        var result = [];
        for(let i=0; i<mat1.length; i++){
            result.push([]);
            for(let j=0; j<mat2[0].length; j++){
                let sum = 0;
                for(let k=0; k<mat2.length; k++){
                    sum += mat1[i][k]*mat2[k][j];
                }
                result[i][j] = sum;
            }
        }
        return result;
    }
    
    
}