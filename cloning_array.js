// shallow copy

// 1. array.conact

let originalArray1 =  ['10','20', '30' , {'a': 'nothing'}];
let originalArray2 = ['ishan'];

let copiedArray = originalArray1.concat(originalArray2);
copiedArray[0] = 'hey!';
copiedArray[3]['a'] = 'wohooo!!';
console.log(originalArray1,copiedArray);

// 2. Array.from(anotherArray)
let originalArray1 =  ['10','20', '30' , {'a': 'nothing'}];
let copiedArray = Array.from(originalArray1);
copiedArray[0] = 'hey!';
copiedArray[3]['a'] = 'wohooo!!';
console.log(originalArray1,copiedArray);

//3 . Array.slice(0);
let originalArray1 =  ['10','20', '30' , {'a': 'nothing'}];
let copiedArray = originalArray1.slice(0);
copiedArray[0] = 'hey!';
copiedArray[3]['a'] = 'wohooo!!';
console.log(originalArray1,copiedArray);

//4 spread operator

let originalArray1 =  ['10','20', '30' , {'a': 'nothing'}];
let copiedArray = {...originalArray1};
copiedArray[0] = 'hey!';
copiedArray[3]['a'] = 'wohooo!!';
console.log(originalArray1,copiedArray);



//deep copying

let originalArray1 =  ['10','20', '30' , {'a': 'nothing'}];
let copiedArray = JSON.parse(JSON.stringify(originalArray1));
copiedArray[0] = 'hey!';
copiedArray[3]['a'] = 'wohooo!!';
console.log(originalArray1,copiedArray);