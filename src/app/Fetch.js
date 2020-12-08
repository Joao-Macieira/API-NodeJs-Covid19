const fetch = require('node-fetch');

exports.index = (req, res) => {

  const { state, dateStart, dateEnd } = req.query;

  if (!state) {
    return res.status(400).json({ error: ['Preencha o filtro de state para fazer a requisição'] });
  }

  if (!dateStart) {
    return res.status(400).json({ error: ['Preencha o filtro dateStart(YYYY-MM-DD) para fazer a requisição'] });
  }

  if (!dateEnd) {
    return res.status(400).json({ error: ['Preencha o filtro dateEnd(YYYY-MM-DD) para fazer a requisição'] });
  }

  const token=process.env.USER_TOKEN;

  const datasetSlug="covid19";
  const tableName="caso_full";

  const filters = {state, date: dateStart };

  const url=`https://api.brasil.io/v1/dataset/${datasetSlug}/${tableName}/data?state=${filters.state}&date=${filters.date}`;

  const data = [];

  fetch(
    url,
    {
      method: 'get',
      headers: {
        Authorization: `Token ${token}`,
      },
    }
    )
    .then(res => res.json())
    .then(json =>  {
      results = json.results

      for (let result of results) { // Acesso aos dados do json
        const percent = (result.last_available_confirmed / result.estimated_population ) * 100;
        const newPercent = parseFloat(percent.toFixed(2))+' %';

        const newData = {
          city: result.city,
          percent: newPercent,
        };

        data.push(newData);
      }

      data.sort( (a, b) => {
        if (a.percentt < b.percent) {
          return 1;
        }
        if (a.percent > b.percent) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });

      data.shift();

      data.splice(10, (data.length - 10));

      const body = [];

      for ( let i = 0; i < data.length; i++) {
        const dataSend = {
          id: i,
          nomeCidade: data[i].city,
          percentualDeCasos: data[i].percent
        }
        body.push(dataSend);
      }

    fetch('https://us-central1-lms-nuvem-mestra.cloudfunctions.net/testApi', {
      method: 'post',
      body:    JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'MeuNome': 'João Paulo Pereira Macieira Ribeiro',
      },
    })
      .then(res => res.json())
      .then(json => console.log(json));
      res.json(body);
    }); //json.results
}


// Falta Selecionar os 10 primeiro itens do array e enviar via post.

