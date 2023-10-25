# Mocking Node Libraries

## Introduction

Sometimes there are instances where you cannot constructor inject a dependency and you rely on "newing up" a dependency in your code itself.
While this makes testing more difficult, jest has a workaround.
This section shows how to mock classes from npm packages that are "newed up" in code.
By using the `jest.mock()` method, we can specify the library to mock and add the list of dependencies desired, including the classes that need to be "newed up."

## Code Walkthrough

Because TypeScript Azure Functions don't come with a Dependency Injection framework out of the box, in the `tableStorageDeleteFunction`, our basic Azure Function must "new up" a `TableClient` inline.
In order to mock this class from the `@azure/functions` library, we set up the mock of `TableClient`
and `AzureNamedKeyCredential` at the top of the test file:

```ts
const mockedDeleteEntity = jest.fn();

jest.mock('@azure/data-tables', () => ({
  // use "function" syntax since they need to be instantiated
  AzureNamedKeyCredential: function () {
    return 'test credential';
  },
  TableClient: function () {
    return {
      deleteEntity: mockedDeleteEntity,
    };
  },
}));
```

In this manner, we can mock the way `AzureNamedKeyCredential` and `TableClient` are constructed.
We can make sure we can also make assertions on how many times the `deleteEntity` function is called on the "newed up" `TableClient` by making its implementation a jest function (`jest.fn()`):

```ts
expect(mockedDeleteEntity).toBeCalled();
```

Now, using some helper methods provided by the Azure Functions library, we can run our `httpTrigger` function (the Azure Function) in tests and the specified mocks will be used when `@azure/data-tables` dependencies are called upon.
