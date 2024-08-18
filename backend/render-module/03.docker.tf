resource "render_web_service" "web" {
  name   = "terraform-web-service"
  plan   = "standard"
  region = "oregon"

  runtime_source = {
    docker = {
      image    = "emacuello/youdrive:latest"
      repo_url = "https://github.com/emacuello/backendpf"
      branch   = "main"
    }
  }
  secret_files = {
    ".env.development" = { content = var.env_file_content }
  }
}
