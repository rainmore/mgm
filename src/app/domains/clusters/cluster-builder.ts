import { SubTypeBuilder } from "angular4-hal";
import { Cluster }        from "./cluster";

export class ClusterBuilder implements SubTypeBuilder {

    subtypes: Map<string, any> = new Map<string, any>();

    constructor() {
        this.subtypes.set('entity', Cluster);
    }
}
