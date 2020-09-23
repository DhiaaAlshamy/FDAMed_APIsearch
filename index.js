
let drugsBrandNames = [];
let drugsGenericNames = [];

document.addEventListener('DOMContentLoaded', () => {

    console.log('Im here');
  
    
})

fetchTheNames = () => {
    
    //limits of the drugs >> the API contains up to 170000 drug 
    limit = 10
    fetch('https://api.fda.gov/drug/label.json?limit=' + `${limit}`)
        .then(promis => promis.json())
        .then(result => console.log(fillNames(result.results)))
        .catch(err => console.log("error in fetching medicines names", err));
}

fillNames = (data) => {
    openFDADrugs = data.filter((drug) => {
        return Object.keys(drug.openfda).length != 0;
    }).map((drug) => { return { genName: drug.openfda.generic_name, brand_name: drug.openfda.brand_name } })
    drugsGenericNames = openFDADrugs.map((drugName) => {
        //the generic name
        gopt = document.createElement('option')
        //the Brand name
        bopt = document.createElement('option')
        gopt.innerHTML = drugName.genName[0];
        bopt.innerHTML = drugName.brand_name[0];
        document.getElementById('med-gen-name').options.add(gopt);
        document.getElementById('med-br-name').options.add(bopt);
    })

}
 addEvent=(e)=> {
        console.log(e);
        searchBy=document.getElementById('search-by').value;
        fetchTheResult(searchBy);
    
}
fetchTheResult = (term, value) => {
    //search by gen name
    baseUrl='https://api.fda.gov/drug/label.json?';
    if (term == 'gen-name') {
        searchTerm = `search=patient.drug.openfda.generic_name.exact=${document.getElementById('med-gen-name').value}`;
    }
    else if(term=='br-name'){
        searchTerm = `search=patient.drug.openfda.brand_name.exact=${document.getElementById('med-br-name').value}`;

    }
    else if(term=='ind'){
        searchTerm = `search=patient.drug.drugindication=${document.getElementById('indication').value}&limit=9`;
        
    }
    fetch(baseUrl +searchTerm)
        .then(promis => promis.json())
        .then(result => {displayResult(result.results)})
        .catch(err => console.log("error in fetching medicine Data", err));
}
displayResult = (med) => {
    document.getElementById('results').innerHTML=null;
    if(med[0]==undefined) return
    for(let i=0 ; i<med.length;i++){
        medData = {
            genericName:med[i].openfda.generic_name,
            BrandName:med[i].openfda.brand_name,
            dosage_and_administration: med[i].dosage_and_administration,
            openfda: med[i].openfda,
            purpose: med[i].purpose,
            indications_and_usage: med[i].indications_and_usage
        }
    let resultDiv = document.createElement('div');
    Object.keys(medData).map((key) => {
        let head = document.createElement('h1');
        head.innerText = [key];
        let text = document.createElement('p');
        text.innerText = medData[key];
        resultDiv.append(head, text);
    })

    document.getElementById('results').appendChild(resultDiv);
}

}

