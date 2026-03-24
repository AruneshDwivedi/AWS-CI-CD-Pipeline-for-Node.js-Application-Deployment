pipeline {
    agent any

    stages {

        stage('Deploy with Ansible') {
            steps {
                sh '''
                cd ${WORKSPACE}/ansible
                ansible-playbook -i inventory.ini deploy.yml
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                sleep 5
                curl -f http://3.110.27.162:3000
                '''
            }
        }
    }
}
