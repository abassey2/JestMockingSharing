import { PersonFactory } from "./PersonFactory";

export class HelloPerson {
    static sayHelloAnnika() {
        const Annika = PersonFactory.getInstance('Annika', 22);
        return "Hello, " + `${Annika.nickname}!`;
    }
}