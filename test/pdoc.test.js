const Pdoc = require('../src');
const fs = require('fs');
const pdocXml = fs.readFileSync('test-data/test.pdoc').toString();
const pdoc = Pdoc(pdocXml);



test('getSections loads correct section data', () => {
    const sections = pdoc.sections;
    expect(typeof sections[0]).toBe("object");

    const section1 = sections[0];
    expect(section1.name).toBe('Section#1');
    expect(section1.comment).toBe('');
    expect(section1.sizeX).toBe(10000);
    expect(section1.sizeY).toBe(7500);
    expect(section1.bGLocked).toBe(false);
    expect(section1.zoom).toBe(0.194872);
    expect(section1.gridX).toBe(250);
    expect(section1.gridY).toBe(250);
    expect(typeof section1.viewX).toBe('number');
    expect(typeof section1.viewY).toBe('number');
    expect(section1.originX).toBe(0);
    expect(section1.originY).toBe(0);
    expect(section1.originZ).toBe(0);
    expect(section1.rotationX).toBe(0);
    expect(section1.rotationY).toBe(0);
    expect(section1.rotationZ).toBe(0);

    const canvas = section1.canvas;
    expect(canvas.left).toBe(0);
    expect(canvas.top).toBe(0);
    expect(canvas.right).toBe(8000);
    expect(canvas.bottom).toBe(6000);
    expect(canvas.width).toBe(800);
    expect(canvas.height).toBe(600);
});

test('getFixtures loads correct fixture data', () => {
    const fixtures = pdoc.fixtures;
    const fixture = fixtures[0];

    expect(fixtures.length).toBe(23);
    expect(typeof fixture.id).toBe('number');
    expect(typeof fixture.name).toBe('string');
    expect(typeof fixture.manufacturer).toBe('string');
    expect(typeof fixture.posX).toBe('number')
    expect(typeof fixture.posY).toBe('number')
    expect(typeof fixture.rotation).toBe('number')
    expect(typeof fixture.comment).toBe('string');
    expect(typeof fixture.width).toBe('number')
    expect(typeof fixture.height).toBe('number')
    expect(typeof fixture.universeId).toBe('number')
    expect(typeof fixture.dmxAddress).toBe('number')
    expect(typeof fixture.screenId).toBe('number')
    expect(typeof fixture.displayName).toBe('string');
    expect(typeof fixture.linkedTo).toBe('number');
    expect(typeof fixture.section).toBe('object');
    expect(typeof fixture.section.name).toBe('string');
    if (!!fixture.matrix === 'object') {
        const item = fixture.matrix;
        console.log(item)
        expect(typeof item.id).toBe('number');
        expect(typeof item.row).toBe('number');
        expect(typeof item.column).toBe('number');
    }
});


test('getLabels loads correct label data', () => {
    const labels = pdoc.labels;
    const label = labels[0];

    expect(labels.length).toBe(5);
    expect(label.id).toBe(183);
    expect(label.posX).toBe(3000);
    expect(label.posY).toBe(1750);
    expect(label.rotation).toBe(0);
    expect(label.comment).toBe('');

    const font = label.font;
    expect(font.align).toBe('near');
    expect(font.face).toBe('Arial');
    expect(font.height).toBe(120);
    expect(font.style).toBe(0);
    expect(font.color).toBe(0);

    expect(label.text).toBe('RGB Matrix');
});

test('getLabels loads correct label data', () => {
    const labels = pdoc.labels;
    const label = labels[0];

    expect(labels.length).toBe(5);
    expect(label.id).toBe(183);
    expect(label.posX).toBe(3000);
    expect(label.posY).toBe(1750);
    expect(label.rotation).toBe(0);
    expect(label.comment).toBe('');

    const font = label.font;
    expect(font.align).toBe('near');
    expect(font.face).toBe('Arial');
    expect(font.height).toBe(120);
    expect(font.style).toBe(0);
    expect(font.color).toBe(0);

    expect(label.text).toBe('RGB Matrix');
});

test('Butler XT2 Parsing', () => {
    const devices = pdoc.devices;
    const device = devices.find(device => device.type === 'dmx_butler_xt2');

    expect(device.typeDisplayName).toBe('Butler XT2');
    expect(device.name).toBe('Butler XT2');
    expect(device.dmxPorts.length).toBe(2);
    expect(device.dmxPorts[0].universe).toBe(1);
    expect(device.ipAddress).toBe('192.168.123.1');
    expect(device.macAddress).toBe('00-16-1c-f1-46-eb');
});

test('Butler S2 Parsing', () => {
    const devices = pdoc.devices;
    const device = devices.find(device => device.type === 'dmx_butler_s2');

    expect(device.typeDisplayName).toBe('Butler S2');
    expect(device.name).toBe('Butler S2');
    expect(device.dmxPorts.length).toBe(2);
    expect(device.dmxPorts[1].universe).toBe(4);
    expect(device.ipAddress).toBe('192.168.123.2');
    expect(device.macAddress).toBe('00-16-1c-f1-1f-6a');
});

test('Butler PRO', () => {
    const devices = pdoc.devices;
    const device = devices.find(device => device.type === 'dmx_butler_pro');

    expect(device.typeDisplayName).toBe('Butler PRO');
    expect(device.name).toBe('Butler PRO #1');
    expect(device.dmxPorts.length).toBe(16);
    expect(device.dmxPorts[12].universe).toBe(19);
    expect(device.ipAddress).toBe(null);
    expect(device.macAddress).toBe(null);
});

test('Butler PRO e:pix', () => {
    const devices = pdoc.devices;
    const device = devices.find(device => device.type === 'dmx_butler_pro_epix');

    expect(device.typeDisplayName).toBe('Butler PRO e:pix');
    expect(device.name).toBe('Butler PRO e:pix #1');
    expect(device.dmxPorts.length).toBe(16);
    expect(device.dmxPorts[12].universe).toBe(35);
    expect(device.ipAddress).toBe(null);
    expect(device.macAddress).toBe(null);
});

test('VMC', () => {
    const devices = pdoc.devices;
    const device = devices.find(device => device.type === 'dmx_dvi_rocket');
    expect(device.typeDisplayName).toBe('VMC');

    expect(device.name).toBe('Video Micro Converter #1');
    expect(device.dmxPorts.length).toBe(8);
    expect(device.dmxPorts[2].universe).toBe(41);
    expect(device.ipAddress).toBe(null);
    expect(device.macAddress).toBe(null);
});


test('Butler Classic', () => {
    const devices = pdoc.devices;
    const device = devices.find(device => device.type === 'dmx_butler');
    expect(device.typeDisplayName).toBe('Butler Classic');
    expect(device.name).toBe('Butler #1');
    expect(device.dmxPorts.length).toBe(2);
    expect(device.dmxPorts[0].universe).toBe(5);
    expect(device.ipAddress).toBe('192.168.123.3');
    expect(device.macAddress).toBe('00-16-1c-00-0c-b6');
});


test('Butler Classic', () => {
    const devices = pdoc.devices;
    const device = devices.find(device => device.type === 'dmx_butler_xt');
    expect(device.typeDisplayName).toBe('Butler XT');
    expect(device.name).toBe('Butler XT #1');
    expect(device.dmxPorts.length).toBe(2);
    expect(device.dmxPorts[0].universe).toBe(47);
    expect(device.ipAddress).toBe(null);
    expect(device.macAddress).toBe(null);
});