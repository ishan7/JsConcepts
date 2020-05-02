# objects are used to store keyed collections of various data and more complex entities.

let user = new Object(); // "object constructor" syntax
let user = {};  // "object literal" syntax


Literals and properties

let user = {     // an object
  name: "John",  // by key "name" store value "John"
  age: 30        // by key "age" store value 30
};
A property has a key (also known as “name” or “identifier”) before the colon ":" and a value to the right of it.


## adding property in object
user.isAdmin = true;

## deleting a property
delete user.age;


## square brackets notation
for keys that are space separated (mutliwords), we can't access via dot notation (syntax error)
let key = "likes birds";

// same as user["likes birds"] = true;
user[key] = true;


### sqaure also helps to access a property that is calculated at run time, provides great flexibility
let user = {
  name: "John",
  age: 30
};

let key = prompt("What do you want to know about the user?", "name");

// access by variable
alert( user[key] ); // John (if enter "name")

### dot notations cannot be used same way
let user = {
  name: "John",
  age: 30
};

let key = "name";
alert( user.key ) // undefined



### computed properties

We can use square brackets in an object literal. That’s called computed properties.

let fruit = prompt("Which fruit to buy?", "apple");

let bag = {
  [fruit]: 5, // the name of the property is taken from the variable fruit
};

alert( bag.apple ); // 5 if fruit="apple"
The meaning of a computed property is simple: [fruit] means that the property name should be taken from fruit.

So, if a visitor enters "apple", bag will become {apple: 5}.

Essentially, that works the same as:
let fruit = prompt("Which fruit to buy?", "apple");
let bag = {};

// take property name from the fruit variable
bag[fruit] = 5;

## Property value shorthand
let user = {
  name,  // same as name:name
  age: 30
};

## Property name limitations

Property names (keys) must be either strings or symbols (a special type for identifiers, to be covered later).

Other types are automatically converted to strings.

For instance, a number 0 becomes a string "0" when used as a property key:

let obj = {
  0: "test" // same as "0": "test"
};

// both alerts access the same property (the number 0 is converted to string "0")
alert( obj["0"] ); // test
alert( obj[0] ); // test (same property)
Reserved words are allowed as property names.

As we already know, a variable cannot have a name equal to one of language-reserved words like “for”, “let”, “return” etc.

But for an object property, there’s no such restriction. Any name is fine:

let obj = {
  for: 1,
  let: 2,
  return: 3
};

alert( obj.for + obj.let + obj.return );  // 6

### _proto_ later


## check if exists in objects
A notable objects feature is that it’s possible to access any property. There will be no error if the property doesn’t exist! Accessing a non-existing property just returns undefined. It provides a very common way to test whether the property exists – to get it and compare vs undefined:

let user = {};

alert( user.noSuchProperty === undefined ); // true means "no such property"
There also exists a special operator "in" to check for the existence of a property.

The syntax is:

"key" in object
For instance:

let user = { name: "John", age: 30 };

alert( "age" in user ); // true, user.age exists
alert( "blabla" in user ); // false, user.blabla doesn't exist
Please note that on the left side of in there must be a property name. That’s usually a quoted string.

If we omit quotes, that would mean a variable containing the actual name will be tested. For instance
let user = { age: 30 };

let key = "age";
alert( key in user ); // true, takes the name from key and checks for such property
Using “in” for properties that store undefined
Usually, the strict comparison "=== undefined" check the property existence just fine. But there’s a special case when it fails, but "in" works correctly.


#### tricky
It’s when an object property exists, but stores undefined:

let obj = {
  test: undefined
};

alert( obj.test ); // it's undefined, so - no such property?

alert( "test" in obj ); // true, the property does exist!
In the code above, the property obj.test technically exists. So the in operator works right.


## the for-in loop

for (key in object) {
  // executes the body for each key among object properties
}

## ordering of keys in an object

Are objects ordered? In other words, if we loop over an object, do we get all properties in the same order they were added? Can we rely on this?

The short answer is: “ordered in a special fashion”: integer properties are sorted, others appear in creation order. The details follow.

As an example, let’s consider an object with the phone codes:












let codes = {
  "49": "Germany",
  "41": "Switzerland",
  "44": "Great Britain",
  // ..,
  "1": "USA"
};

for (let code in codes) {
  alert(code); // 1, 41, 44, 49
}
The object may be used to suggest a list of options to the user. If we’re making a site mainly for German audience then we probably want 49 to be the first.

But if we run the code, we see a totally different picture:

USA (1) goes first
then Switzerland (41) and so on.
The phone codes go in the ascending sorted order, because they are integers. So we see 1, 41, 44, 49.

Integer properties? What’s that?
The “integer property” term here means a string that can be converted to-and-from an integer without a change.

So, “49” is an integer property name, because when it’s transformed to an integer number and back, it’s still the same. But “+49” and “1.2” are not:

// Math.trunc is a built-in function that removes the decimal part
alert( String(Math.trunc(Number("49"))) ); // "49", same, integer property
alert( String(Math.trunc(Number("+49"))) ); // "49", not same "+49" ⇒ not integer property
alert( String(Math.trunc(Number("1.2"))) ); // "1", not same "1.2" ⇒ not integer property
…On the other hand, if the keys are non-integer, then they are listed in the creation order, for instance:








