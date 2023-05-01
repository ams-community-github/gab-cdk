data "azurerm_resource_group" "find_ressource_group" {
  name = "example"
}

data "azurerm_resources" "find_ressource" {
  resource_group_name = "example-resources"

  required_tags = {
    environment = "production"
    role        = "webserver"
  }
}

data "terraform_remote_state" "sub" {
  backend = "azurerm"
  config = {
    storage_account_name = "mystorage"
    container_name       = "tfstate"
    key                  = "terraform.tfstate"
  }
}


