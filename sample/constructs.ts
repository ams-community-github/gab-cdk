import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import { StorageAccount, StorageAccountConfig } from "@cdktf/provider-azurerm/lib/storage-account";

class TaggedStorageAccount extends StorageAccount {
  constructor(scope: Construct, name: string, config: StorageAccountConfig, env: string) {
    super(scope, name, config);

    this.tags = {
       env,
       owner: 'gab'
    }
  }
}

class GabStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new TaggedStorageAccount(this, "gab_storage_account", {
        name: "gabstorageaccount",
        accountReplicationType: "LRS",
        accountTier: "Standard",
        location: "westeurope",
        resourceGroupName: "gab-rg"
      },
    "DEV"
    );
  }
}

const app = new App();
new GabStack(app, "gab-cdk");
app.synth();
