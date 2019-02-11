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

    const getCanvas = sectionEl => {
        const canvasIndex = 1;
        const attribs = sectionEl.children[canvasIndex].attribs;
        return {
            left: Number(attribs['Left']),
            top: Number(attribs['Top']),
            right: Number(attribs['Right']),
            bottom: Number(attribs['Bottom']),
            width: Number(attribs['Width']),
            height: Number(attribs['Height']),
        }
    }

    const getSections = () => {
        const sections = $('Section');
        return sections.map((i, section) => {
            const attribs = section.attribs;

            const sectionData = {
                name: attribs['Name'],
                comment: attribs['Comment'],
                sizeX: Number(attribs['SizeX']),
                sizeY: Number(attribs['SizeY']),
                bGLocked: attribs['BGLocked'] === "true",
                zoom: Number(attribs['Zoom']),
                gridX: Number(attribs['GridX']),
                gridY: Number(attribs['GridY']),
                viewX: Number(attribs['ViewX']),
                viewY: Number(attribs['ViewY']),
                originX: Number(attribs['OriginX']),
                originY: Number(attribs['OriginY']),
                originZ: Number(attribs['OriginZ']),
                rotationX: Number(attribs['RotationX']),
                rotationY: Number(attribs['RotationY']),
                rotationZ: Number(attribs['RotationZ']),
                canvas: getCanvas(section)
            }
            return sectionData;
        })
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

    return { getSections, getFixtures }
}





module.exports = { loadPdoc }