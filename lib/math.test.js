// require the actual module so that we can mock exports on the module
const lodash = require('lodash');
const mathjs = require('mathjs');

const { sum, mul, sub, div } = require('./math');


beforeAll(() => {
  //do something
  // console.log("before all tests are run")
});

beforeEach(() => {
  //do something
  // console.log("before each test is run")
});

afterEach(() => {
  //do something
});

afterAll(() => {
  //do something
});


describe('first set', () => {
  beforeEach(() => {
    //do something
  })
  afterAll(() => {
    //do something
  })


  test('Expects 1 to be 1', () => {
    expect(1).toBe(1);
  });

  test('Expects 2 to be 2', () => {
    expect(2).toBe(2);
  });

});

describe('Math tests set', () => {
  test('Adding 1 + 1 equals 2', () => {
    expect(sum(1, 1)).toBe(2)
  })
  test('Multiplying 1 * 1 equals 1', () => {
    expect(mul(1, 1)).toBe(1)
  })
  test('Subtracting 1 - 1 equals 0', () => {
    expect(sub(1, 1)).toBe(0)
  })
  test('Dividing 1 / 1 equals 1', () => {
    expect(div(1, 1)).toBe(1)
  })
});

describe('Mocking mathjs functions', () => {

  beforeAll(() => {

  });

  test(`The mathjs log function`, () => {
    
    mathjs.log = jest.fn(() => 'test'); //note: This doesn't work without adding mathjs.js in __mocks__ folder for some reason but lodash worked without mock function.

    expect(mathjs.log(10000, 10)).toBe('test')
    expect(mathjs.log).toHaveBeenCalled()
    expect(mathjs.log).toHaveBeenCalledWith(10000, 10)
  })

});

function testMathjsMock() {
  return mathjs.log(10000, 10);
}


describe('Mocking lodash functions', () => {

  test('random should be 1', () => {
    // mock lodash random to return the value 1 in first test
    lodash.random = jest.fn(() => 1);
    expect(lodash.random(1,10)).toBe(1);
  });
  
  test('random should be 2', () => {
    // mock lodash random to return the value 2 in second test
    lodash.random = jest.fn(() => 2);
    expect(lodash.random(1,10)).toBe(2);
  });

});