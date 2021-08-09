let olympicsMedalTable = [
    { id: 1, country: "BRASIL", gold: 7, silver: 6, bronze: 6, continent: "AMERICA DO SUL" },
    { id: 2, country: "USA", gold: 46, silver: 37, bronze: 17, continent: "AMERICA DO NORTE" },
    { id: 3, country: "CHINA", gold: 26, silver: 18, bronze: 26, continent: "ASIA" },
    { id: 4, country: "RUSSIA", gold: 19, silver: 18, bronze: 19, continent: "EUROPA" },
    { id: 5, country: "REINO UNIDO", gold: 27, silver: 23, bronze: 17, continent: "EUROPA" },
    { id: 6, country: "ALEMANHA", gold: 17, silver: 10, bronze: 15, continent: "EUROPA" },
    { id: 7, country: "JAPÃO", gold: 12, silver: 8, bronze: 21, continent: "ASIA" },
    { id: 8, country: "ARGENTINA", gold: 3, silver: 1, bronze: 0, continent: "AMERICA DO SUL" },
    { id: 9, country: "ITALIA", gold: 8, silver: 12, bronze: 8, continent: "EUROPA" },
    { id: 10, country: "QUÊNIA", gold: 6, silver: 6, bronze: 1, continent: "AFRICA" },
];

Array.prototype.customFind = function (callback) {
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            return this[i]
        }
    }
}

Array.prototype.customSome = function (predicate) {
    for (let i = 0; i < this.length; i++) {
        if (predicate(this[i], i, this)) {
            return true
        }
    }
    return false
}

Array.prototype.customFilter = function (predicate) {
    const newArray = []
    for (let i = 0; i < this.length; i++){
        if(predicate(this[i], i , this)){
            newArray.push(this[i])
        }
    }
    return newArray
}

Array.prototype.customMap = function (callback) {
    const newArray = []
    for(let i = 0; i < this.length; i++){
        newArray.push(callback(this[i], i, this))
    }
    return newArray
}

Array.prototype.customReduce = function (callback, initialValue) {
    let acumulador = initialValue
    for (let i = 0; i < this.length; i++) {
        acumulador = callback(acumulador, this[i], i, this)
    }
    return acumulador
}

const resultFilterMapReduce = olympicsMedalTable.filter(i => i.continent === "ASIA")
    .map(i => i.gold) 
    .reduce((total, quantity) => total + quantity); 

console.log(`Medalhas de Ouro no continente Asiático: ${resultFilterMapReduce}`);


// Implemente as funções customizadas - customFilter, customMap e customReduce e verique se o retorno é igual ao do código modelo

/* DESAFIOS - CONCLUA AS FUNÇÕES customSome, customFind E UTILIZANDO TODAS AS FUNÇÕES 'CUSTOM' CONCLUA OS DESAFIOS ABAIXO: */

// 1 - Crie um algoritmo que encontre o único pais do continente Africano

const paisAfricano = olympicsMedalTable.customFind(country => country.continent === "AFRICA");

// 2 - Crie um algoritmo que retorne o total de medalhas por país
const medalhasPorPais = olympicsMedalTable.customMap(country => {
    const { gold, silver, bronze } = country
    return {
        ...country, totalMedal: gold + silver + bronze
    }
});
console.log(medalhasPorPais);

// 3 - Crie um algoritmo para encontrar os países que conquistaram mais que 10 medalhas de ouro
const paisesCom10MedalhasOuroNoMinimo = olympicsMedalTable.customFilter(country => {
    return country.gold > 10
});
console.log(paisesCom10MedalhasOuroNoMinimo);

// 4 - Crie um algoritmo para encontrar os países que conquistaram no minímo 30 medalhas (Ouro, Prata e Bronze)
const paisesCom30MedalhasNoMinimo = olympicsMedalTable.customFilter(country => {
    const {gold, silver, bronze} = country
    const sum = gold + silver + bronze

    if (sum >= 30) {
        return country
    }
});
console.log(paisesCom30MedalhasNoMinimo);

// 5 - Crie um algoritmo para verificar se o continente América do Sul conquistou pelo menos 20 medalhas de ouro
const paisesComPeloMenos20MedalhasDeOUro = 
    olympicsMedalTable
        .customFilter(country => country.continent === "AMERICA DO SUL")
        .customReduce((acc, country) => acc + country.gold, 0) >= 20
        
console.log(paisesComPeloMenos20MedalhasDeOUro);