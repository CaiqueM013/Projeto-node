pipeline {
  agent any

  options {
    skipDefaultCheckout(true)
  }

  stages {

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t node-app:latest .'
      }
    }

  }
}
