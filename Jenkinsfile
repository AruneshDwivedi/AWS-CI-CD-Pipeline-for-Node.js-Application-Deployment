pipeline {
    agent any

    stages {

        stage('Deploy with Ansible') {
            steps {
                sh '''
                cd ansible
                ansible-playbook -i inventory.ini deploy.yml
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                sleep 5
                curl -f  --max-time 5 http://3.110.27.162:3000
                '''
            }
        }
    }

    post {
        failure {
            echo "Deployment failed! Rolling back..."

            sh '''
            cd ansible
            ansible-playbook -i inventory.ini rollback.yml
            '''
        }
    }
}