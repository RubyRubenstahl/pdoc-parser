module.exports = function parseSections($) {
    const sections = $('Section');
    const data = sections.map((i, section) => {
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
    return $(data).toArray()
}

function getCanvas(sectionEl) {
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

