import { Money } from "@src/shared/valueObject";
import { OrderLine } from "../../domain";
import { Customer } from "../../domain/customer";

export interface RuleDiscounter {
    applyRules(customer: Customer, orderLines: OrderLine[]): Money;
}