const cheerio = require('cheerio');
const parseFixtures = require('./parsers/fixtures');
const parseSections = require('./parsers/sections');
const parseLabels = require('./parsers/labels');
const parseDevices = require('./parsers/devices');


module.exports = function Pdoc(pdocXml) {
    const $ = cheerio.load(pdocXml, {
        normalizeWhitespace: true,
        xmlMode: true
    });

    const pdoc = {
        sections: parseSections($),
        fixtures: parseFixtures($),
        labels: parseLabels($),
        devices: parseDevices($)
    }

    return pdoc;
}





