config {
  module = false
}

plugin "terraform" {
  enabled = true
  preset  = "recommended"
}

plugin "azurerm" {
    enabled = true
    version = "0.23.0"
    source  = "github.com/terraform-linters/tflint-ruleset-azurerm"
}

rule "terraform_deprecated_index" {
  enabled = false
}