import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import { ResourceGroup } from "@cdktf/provider-azurerm/lib/resource-group";
import { AzurermProvider } from "@cdktf/provider-azurerm/lib/provider";
import { setupBackend } from "./setupBackend";
import { Naming } from "./.gen/modules/naming";

class GabStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const env = process.env.ENV || 'dev'; 

    new AzurermProvider(this, "azure", {
      features: {
        resourceGroup: {
          preventDeletionIfContainsResources: false
        }
      }
    });
    
    setupBackend(this);

    new Naming(this, 'naming', {
      prefix: ['gab'],
      suffix: [`${env}`]
    });
    
    new ResourceGroup(this, "gab_rg", {
      name: `\${module.naming.resource_group.name}`,
      location: "westeurope",
    });

    
  }
}

const app = new App();
new GabStack(app, "gab-cdk");
app.synth();
