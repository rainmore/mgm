import { SubTypeBuilder } from "angular4-hal";
import { Region }         from "./region";

export class RegionBuilder implements SubTypeBuilder {

    subtypes: Map<string, any> = new Map<string, any>();

    constructor() {
        this.subtypes.set('entity', Region);
    }
}
