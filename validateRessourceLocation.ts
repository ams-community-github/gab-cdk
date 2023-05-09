import { IAspect, Annotations } from "cdktf";
import { IConstruct } from "constructs";

type LocalisableConstruct = IConstruct & {
  locationInput: string;
};
  
function isLocalisableConstruct(x: IConstruct): x is LocalisableConstruct {
  return "location" in x;
}

export class ValidateRessourceLocation implements IAspect {
    constructor(private location: string) {}

    visit(node: IConstruct) {
      if (isLocalisableConstruct(node)) {
        if (node.locationInput !== this.location) {
          Annotations.of(node).addError(
            `Each Ressource location [${node.locationInput}] needs to match -> ${this.location}`
          );
        }
      }
    }
  }