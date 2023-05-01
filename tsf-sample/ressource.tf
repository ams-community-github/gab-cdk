resource "azurerm_resource_group" "my_ressource_group" {
  name     = "my-ressource-group"
  location = "West Europe"
}

resource "azurerm_container_group" "my_container_group" {
  name                = "my-container-group"
  location            = azurerm_resource_group.my_ressource_group.location
  resource_group_name = azurerm_resource_group.my_ressource_group.name

  os_type = "Linux"

  container {
    name   = "hello-world"
    image  = "microsoft/aci-helloworld:latest"
    cpu    = "0.5"
    memory = "1.5"

    ports {
      port     = 443
      protocol = "TCP"
    }
  }
}


