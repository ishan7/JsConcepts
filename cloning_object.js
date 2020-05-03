// shallow copy an object


// using object.assign
let sourceObj = {
    age: 5,
    gender: 'male',
    hobbies: ['cricket','youtube']
}
let copyObj = Object.assign({},sourceObj);
copyObj.age = 10;
copyObj.hobbies[0] = 'football';
console.log(sourceObj, copyObj);

// using spread operator

let sourceObj = {
    age: 5,
    gender: 'male',
    hobbies: ['dancing','youtube']
}
let copyObj = {... sourceObj}
copyObj.age = 45;
copyObj.hobbies[0] = 'singing';
console.log(sourceObj, copyObj);


// deep copying
let sourceObj = {
    age: 5,
    gender: 'male',
    hobbies: ['dancing','youtube']
}

let copyObj = JSON.parse(JSON.stringify(sourceObj));
pyObj.age = 45;
copyObj.hobbies[0] = 'singing';
console.log(sourceObj, copyObj);


