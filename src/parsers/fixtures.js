module.exports = function parseFixtures($) {
    const fixtures = $('Item');
    const fixtureData = fixtures.map((i, fixture) => {
        const itemData = fixture.children[1];

        const attribs = { ...fixture.attribs, ...itemData.attribs };

        const data = {
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
            matrix: getMatrixData(fixture)
        };

        const isInMatrix = !!data.matrix;
        const sectionData = isInMatrix ? fixture.parent.parent.parent.parent.attribs : fixture.parent.parent.attribs
        data.section = {
            name: sectionData['Name']
        }
        return data;
    });
    return fixtureData;
}

function getMatrixData(fixtureEl) {

    if (fixtureEl.parent.name !== "MatrixElement") {
        return null;
    }
    const matrixEl = fixtureEl.parent.parent;
    const attribs = { ...matrixEl.attribs, ...matrixEl.firstChild.attribs };

    const matrixData = {
        id: Number(attribs.Id),
    }
    return matrixData;
}



