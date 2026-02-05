pipeline {
  agent any

  environment {
    IMAGE_NAME = "node-app"
    IMAGE_TAG  = "latest"
    KUBE_NAMESPACE = "kube-public"
  }

  stages {

    stage('Checkout') {
      steps {
        echo 'Clonando repositório do GitHub'
        git branch: 'main',
            url: 'https://github.com/CaiqueM013/Projeto-node.git'
      }
    }

    stage('Build Docker Image') {
      steps {
        echo 'Build da imagem Docker (npm roda no Dockerfile)'
        sh '''
          docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
        '''
      }
    }

    stage('Deploy to Kubernetes (Docker Desktop)') {
      steps {
        echo 'Deploy no Kubernetes'
        sh '''
          kubectl apply -f k8s/deployment.yaml
          kubectl apply -f k8s/service.yaml
        '''
      }
    }
  }

  post {
    success {
      echo 'Pipeline executado com sucesso 🚀'
    }
    failure {
      echo 'Pipeline falhou ❌'
    }
  }
}
