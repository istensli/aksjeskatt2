
showInData();
showInfo();
showBoughtList();
showSoldList();
showCalculateButton();

function showInData(){
    
    let html = showInDataBool ? /*HTML*/`<div id="in-data"><p><h3>Kjøp:</h3></p> <table>
        <tr><td>Antall:</td><td>Kurs:</td><td>Kurtasje:</td>
        </tr>
        <tr>
        <td colspan="1">
            <input type="number" id="buy-number"/>
        </td>
        <td colspan="1">  
            <input type="number" id="buy-price"/>
        </td>
        <td colspan="1">   
            <input type="number" id="buy-brokerage"/>
        </td>
            <td colspan="1"><button class="addButton" onclick="addBuyData()">legg til data</button>
        </td>  
        
        
        </tr>
        
        <tr><td>&nbsp;</td></tr>
        </table>
        
        <p><h3>Salg:</h3></p>
        <table>
        <tr><td>Antall:</td><td>Kurs:</td><td>Kurtasje:</td>
        </tr>
        <tr>
        <td colspan="1">
            <input type="number" id="sale-number"/>
        </td>
        <td colspan="1">  
            <input type="number" id="sale-price"/>
        </td>
        <td colspan="1">   
            <input type="number" id="sale-brokerage"/>
        </td>
            <td colspan="1"><button class="addButton" onclick="addSaleData()">legg til data</button>
        </td>  
        
        </tr>
        
        
        </table>
        <div id="tax-input-div"><p class="tax-label"><b>Skattesats i prosent på aksjeavkastning:</b></p>
            <input type="number" id="tax-input" min="1" max="100" value="${taxRate}">
            <button class="addButton" onclick="addTaxRate()">Angi skattesats</button>
            
        </div>

        </div>
        
        ` : '';

    document.getElementById('input-data').innerHTML = html;
}
//<tr><td>&nbsp;</td></tr>
function showInfo(){
    let html = /*HTML*/`<p>Dette programmet regner ut realisert avkastning p&aring; aksjer realisert etter <br>
        Først Inn Først Ut - prinsippet etter skatteloven &sect;10-36.<br>
        Regn ut for en type aksje av gangen. Angi beløp i kroner(NOK).</p>
        <p>Last inn eventuelle urealiserte aksjer fra i fjor:</p>
        <input type="file" id="opplasting" onchange="hentAksjer()" />
        <br /><br /><br /><br />
        <p>Angitt skattesats er : ${taxRate}</p>
        
        `;
        document.getElementById('info').innerHTML = html;

}

function showBoughtList(){
    let html = /*HTML*/`<p><h3>Kjøpsliste:</h3></p> <table>
        <tr><th>Antall:</th><th>Kurs:</th>
        </tr>`;
        for(let i = 0; i < bought.length; i++){
            html += /*HTML*/`<tr><td>${bought[i].number}</td>
                <td>${bought[i].price}</td></tr>`;
        }
        html += /*HTML*/`</table>`;
        html += /*HTML*/`<br><button onclick="deleteLastBuy()">Slett siste</button>`;
    
    document.getElementById('bought').innerHTML = html;  
}

function showSoldList(){
    let html = /*HTML*/`<p><h3>Salgsliste:</h3></p> <table>
        <tr><th>Antall:</th><th>Kurs:</th>
        </tr>`;
        for(let i = 0; i < sold.length; i++){
            html += /*HTML*/`<tr><td>${sold[i].number}</td>
                <td>${sold[i].price}</td></tr>`;
        }
        html += /*HTML*/`</table>`;
        html += /*HTML*/`<br><button onclick="deleteLastSell()">Slett siste</button>`;
    
    document.getElementById('sold').innerHTML = html;  
}

function showCalculateButton(){
    
    let html = /*HTML*/`<button class="calculate-button" onclick="calculateYield()">Kalkuler avkastning</button>`;
    document.getElementById('calculate-button-div').innerHTML = html;
}

function showYield(){

    let formatter = new Intl.NumberFormat('nb-NO', {
        style: 'currency',
        currency: 'NOK',

    });
    let yieldNOK = formatter.format(yield);

    
    let tax = (yield * (taxRate*0.01));
    let taxNOK = formatter.format(tax);
    let yieldAfterTaxNOK = formatter.format(yield - tax);


    let html = /*HTML*/`<p> Avkastning: ${yieldNOK}</p>`;
    html += /*HTML*/`<p> Skatt: ${taxNOK}</p>`;
    html += /*HTML*/`<p> Avkastning etter skatt: ${yieldAfterTaxNOK}</p>`;

    if (isNaN(yield)){
        html = `<p>DU HAR SOLGT FOR MANGE AKSJER!</p>`;
    }

    document.getElementById('yield').innerHTML = html;
}



function showUnrealized(){
    

    let html = '<p><h3>Urealiserte aksjer:</h3></p>';
    if(unrealized.length == 0)
        html += `<p>Alle aksjer er realisert!</p>`;


    
    html += /*HTML*/`<table>
    <tr><th>Antall:</th><th>Kurs:</th>
    </tr>`;
    
    for(let i=0;i<unrealized.length;i++){
        html += /*HTML*/`<tr>
        <td>
            ${unrealized[i].number}
            
        </td>
        <td>
            ${unrealized[i].price}  
            
        </td>
        </tr>`;
    }    
    
    html += `<tr><td>&nbsp;</td></tr>
        </table>
        <button id="lagre" onclick="lagreJSON()">Lagre urealiserte til fil...</button>`;

    document.getElementById('unrealized').innerHTML = html;    

}

//--mangler ordentlig formattering på avkastning






