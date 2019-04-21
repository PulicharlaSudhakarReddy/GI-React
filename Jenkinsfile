pipeline {
  environment {
    registry = "sudhakardvps/godrej_nodejs"
    registryCredential = 'dockerhub'
  }
  agent any
  stages {
    stage('Cloning Git') {
      steps {
        git 'https://github.com/gustavoapolinario/microservices-node-example-todo-frontend.git'
      }
    }
    stage('Building image') {
      steps{
        script {
          docker.build registry + ":0.0.1"
        }
      }
    }
  }
}
