const deviceTypes = [
    {
        displayName: 'Butler XT2',
        typeId: 'dmx_butler_xt2'
    },
    {
        displayName: 'Butler S2',
        typeId: 'dmx_butler_s2'
    },
    {
        displayName: 'Butler PRO',
        typeId: 'dmx_butler_pro'
    },
    {
        displayName: 'Butler PRO e:pix',
        typeId: 'dmx_butler_pro_epix'
    },
    {
        displayName: 'VMC',
        typeId: 'dmx_dvi_rocket'
    },
    {
        displayName: 'Butler Classic',
        typeId: 'dmx_butler'
    },
    {
        displayName: 'Butler XT',
        typeId: 'dmx_butler_xt'
    },
]

const getNameByTypeId = typeId => {
    const device = deviceTypes.find(device => device.typeId === typeId);
    return !!device ? device.displayName : 'Unknown device type.'
}

module.exports = function parseDevices($) {
    const devices = $('device');
    const deviceData = devices.map((i, device) => {
        const data = {
            name: device.attribs["name"],
            type: device.attribs["type"],
            typeDisplayName: getNameByTypeId(device.attribs["type"]),
            id: device.attribs["id"],
            ipAddress: null,
            macAddress: null,
            dmxPorts: [],
            deviceId: null
        }

        const ipData = $(device).find('ipaddress');
        if (ipData.length > 0) {
            data.ipAddress = ipData[0].attribs.address;
        }

        const macData = $(device).find('macaddress');
        if (macData.length > 0) {
            data.macAddress = macData[0].attribs.address;
        }
        const dmxPortData = $(device).find('dmxmapping');
        if (dmxPortData.length > 0) {
            data.dmxPorts = $(dmxPortData).toArray().map(port => ({
                universe: Number(port.attribs.universe),
                port: port.attribs.port === "0" ? null : Number(port.attribs.port)
            }));
        }

        return data;
    });
    return $(deviceData).toArray();

}