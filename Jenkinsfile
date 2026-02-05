pipeline {
  agent any

  stages {
    stage('Tests') {
      steps {
        echo 'Rodando testes'
        sh '''
          npm ci
          npm test
        '''
      }
    }

    stage('Build Docker Image') {
      steps {
        echo 'Build da imagem Docker'
        sh '''
          docker build -t node-app:latest .
        '''
      }
    }

    stage('Deploy to Kubernetes') {
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
      echo '✅ Pipeline executado com sucesso'
    }
    failure {
      echo '❌ Pipeline falhou'
    }
  }
}
