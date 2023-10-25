export interface IPersonClient {
    getName(id: string): string;
    getAge(id: string): number;
}

// Says hello and asks a question to a person!
export class Introducer {

    constructor(private personClient: IPersonClient) {
    }

    helloPerson(id: string): string {
        return `Hello ${this.personClient.getName(id)}!`;
    }

    askAQuestion(id: string): string {
        const age = this.personClient.getAge(id);
        const name = this.personClient.getName(id);
        return age > 22 ? `What do you do for a living ${name}?` : `What's your favorite hobby ${name}?`;
    }
}
