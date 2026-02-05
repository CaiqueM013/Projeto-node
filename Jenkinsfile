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
            url: 'https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Run Tests') {
      steps {
        sh 'npm test'
      }
    }

    stage('Build App') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh '''
          docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
        '''
      }
    }

    stage('Deploy to Kubernetes (Docker Desktop)') {
      steps {
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
