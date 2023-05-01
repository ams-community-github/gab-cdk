import { AzurermBackend, TerraformStack } from "cdktf";

export const setupBackend = (stack: TerraformStack) => new AzurermBackend(stack, {
    resourceGroupName: 'tf-state',
    storageAccountName: 'gabtfstatestorage',
    containerName: 'gabtfstate',
    key: 'tfstate'
   });