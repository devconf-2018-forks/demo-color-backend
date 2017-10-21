def appName=""
def project=""
def tag="blue"
def altTag="green"
def verbose="true"
node ('master') {
  stage('Initialize') {
    appName=sh(script:'echo $JOB_BASE_NAME | sed "s/[^-]*-\\(.*\\)-[^-]*/\\1/"', returnStdout: true).trim()
    project=env.PROJECT_NAME

    active=sh(script: "oc get route ${appName} -n ${project} -o jsonpath='{ .spec.to.name }' | sed 's/.*-\\([^-]*\\)/\\1/'", returnStdout: true).trim()
    if (active == tag) {
      tag = altTag
      altTag = active
    }
  }

  stage('Build') {
    openshiftBuild(buildConfig: appName, showBuildLogs: "true")
  }

  stage('Deploy') {
    openshiftTag(sourceStream: appName, sourceTag: 'latest', destinationStream: appName, destinationTag: tag)
    openshiftVerifyDeployment(deploymentConfig: "${appName}-${tag}")
  }

  stage('Verify') {
    def activeRoute = sh(script: "oc get route ${appName}-${tag} -n ${project} -o jsonpath='{ .spec.host }'", returnStdout: true).trim()
    input message: "Test deployment: http://${activeRoute}. Approve?", id: "approval"
  }

  stage 'Promote'
  sh "oc set -n ${project} route-backends ${appName} ${appName}-${tag}=100 ${appName}-${altTag}=0"

}