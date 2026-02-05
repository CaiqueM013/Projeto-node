pipeline {
  agent any

  tools {
    nodejs 'node18'
  }

  environment {
    IMAGE_NAME = "node-app"
    KUBE_NAMESPACE = "node-app"
  }

  stages {

    stage('Checkout') {
      steps {
        git branch: 'main',
            url: 'https://github.com/CaiqueM013/Projeto-node.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Run Tests') {
      steps {
        sh 'npm test'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh """
          docker build -t $IMAGE_NAME:latest .
        """
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        sh """
          kubectl apply -f k8s/deployment.yaml
          kubectl apply -f k8s/service.yaml
        """
      }
    }
  }

  post {
    success {
      echo 'Deploy realizado com sucesso 🚀'
    }
    failure {
      echo 'Pipeline falhou ❌'
    }
  }
}
