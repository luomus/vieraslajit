const http = require('http');
const fs = require('fs');

var options = {
    host: 'vieraslajit-dev.laji.fi'
    ,port: 80
    ,path: '/api/taxa/MX.37600/species?page=1&pageSize=400&invasiveSpeciesFilter=true&lang=fi&selectedFields=id'
    ,method: 'GET'
    ,headers: { 'Content-Type': 'application/json' }
  };

http.get(
    options,
    (res) => {
        let data = [];
        res.on('data', (d) => {
            data.push(d);
        });
        res.on('end', () => {
            // @ts-ignore
            const parsed = JSON.parse(data);
            const species: any[] = parsed.results;
            const ids: string[] = species.map(s => s.id);
            const urlStart = 'https://vieraslajit-dev.laji.fi/taxon/'
            const speciesUrls = ids.map(id => urlStart + id);
            let sitemap = '';
            for (let url of speciesUrls) {
                sitemap = sitemap += url + '\n';
            }
            
            fs.writeFile('./assets/sitemap', sitemap, (err) => {  
                if (err) throw err;
                console.log('Sitemap saved!');
            });
        });
    }
)