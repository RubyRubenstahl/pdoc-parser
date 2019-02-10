const { loadPdoc } = require('../src/pdoc');

const pdoc = loadPdoc('../test-data/test.pdoc');


test('Returns the correct total number of fixtures', () => {
    expect(pdoc.getTotalFixtureCount()).toBe(23);
});

test('Returns the correct total number of fixtures in section', () => {
    expect(pdoc.getSectionFixtureCount(0)).toBe(13);
});


test('Returns the correct total number of fixtures in section when referenced by name', () => {
    expect(pdoc.getSectionFixtureCount("Section#2")).toBe(10);
});