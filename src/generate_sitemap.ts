import type { PagedResult, Taxonomy } from "app/shared/model";

const fs = require('fs');
const path = require('path');

const apiUrl = 'https://vieraslajit.fi/api';
const rootTaxonId = 'MX.37600';
const pageSize = 10000;
const sitemapPath = path.join(__dirname, 'assets', 'sitemap');

async function getTaxonPage(page: number): Promise<PagedResult<Taxonomy>> {
  const url = `${apiUrl}/taxa/${rootTaxonId}/species?page=${page}`
    + `&pageSize=${pageSize}&invasiveSpeciesFilter=true&lang=fi&selectedFields=id`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json();
}

async function generateSitemap(): Promise<void> {
  const firstPage = await getTaxonPage(1);
  const taxa = firstPage.results.slice();

  for (let page = 2; page <= firstPage.lastPage; page++) {
    const taxonPage = await getTaxonPage(page);
    taxa.push(...taxonPage.results);
  }

  const sitemap = taxa
    .map(taxon => `https://vieraslajit.fi/lajit/${taxon.id}`)
    .join('\n') + '\n';

  await fs.promises.writeFile(sitemapPath, sitemap, 'utf8');
  console.log(`Sitemap saved to ${sitemapPath} (${taxa.length} taxa)`);
}

generateSitemap().catch(error => {
  console.error('Failed to generate sitemap:', error);
  process.exitCode = 1;
});
