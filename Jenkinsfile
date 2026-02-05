pipeline {
    agent any

    environment {
        IMAGE_NAME = "node-app"
        IMAGE_TAG  = "latest"
    }

    stages {
        stage('Checkout') {
            steps {
                // Tente usar esta forma mais robusta de checkout
                checkout scm
                
                // Ou se for forçar o clone manual:
                // git branch: 'main', url: 'https://github.com/CaiqueM013/Projeto-node.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Usar o comando sh para buildar a imagem
                    sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                }
            }
        }

        stage('Deploy') {
            steps {
                // Certifique-se que os arquivos .yaml existem na pasta k8s
                sh "kubectl apply -f k8s/deployment.yaml"
                sh "kubectl apply -f k8s/service.yaml"
            }
        }
    }
}