import { AzurermBackend, TerraformStack } from "cdktf";

export const setupBackend = (stack: TerraformStack, environment: string) => new AzurermBackend(stack, {
    resourceGroupName: 'tf-state',
    storageAccountName: 'gabtfstatestorage',
    containerName: 'gabtfstate',
    key: `tfstate-${environment}`
   });