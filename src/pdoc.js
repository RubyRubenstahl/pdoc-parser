const cheerio = require('cheerio');
const fs = require('fs');


function loadPdoc(filePath) {
    const pdocXml = fs.readFileSync('test-data/test.pdoc').toString();
    const $ = cheerio.load(pdocXml, {
        normalizeWhitespace: true,
        xmlMode: true
    });

    const getFixtures = () => {
        const fixtures = $('Item');
        const fixtureData = fixtures.map((i, fixture) => {
            const itemData = fixture.children[1];
            const attribs = { ...fixture.attribs, ...itemData.attribs };

            return {
                id: Number(attribs['Id']),
                name: attribs['Name'],
                manufacturer: attribs['Manufacturer'],
                posX: Number(attribs['PosX']),
                posY: Number(attribs['PosY']),
                rotation: Number(attribs['Rotation']),
                comment: attribs['Comment'],
                width: Number(attribs['Width']),
                height: Number(attribs['Height']),
                universeId: Number(attribs['UniverseId']),
                dmxAddress: Number(attribs['DmxAddress']),
                screenId: Number(attribs['ScreenID']),
                displayName: attribs['DisplayName'],
                linkedTo: Number(attribs['LinkedTo']),
            }
        });
        return fixtureData;
    }

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