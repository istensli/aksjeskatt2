function addBuyData(){
    let number = parseInt(document.getElementById('buy-number').value);
    let price = Number(document.getElementById('buy-price').value);
    let brokerage = Number(document.getElementById('buy-brokerage').value);
    //baker inn kurtasje i kursen. Er en måte å gjøre det på..
    price += brokerage/number;
    //runder av til to desimaler
    price = price.toFixed(2);

    bought.push({number: number,
                price: price});

    showBoughtList();             
}

function addSaleData(){
    let number = parseInt(document.getElementById('sale-number').value);
    let price = Number(document.getElementById('sale-price').value);
    let brokerage = Number(document.getElementById('sale-brokerage').value);
    //baker inn kurtasje i kursen. Er en måte å gjøre det på..
    price -= brokerage/number;
    //runder av til to desimaler
    price = price.toFixed(2);

    sold.push({number: number,
                price: price});

    showSoldList();            

}

function addTaxRate(){
    let newTaxRate = Number(document.getElementById('tax-input').value);
    taxRate = newTaxRate;

    showInfo();
}


function makeIsolatedStockList(inputList){
    let isolatedStockList = [];
    
    for(let item of inputList){
        for(let i = 0; i < item.number; i++){
            isolatedStockList.push(item.price);

        }
    }
    return isolatedStockList;

}


function calculateYield(){
    let isolatedYieldList = [];
    let yieldSum = 0;

    //fungerer foreløpig ikke med shorting
    let isolatedBoughtStocks =  makeIsolatedStockList(bought);
    let isolatedSoldStocks = makeIsolatedStockList(sold);

    
    for(let i = 0; i < isolatedSoldStocks.length;i++){
        isolatedYieldList.push(isolatedSoldStocks[i] - isolatedBoughtStocks[i]);
    }
    for(let isolatedYield of isolatedYieldList){
        yieldSum += isolatedYield;
    }

    yield = yieldSum;

    showYield();

    calculateUnrealized();


}






function calculateUnrealized(){
    let newUnrealizedList = [];
    let unrealizedIsolatedList = [];
    let isolatedBoughtStocks =  makeIsolatedStockList(bought);
    let isolatedSoldStocks = makeIsolatedStockList(sold);
    let startUnrealizedIndex = isolatedSoldStocks.length;//starter etter siste element i solgte aksjer
    let stockCount = 1;
    let lengthDifferenceLists = isolatedBoughtStocks.length - isolatedSoldStocks.length;

        //lager egen lang liste med urealiserte aksjer
    for(let i = 0; i<(lengthDifferenceLists); i++){//hvis lengthDifferenceLists er 0 går aldri løkka
        unrealizedIsolatedList.push(isolatedBoughtStocks[startUnrealizedIndex+i]);
    }
    for(let j = 0; j < unrealizedIsolatedList.length; j++){
        if(unrealizedIsolatedList.length - j <= 1){//hvis det ikke er flere elementer igjen ett element fra iteratoren j
            newUnrealizedList.push({number: Number(stockCount), price: Number(unrealizedIsolatedList[j])});
            break;

        }
        if(unrealizedIsolatedList[j] == unrealizedIsolatedList[j+1]){
            stockCount++;
        }
        else{
            newUnrealizedList.push({number: Number(stockCount), price: Number(unrealizedIsolatedList[j])});
            stockCount = 1;

        }
    }


    unrealized = newUnrealizedList;

    showUnrealized();

    
}

function deleteLastBuy(){
    bought.pop();
    showBoughtList();

}
function deleteLastSell(){
    sold.pop();
    showSoldList();

}


//--mangler funksjonalitet for å lagre og hente aksjer fra fil
//



//under mangler engelske funksjon og variabelnavn

function hentAksjer(){
    var kursListe = [];
    var antalListe = [];

    var fil1 = document.getElementById('opplasting').files[0];
    //console.log(fil1);
    //console.log("Test1");

    var reader = new FileReader();
    reader.onload = function() {
        try{
            var obj = JSON.parse(reader.result);
        }    
        catch (e){
            console.log(e);
        }       
        
        for(let elem of obj){

            bought.push({
                number: elem.number,
                price: elem.price});

        }     

        
        
        showBoughtList();

    };
    reader.readAsText(fil1); 
    
    
   
    
}







class JavascriptDataDownloader {

    constructor(data={}) {
        this.data = data;
    }

    download (type_of = "application/JSON", filename= "urealiserte.json") {
        let body = document.body;
        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([JSON.stringify(this.data, null, 2)], {
            type: type_of
        }));
        a.setAttribute("download", filename);
        body.appendChild(a);
        a.click();
        body.removeChild(a);
    }
} 





function lagreJSON(){
    new JavascriptDataDownloader(unrealized).download();


}