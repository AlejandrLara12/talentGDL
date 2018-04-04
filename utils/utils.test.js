const utils = require('./utils.js');
const expect = require('expect');

it('should add two numbers', () => {
  let res = utils.add(10,2);

  expect(res).toBe(12).toBeA('number'); // default msg > Error: Expected 12 to be 11
  // if( res !== 12 ){
  //   throw new Error(`expected 12, but got ${res}`);
  // }
});

it('should square one number', () => {
  let res = utils.square(5);

  expect(res).toBe(25).toBeA('number');
});


// should verify first and last names are set
// assert it includes firstName and lastName with proper values
it('shoud set firstName and lastName', () => {
  let user = { location: 'Philadelphia', age: 21 };
  let res = utils.setName(user, 'Ricardo Lara');
  
  // expect(res).toIncludeKeys(['firstName','lastName']);
  expect(res).toInclude({
    firstName: 'Ricardo',
    lastName: 'Lara'
  });
});


it('shoud asyinc add two numbers ', (done) => {
  // done aregument especified, is to let Mocha know that the function will take time
  utils.asyncAdd(10,2, (sum) => {
    expect(sum).toBe(12).toBeA('number');
    done();
  });
});

it('shoud asyinc square one number ', (done) => {
  utils.squeareAdd(3, (sum) => {
    expect(sum).toBe(9).toBeA('number');
    done();
  });
});

