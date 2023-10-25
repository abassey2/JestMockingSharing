# 1-Mocking-Instances-Of-Classes

## Introduction

Very often, the class under test depends on instances of other classes.
Typically, in following the [dependency inversion principle](https://stackify.com/dependency-inversion-principle/), individual classes should depend on interfaces - the implementation of which are often passed in through the class's constructor.
This gives us much flexibility in testing and allows us to simply define the mocks that implement the required interfaces and pass them through the constructor of a class when writing its unit tests.

## Code Walkthrough

Since the `Introducer` class depends on an `IPersonClient` instance and because we don't want to use the real `Person API` in our unit tests, we create a `mockPersonClient`.

```ts
const mockPersonClient = {
    getName: mockGetName,
    getAge: mockGetAge
};
```

The underlying `IPersonClient` methods are mocked outside of the `mockPersonClient` object so that additional assertions can be made around the context of these functions (how many times they were called and with what arguments).
This is done via the [`mockImplementation` method](https://jestjs.io/docs/mock-function-api#mockfnmockimplementationfn) available on the jest mock created with the [`jest.fn()` function](https://jestjs.io/docs/jest-object#jestfnimplementation):

```ts
const mockGetName = jest.fn().mockImplementation((id): string => {
  return people[id].name;
});
const mockGetAge = jest.fn().mockImplementation((id): number => {
  return people[id].age;
});
```

```ts
expect(mockGetName).toBeCalledTimes(1);
expect(mockGetAge).toBeCalledTimes(1);
```

Now, at the beginning of each test, we can create an `Introducer` instance with our mock `IPersonClient`:

```ts
const introducer = new Introducer(mockPersonClient());
```

It's best practice to clear all the mocks after (or before) each test is run to make sure there is no carry over of information between tests:

```ts
afterEach(()=> {
    jest.clearAllMocks();
})
```

With these mocks in place, we can write tests for the `Introducer` public methods.

## Running the tests

To run the tests, run `npm i` from the project root and then run `npm run test:1`
