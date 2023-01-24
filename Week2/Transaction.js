class Transaction {
    constructor(inputUTXOs, outputUTXOs) {
        this.inputs = inputUTXOs;   //Array with instances of  TXO
        this.outputs = outputUTXOs; //Array with instances of TXO 
        this.fee = -1; //negative, should be 0 at the end of the transaction
    }

    execute() {
        let txoSpent = false, accumulatorInputs = 0, accumulatorOutputs=0;

        /*
            Sum total value of inputs and total value of outputs
            verify the state of the TXO.spent is not true(already spent)
        */
        for(let i=0;i<this.inputs.length;i++){
            accumulatorInputs += this.inputs[i].amount;

            if(this.inputs[i].spent === true){
                txoSpent=true;
            }
        }

        //Accumulate the total output amount
        for(let j=0;j<this.outputs.length;j++){
            accumulatorOutputs += this.outputs[j].amount
        }

        //if output(amount to send) is greater than the inputs(my funds) --> error
        if(accumulatorInputs < accumulatorOutputs){
            throw new Error("Not enough funds")
        }

        //if my inputs are already spent --> error
        if(txoSpent === true){
            throw new Error("TXO already spent")
        }
        
        /*
            * Mark the inputs as spent 
            * fees equal to the left over between inputs-outputs
        */
        this.inputs.map(input => input.spend())
        this.fee = accumulatorInputs - accumulatorOutputs;
    }
}

module.exports = Transaction;