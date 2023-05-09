import { Construct, IConstruct } from "constructs";
import { App, Aspects, AzurermBackend, IAspect, TerraformStack } from "cdktf";
import { AzurermProvider } from "@cdktf/provider-azurerm/lib/provider";

export class MyAspect implements IAspect {
    constructor() {}
  
    visit(node: IConstruct) {
      console.log(node)
    }
  }

class GabStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new AzurermProvider(this, "azurerm", {
        features: {}
      });
  
    new AzurermBackend(this, {
        resourceGroupName: 'tf-state',
        storageAccountName: 'gabtfstatestorage',
        containerName: 'gabtfstate',
        key: 'tfstate'
    });

    Aspects.of(this).add(new MyAspect());
  }
}

const app = new App();
new GabStack(app, "gab-cdk");
app.synth();

