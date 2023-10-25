export interface IPerson {
  nickname: string;
  age: number;
}

class Person implements IPerson {
  constructor(private name: string, private inputAge: number) {}
  nickname: string = this.name;
  age: number = this.inputAge;
}

export class PersonFactory {
  private static _instance: IPerson;

  static getInstance(name: string, age: number): IPerson {
    if (!PersonFactory._instance) {
      const persona = new Person(name, age);
      PersonFactory._instance = persona;
    }

    return PersonFactory._instance;
  }
}