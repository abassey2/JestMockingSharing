# Static Functions

## Introduction

In unit testing, we mock static functions so that we can focus on testing the unit's logic in isolation.
This ensures that the testing process is reliable and efficient.
Mocking static functions also allows us to control the behavior and responses of the static function during testing, so we can create deterministic tests that have predictable outcomes.

One Common scenario where we may need to mock a static function is when we use the Factory Method to create a new object.
In this case, we want to mock our static get instance function within our Factory class.
We use the [jest.spyon()](https://jestjs.io/docs/jest-object#jestspyonobject-methodname) function and the `.mockImplementation()` method to
overwrite our original Factory method and return a mocked object.

## Code Walkthrough

Since our getInstance method within the [PersonFactory](./PersonFactory.ts) returns a Person object, we must first mock our returned person and the `getInstance` function to return that object.
Then we can use the `jest.spyon()` function on the PersonFactory so that the class's getInstance method will be overwritten with our mock function.

```ts
const mockAnnika = {
    nickname: 'Annika',
    age: 22
};
const mockGetInstance = () =>  mockAnnika;
jest.spyOn(PersonFactory, 'getInstance').mockImplementation(mockGetInstance);
```

Finally, we can call static function, `sayHelloAnnika()`, within our [HelloPerson](./HelloPerson.ts) class and expect the returned message to be a simple hello to our mocked Person.

```ts
const returnedHelloAnnika = HelloPerson.sayHelloAnnika();
expect(returnedHelloAnnika).toEqual('Hello, Annika!');
```

## Running the tests

To run the tests, run `npm i` from the project root and then run `npm run test:2`
