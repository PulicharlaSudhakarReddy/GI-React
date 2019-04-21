pipeline {
  environment {
    registry = "sudhakardvps/godrej_nodejs"
    registryCredential = 'dockerhub'
  }
  agent any
  stages {
    stage('Cloning Git') {
      steps {
        git 'https://github.com/PulicharlaSudhakarReddy/GI-React.git'
      }
    }
    stage('Building image') {
      steps{
        script {
          docker.build registry + ":0.0.1"
        }
      }
    }
  stage('Deploy Image') {
      steps{
        script {
          docker.withRegistry( '', registryCredential ) {
            dockerImage.push()
          }
        }
      }
    }
    stage('Remove Unused docker image') {
      steps{
        sh "docker rmi $registry:$BUILD_NUMBER"
      }
    }
  }
}
