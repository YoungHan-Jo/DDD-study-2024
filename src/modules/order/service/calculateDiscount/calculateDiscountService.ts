import { Injectable } from "@nestjs/common";
import { OrderLine } from "../../domain";
import { CustomerRepository } from "../../infrastructure/customer.repository";
import { RuleDiscounter } from "./ruleDiscounter.interface";
import { NoCustomerError } from "@src/shared/error";

@Injectable()
export class CalculateDiscountService {
    private customerRepository: CustomerRepository;
    private ruleDiscounter: RuleDiscounter;

    constructor(customerRepository: CustomerRepository, ruleDiscounter: RuleDiscounter) {
        this.customerRepository = customerRepository;
        this.ruleDiscounter = ruleDiscounter;
    }

    calculateDiscount = (orderLines: OrderLine[], customerId: string) => {
        const customer = this.findCustomer(customerId);
        return this.ruleDiscounter.applyRules(customer, orderLines);
    }

    private findCustomer = (customerId: string) => {
        const foundCustomer = this.customerRepository.findById(customerId)
        if (!foundCustomer) {
            throw new NoCustomerError({ message: `No customer found for id: ${customerId}` });
        }
        return foundCustomer;
    }
}