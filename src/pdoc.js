const cheerio = require('cheerio');
const fs = require('fs');


function loadPdoc(filePath) {
    const pdocXml = fs.readFileSync('test-data/test.pdoc').toString();
    const $ = cheerio.load(pdocXml, {
        normalizeWhitespace: true,
        xmlMode: true
    });


    const getTotalFixtureCount = () => {
        const fixtures = $('Item', 'Section');
        return fixtures.length;
    }

    const getSectionFixtureCount = sectionIndex => {
        const section = _getSection(sectionIndex)
        const fixtures = $('Item', section);
        return fixtures.length;
    }

    // sectionId can be a string or the index
    const _getSection = sectionId => {
        if (typeof sectionId === "string") {
            const targetSection = $(`Section[Name="${sectionId}"]`);
            return targetSection;
        } else {
            const sections = $('Section');
            const targetSection = sections[sectionId];
            return targetSection;
        }
    }

    return { getTotalFixtureCount, getSectionFixtureCount, _getSection }
}





module.exports = { loadPdoc }