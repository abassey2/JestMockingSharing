import { Introducer } from "./introducer";
import { Person } from "./person";

// Create fake database
const people: { [id: string]: Person } = {
  "jake83": new Person("Jake", 30),
  "annika05": new Person("Annika", 18),
  "jeremy98": new Person("Jeremy", 25)
}

// create the mock implementations of the client's methods
// by creating these functions outside of the mockPersonClient definition below rather
// than inline, we can reference them for more assertions
const mockGetName = jest.fn().mockImplementation((id): string => {
  return people[id].name;
});
const mockGetAge = jest.fn().mockImplementation((id): number => {
  return people[id].age;
});

// the mockClient uses the above in memory map to return the data
const mockPersonClient = {
    getName: mockGetName,
    getAge: mockGetAge
};

describe('Introducer Tests',()=>{
  let introducer: Introducer;

  // best practice to clear all mocks so that any potential new implementations and call contexts are cleared
  afterEach(()=> {
    jest.clearAllMocks();
  })

  it('Introducer says hello to a person', () => {
    const id = "jake83";
    const introducer = new Introducer(mockPersonClient);
    // does the introducer return the right 'hello' string?
    expect(introducer.helloPerson(id)).toBe(`Hello ${people[id].name}!`);
    // did our mockGetName function get called once as expected?
    expect(mockGetName).toBeCalledTimes(1);
  });

  it('Introducer asks a question to a younger person', () => {
    const id = "annika05";
    const introducer = new Introducer(mockPersonClient);
    // does the introducer return the correct 'question string'
    expect(introducer.askAQuestion(id)).toBe(`What's your favorite hobby ${people[id].name}?`);
    // did our mockGetName/mockGetAge functions get called once each as expected?
    expect(mockGetName).toBeCalledTimes(1);
    expect(mockGetAge).toBeCalledTimes(1);
  });

  it('Introducer asks a question to an older person', () => {
    const id = "jeremy98";
    const introducer = new Introducer(mockPersonClient);
    // does the introducer return the correct 'question string'
    expect(introducer.askAQuestion(id)).toBe(`What do you do for a living ${people[id].name}?`);
    // did our mockGetName/mockGetAge functions get called once each as expected?
    expect(mockGetName).toBeCalledTimes(1);
    expect(mockGetAge).toBeCalledTimes(1);
  });
})