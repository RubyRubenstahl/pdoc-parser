module.exports = function parseLabels($) {
    const labels = $('Label');
    const labelData = labels.map((i, label) => {
        const itemData = $('ItemData', label)[0];
        const caption = $('Caption', label)[0];
        const font = $('Font', caption)[0];
        const attribs = {
            ...label.attribs,
            ...caption.attribs,
            ...itemData.attribs,
            ...font.attribs,
        };

        return {
            id: Number(attribs['Id']),
            text: caption.firstChild.data,
            posX: Number(attribs['PosX']),
            posY: Number(attribs['PosY']),
            rotation: Number(attribs['Rotation']),
            comment: attribs['Comment'],
            font: {
                align: attribs['Align'],
                face: attribs['Face'],
                height: Number(attribs['Height']),
                style: Number(attribs['Style']),
                color: Number(attribs['Color']),
            }
        }

    });
    return labelData
}
