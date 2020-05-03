# Garbage Collection
Memory management in JavaScript is performed automatically and invisibly to us. We create primitives, objects, functions… All that takes memory.

## Reachability
The main concept of memory management in JavaScript is reachability.

Simply put, “reachable” values are those that are accessible or usable somehow. They are guaranteed to be stored in memory.

There’s a base set of inherently reachable values, that cannot be deleted for obvious reasons.

For instance:

Local variables and parameters of the current function.
Variables and parameters for other functions on the current chain of nested calls.
Global variables.
(there are some other, internal ones as well)
These values are called roots.

Any other value is considered reachable if it’s reachable from a root by a reference or by a chain of references.

For instance, if there’s an object in a local variable, and that object has a property referencing another object, that object is considered reachable. And those that it references are also reachable.

### Example
/ user has a reference to the object
let user = {
  name: "John"
};

Here the arrow depicts an object reference. The global variable "user" references the object {name: "John"} (we’ll call it John for brevity). The "name" property of John stores a primitive, so it’s painted inside the object.

If the value of user is overwritten, the reference is lost:

user = null;

Now John becomes unreachable. There’s no way to access it, no references to it. Garbage collector will junk the data and free the memory.

#### for two references of same object, we would have to point both of them to null to make it unreachable else it would be if you make anyone of them as reachable

### Interlinked Objects (complex family example)
function marry(man, woman) {
  woman.husband = man;
  man.wife = woman;

  return {
    father: man,
    mother: woman
  }
}

let family = marry({
  name: "John"
}, {
  name: "Ann"
});
Function marry “marries” two objects by giving them references to each other and returns a new object that contains them both.

The resulting memory structure:


As of now, all objects are reachable.

Now let’s remove two references:

delete family.father;
delete family.mother.husband;

It’s not enough to delete only one of these two references, because all objects would still be reachable.

But if we delete both, then we can see that John has no incoming reference any more:

Outgoing references do not matter. Only incoming ones can make an object reachable. So, John is now unreachable and will be removed from the memory with all its data that also became unaccessible.

### Unreachable island
It is possible that the whole island of interlinked objects becomes unreachable and is removed from the memory.

The source object is the same as above. Then:

family = null;
The in-memory picture becomes:


This example demonstrates how important the concept of reachability is.

It’s obvious that John and Ann are still linked, both have incoming references. But that’s not enough.

The former "family" object has been unlinked from the root, there’s no reference to it any more, so the whole island becomes unreachable and will be removed.

## Mark and Sweep algorithm
The basic garbage collection algorithm is called “mark-and-sweep”.

The following “garbage collection” steps are regularly performed:

The garbage collector takes roots and “marks” (remembers) them.
Then it visits and “marks” all references from them.
Then it visits marked objects and marks their references. All visited objects are remembered, so as not to visit the same object twice in the future.
…And so on until every reachable (from the roots) references are visited.
All objects except marked ones are removed.

## Optimizations by Js engines
#### Generational collection – 
objects are split into two sets: “new ones” and “old ones”. Many objects appear, do their job and die fast, they can be cleaned up aggressively. Those that survive for long enough, become “old” and are examined less often.
#### Incremental collection – 
if there are many objects, and we try to walk and mark the whole object set at once, it may take some time and introduce visible delays in the execution. So the engine tries to split the garbage collection into pieces. Then the pieces are executed one by one, separately. That requires some extra bookkeeping between them to track changes, but we have many tiny delays instead of a big one.
#### Idle-time collection – 
the garbage collector tries to run only while the CPU is idle, to reduce the possible effect on the execution.

