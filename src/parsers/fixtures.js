module.exports = function parseFixtures($) {
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



