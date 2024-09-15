export class Orderer {
    private name: string;
    private email: string;

    constructor({ name, email }: { name: string; email: string }) {
        this.name = name;
        this.email = email;
    }
}