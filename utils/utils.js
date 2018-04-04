
// let add = (a,b) => {
  // return a + b;
// };
let add = (a,b) => a + b;

let square = (a) => a*a;

let setName = (user, fullName) => {
  let names = fullName.split(' ');
  user.firstName = names[0];
  user.lastName = names[1];
  return user;
};

let asyncAdd = (a, b, callback) => {
  setTimeout(() => {
    callback(a + b);
  }, 1000);
}
;
let squeareAdd = (a, callback) => {
  setTimeout(() => {
    callback(a*a);
  }, 1000);
};



module.exports = {
  add,
  square,
  setName,
  asyncAdd,
  squeareAdd
};