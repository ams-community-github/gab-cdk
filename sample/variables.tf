/********
* Local *
*********/

locals {
  common_tags = {
    project = "GAB-Rennes"
    owner   = "GAB"
  }
}

resource "azurerm_resource_group" "my_ressource_group" {
  name     = "my-ressource-group"
  location = "West Europe"
  tags = local.common_tags
}

/********
* Input *
*********/

variable "ressource_group_name" {
  default = "gab-rg-dev"
}

resource "azurerm_resource_group" "my_ressource_group_2" {
  name     = var.ressource_group_name
  location = "West Europe"
  tags = local.common_tags
}

/*********
* Output *
*********/

output "gab_ressource_groupd_id" {
  value = azurerm_resource_group.my_ressource_group.id
}

