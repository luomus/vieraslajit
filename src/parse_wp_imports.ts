// SCRIPT FOR PARSING WORDPRESS IMPORT/EXPORT FILES
// REMOVES DIVS AND IMGS THAT HAVE AN UNKNOWN SRC

const removeDivs = (str: string): string => {
  // const divRegex = /<div.*?>|<\/div>/g;
  const divRegexStart = /<div.*?>/g;
  const divRegexEnd = /<\/div>/g;
  str = str.replace(divRegexStart, '<p>');
  str = str.replace(divRegexEnd, '</p>');
  return str;
}

const removeBlacklistedImgs = (str: string): string => {
  const imgRegex = /<img.*?src="(.*?)".*?>/g;
  const urlBlacklist = /(localhost)|(vieraslajit.fi)/;
  str = str.replace(imgRegex, (match, p1: string) => {
    if (p1.match(urlBlacklist)) {
      return '';
    } else {
      return match;
    }
  })
  return str;
}

(() => {
  const fs = require('fs');
  let file: string = fs.readFileSync('./wp_migration.xml').toString();
  file = removeDivs(file);
  file = removeBlacklistedImgs(file);
  fs.writeFile('./post_wp_migration.xml', file, (err) => {  
    if (err) throw err;
    console.log('post_wp_migration saved!');
  });
})();

