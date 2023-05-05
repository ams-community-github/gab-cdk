import { Construct } from "constructs";
import { App, Aspects, TerraformStack } from "cdktf";
import { ResourceGroup } from "@cdktf/provider-azurerm/lib/resource-group";
import { AzurermProvider } from "@cdktf/provider-azurerm/lib/provider";
import { setupBackend } from "./setupBackend";
import { Naming } from "./.gen/modules/naming";
import { StorageAccount } from "@cdktf/provider-azurerm/lib/storage-account";
import { LinuxFunctionApp } from "@cdktf/provider-azurerm/lib/linux-function-app";
import { GabServicePlan } from "./gabServicePlan";
import { TagsAddingAspect } from "./tagsAddingAspect";
import { ValidateRessourceLocation } from "./validateRessourceLocation";

interface GabConfig {
  environment: string;
  location?: string;
}

class GabStack extends TerraformStack {
  constructor(scope: Construct, id: string, {environment, location='westeurope'}: GabConfig) {
    super(scope, id);

    const defaultTags = {
      environment,
      owner: 'GAB',
      project: 'GAB-Rennes'
    }
    const prefix = 'gab';

    new AzurermProvider(this, "azurerm", {
      features: {
        resourceGroup: {
          preventDeletionIfContainsResources: false
        }
      }
    });
    
    setupBackend(this, environment);

    new Naming(this, 'naming', {
      prefix: [prefix],
      suffix: [`${environment}`]
    });
    
    const rg = new ResourceGroup(this, "gab_rg", {
      name: `\${module.naming.resource_group.name}`,
      location,
      tags: defaultTags
    });

    const storageAccount = new StorageAccount(this, "gab_storage_account", {
      name:`\${module.naming.storage_account.name}`,
      resourceGroupName: rg.name,
      location,
      accountTier: "Standard",
      accountReplicationType: "LRS"
    });

    
    const servicePlan = new GabServicePlan(this, "gab_service_plan", {
      name:`\${module.naming.app_service_plan.name}`,
      resourceGroupName: rg.name,
      location,
      osType: 'Linux',
      skuName: 'B1'
    });

    new LinuxFunctionApp(this, "gab_linux_function_app", {
      name:`\${module.naming.app_service_plan.name}`,
      resourceGroupName: rg.name,
      location,
      tags: defaultTags,
      storageAccountName: storageAccount.name,
      storageAccountAccessKey: storageAccount.primaryAccessKey,
      servicePlanId: servicePlan.id,
      siteConfig: {}
    });

    Aspects.of(this).add(new TagsAddingAspect(defaultTags));
    Aspects.of(this).add(new ValidateRessourceLocation(location));
  }
}

const app = new App();
new GabStack(app, "gab-cdk-dev", {
  environment: "dev",
});
new GabStack(app, "gab-cdk-rec", {
  environment: "rec",
});
app.synth();
