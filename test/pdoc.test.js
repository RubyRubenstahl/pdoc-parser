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