let user = {
  name: "John",
  surname: "Smith"
};
user.age = 25; // add one more

// non-integer properties are listed in the creation order
for (let prop in user) {
  alert( prop ); // name, surname, age
}
So, to fix the issue with the phone codes, we can “cheat” by making the codes non-integer. Adding a plus "+" sign before each code is enough.

Like this:

let codes = {
  "+49": "Germany",
  "+41": "Switzerland",
  "+44": "Great Britain",
  // ..,
  "+1": "USA"
};

for (let code in codes) {
  alert( +code ); // 49, 41, 44, 1
}
Now it works as intended.


## objects are copied by reference

One of the fundamental differences of objects vs primitives is that they are stored and copied “by reference”.

Primitive values: strings, numbers, booleans – are assigned/copied “as a whole value”.

For instance:

let message = "Hello!";
let phrase = message;
As a result we have two independent variables, each one is storing the string "Hello!".


Objects are not like that.
A variable stores not the object itself, but its “address in memory”, in other words “a reference” to it.

Here’s the picture for the object:

let user = {
  name: "John"
};

Here, the object is stored somewhere in memory. And the variable user has a “reference” to it.

When an object variable is copied – the reference is copied, the object is not duplicated.

If we imagine an object as a cabinet, then a variable is a key to it. Copying a variable duplicates the key, but not the cabinet itself.

For instance:

let user = { name: "John" };

let admin = user; // copy the reference
Now we have two variables, each one with the reference to the same object:


We can use any variable to access the cabinet and modify its contents:

let user = { name: 'John' };

let admin = user;

admin.name = 'Pete'; // changed by the "admin" reference

alert(user.name); // 'Pete', changes are seen from the "user" reference

## Object comparison

Two objects are equal only if they are the same object.

For instance, if two variables reference the same object, they are equal:

let a = {};
let b = a; // copy the reference

alert( a == b ); // true, both variables reference the same object
alert( a === b ); // true
And here two independent objects are not equal, even though both are empty:

let a = {};
let b = {}; // two independent objects

alert( a == b ); // false


## Const object
An object declared as const can be changed.

For instance:
const user = {
  name: "John"
};

user.age = 25; // (*)

alert(user.age); // 25
It might seem that the line (*) would cause an error, but no, there’s totally no problem. That’s because const fixes only value of user itself. And here user stores the reference to the same object all the time. The line (*) goes inside the object, it doesn’t reassign user.

The const would give an error if we try to set user to something else, for instance:

const user = {
  name: "John"
};

// Error (can't reassign user)
user = {
  name: "Pete"
};
…But what if we want to make constant object properties? So that user.age = 25 would give an error. That’s possible too. (Property flags and descriptors)




## Cloning and merging, Object.assign
So, copying an object variable creates one more reference to the same object.

But what if we need to duplicate an object? Create an independent copy, a clone?

That’s also doable, but a little bit more difficult, because there’s no built-in method for that in JavaScript. Actually, that’s rarely needed. Copying by reference is good most of the time.

But if we really want that, then we need to create a new object and replicate the structure of the existing one by iterating over its properties and copying them on the primitive level.

Like this:

let user = {
  name: "John",
  age: 30
};

let clone = {}; // the new empty object

// let's copy all user properties into it
for (let key in user) {
  clone[key] = user[key];
}

// now clone is a fully independent clone
clone.name = "Pete"; // changed the data in it

alert( user.name ); // still John in the original object



## Object.assign

Object.assign(dest, [src1, src2, src3...])
Arguments dest, and src1, ..., srcN (can be as many as needed) are objects.
It copies the properties of all objects src1, ..., srcN into dest. In other words, properties of all arguments starting from the 2nd are copied into the 1st. Then it returns dest.
For instance, we can use it to merge several objects into one:

let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

// copies all properties from permissions1 and permissions2 into user
Object.assign(user, permissions1, permissions2);

// now user = { name: "John", canView: true, canEdit: true }
If the receiving object (user) already has the same named property, it will be overwritten:

let user = { name: "John" };

// overwrite name, add isAdmin
Object.assign(user, { name: "Pete", isAdmin: true });

// now user = { name: "Pete", isAdmin: true }
We also can use Object.assign to replace the loop for simple cloning:

let user = {
  name: "John",
  age: 30
};

let clone = Object.assign({}, user);
It copies all properties of user into the empty object and returns it. Actually, the same as the loop, but shorter.


## Deep cloning objects

Until now we assumed that all properties of user are primitive. But properties can be references to other objects. What to do with them?

Like this:

let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

alert( user.sizes.height ); // 182
Now it’s not enough to copy clone.sizes = user.sizes, because the user.sizes is an object, it will be copied by reference. So clone and user will share the same sizes:

Like this:

let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

let clone = Object.assign({}, user);

alert( user.sizes === clone.sizes ); // true, same object

// user and clone share sizes
user.sizes.width++;       // change a property from one place
alert(clone.sizes.width); // 51, see the result from the other one
To fix that, we should use the cloning loop that examines each value of user[key] and, if it’s an object, then replicate its structure as well. That is called a “deep cloning”.

There’s a standard algorithm for deep cloning that handles the case above and more complex cases, called the Structured cloning algorithm. In order not to reinvent the wheel, we can use a working implementation of it from the JavaScript library lodash, the method is called _.cloneDeep(obj).