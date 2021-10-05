var moment = require('moment');
var moment = require('moment-business-days')

//lendo o arquivo
const neatCsv = require('neat-csv')
const fs = require('fs')
const arquivo = fs.readFile('./Toggl_Track_summary_report_2021-10-01_2021-10-31(3).csv', async (err, data) => {
  if(err){
    console.error(err)
    return
  }
  let arquivo = await neatCsv(data)

  arquivo.map((registro) => {
   registro.dataInicio = new Date(registro['Start date'] + "T" + registro['Start time']);
   registro.dataFim = new Date(registro['End date'] + "T" + registro['End time']);
 });

 arquivo.sort(function (a, b) {
  let comparison = 0;
  if (a.dataFim < b.dataFim) {
    comparison = 1;
  } else if (a.dataFim > b.dataFim) {
    comparison = -1;
  }
  return comparison;
});

arquivo.map((registro, i) => {
  //se existe um registro anterior
  if (arquivo[i - 1]) {
    //caso a data final do registro for maior que a dara inicial do próximo
    if (registro.dataFim > arquivo[i - 1].dataInicio) {
      console.log('Horário conflitante')
      console.log(registro)
      console.log([i-1])
      
    }
  }
})

const primeiraDataDoRelatorio = new Date()

let mesAtual = new Date(primeiraDataDoRelatorio)

let mesAtualNumero = mesAtual.getMonth() + 1


let dataInicio = new Date(
                          new Date(mesAtual).setDate(1)
                          )

 let dataFim = new Date(
                       new Date(
                                 new Date(mesAtual).setMonth(mesAtualNumero)
                             ).setDate(0))


 let diasUteis = 0;
 let diaTestado = 0;
 const diasFolga = [0, 6];
 do{
   diaTestado++
   let dia = new Date(dataInicio).setDate(diaTestado)
   //0 domingo - 6 sabado
   //aqui faz o teste se é dia util ou  não
   if(!diasFolga.includes(new Date(dia).getDay())){
     diasUteis++; 
   }
  }
 while(diaTestado != dataFim.getDate())

  const obj = {};
//percorrer o teu arquivo (array)
  arquivo.map(d => {
//split da data na posicao zero (retorna o que vem antes de T)
let dia = d["Start date"]
//ele atribui a data no objeto
  obj[dia]=true
})

let count = 0
//percorrer as keys do obj, tendo as data unicas
Object.keys(obj).map(key => {
count++

})

//if comparando dias trabalhados com dias uteis do mes

if (count > diasUteis){
console.log('Há dias faltando. Por favor, verifique seu relatório no Toggl para corrigir as pendências.')
}
else{
console.log('Não há dias faltantes, parabéns!')
}




});


  



