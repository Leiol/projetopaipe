
//lendo o arquivo
 const neatCsv = require('neat-csv')
 const fs = require('fs')
 const arquivo = fs.readFile('./Toggl_time_entries_2021-09-01_to_2021-09-30.csv', async (err, data) => {
   if(err){
     console.error(err)
     return
   }
   let arquivo = await neatCsv(data)

   arquivo.map((registro) => {
    registro.dataInicio = new Date(registro['Start date'] + "T" + registro['Start time']);
    registro.dataFim = new Date(registro['End date'] + "T" + registro['End time']);
    registro.subDatas = new Date(registro.dataFim - registro.dataInicio);
  });
  
  //ordena os registros por data fim DESCENDENTE (maior -> menor)
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
        console.log("SOBREPOSICAO");
        console.log(registro);
        console.log(arquivo[i - 1]);
      }
    }
  });
  
 })

