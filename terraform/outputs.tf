output "jenkins_public_ip" {
  description = "Jenkins server public IP"
  value       = aws_instance.jenkins.public_ip
}

output "app_public_ip" {
  description = "App server public IP"
  value       = aws_instance.app.public_ip
}