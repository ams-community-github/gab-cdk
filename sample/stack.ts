import { Construct } from "constructs";
import { App, AzurermBackend, TerraformStack } from "cdktf";
import { AzurermProvider } from "@cdktf/provider-azurerm/lib/provider";

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
  }
}

const app = new App();
new GabStack(app, "gab-cdk");
app.synth();

