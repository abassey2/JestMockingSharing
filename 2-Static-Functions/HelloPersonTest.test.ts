import { PersonFactory } from "./PersonFactory";
import { HelloPerson } from "./HelloPerson";

describe('HelloPerson test',()=>{
    it('sayHelloAnnika method should return hello Annika ', () => {

        // Spyon our Factory class and mock the return value of the getInstance method
        const mockAnnika = {
            nickname: 'Annika',
            age: 22
        };
        jest.spyOn(PersonFactory, 'getInstance').mockReturnValue(mockAnnika);

        // Call HelloPerson class, which should use our mocked getInstance method, and return hello Annika
        const helloAnnika = HelloPerson.sayHelloAnnika();
        expect(helloAnnika).toEqual("Hello, " + `${mockAnnika.nickname}!`);
    });
})
