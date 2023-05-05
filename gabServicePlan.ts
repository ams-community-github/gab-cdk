import { ServicePlan, ServicePlanConfig } from "@cdktf/provider-azurerm/lib/service-plan";
import { Construct } from "constructs";
import { Annotations} from "cdktf";

interface GabServicePlanConfig extends ServicePlanConfig {
    skuName: "F1" | "B1"
}

export class GabServicePlan extends ServicePlan {
    constructor(scope: Construct, name: string, config: GabServicePlanConfig) {
        super(scope, name, config);

        const os = config.osType;

        if(os !== 'Linux') {
            Annotations.of(this).addWarning(
                `The ressource ${name} [ServicePlan] must choose Linux as osType`
              );
        }
      }
}