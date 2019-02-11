const cheerio = require('cheerio');
const parseFixtures = require('./parsers/fixtures');
const parseSections = require('./parsers/sections');
const parseLabels = require('./parsers/labels');


module.exports = function Pdoc(pdocXml) {
    const $ = cheerio.load(pdocXml, {
        normalizeWhitespace: true,
        xmlMode: true
    });

    const pdoc = {
        sections: parseSections($),
        fixtures: parseFixtures($),
        labels: parseLabels($),
    }

    return pdoc;
}





