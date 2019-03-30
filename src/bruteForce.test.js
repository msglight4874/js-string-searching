const { bruteForce } = require('./bruteForce.js');

describe('#bruteForce', () => {
  let str = 'Lorem ipsum dolor sit amet, quis montes nullam auctor arcu, at fusce iaculis dolor mi. Neque ac eu purus ullamcorper, velit tellus, lorem nunc mauris vel sit sed ut, dolor turpis. Dolor parturient magna.'

  it('returns start index of string when pattern matched', () => {
    expect(bruteForce(str, 'Lorem ipsum')).toBe(0);
    expect(bruteForce(str, 'dolor sit amet')).toBe(12);
  })

  it('returns -1 of string when pattern not matched', () => {
    expect(bruteForce(str, 'not existed pattern')).toBe(-1);
  })
});
