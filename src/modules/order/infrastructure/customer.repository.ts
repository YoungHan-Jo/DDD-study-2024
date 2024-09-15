import { Customer } from "../domain/customer";

export class CustomerRepository {

    findById(id: string) {
        return new Customer("customerName -" + id);
    }
}