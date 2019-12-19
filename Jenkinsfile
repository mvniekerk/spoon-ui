def label = "spoon-ui-build-${UUID.randomUUID().toString()}"
def mergeBranch = "2467-fix-jenkins-pipeline" //TODO: fix at PR - usually master

podTemplate(label: label, containers: [
    containerTemplate(name: 'docker', image: 'docker', command: 'cat', ttyEnabled: true),
    containerTemplate(name: 'helm', image: 'alpine/helm:2.12.0', command: 'cat', ttyEnabled: true),
    containerTemplate(name: 'maven', image: 'maven:3.5.3-jdk-8-alpine', command: 'cat', ttyEnabled: true),
    containerTemplate(name: 'node', image: 'node:10.13.0-stretch', command: 'cat', ttyEnabled: true),
    containerTemplate(name: 'sonar-scanner', image: 'newtmitch/sonar-scanner:3.2.0', command: 'cat', ttyEnabled: true),
],
    volumes: [
        hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
        hostPathVolume(mountPath: '/root/.m2/repository', hostPath: '/root/.m2/repository'),
        //hostPathVolume(mountPath: '/root/.npm', hostPath: '/root/.npm'),
        //hostPathVolume(mountPath: '/root/.npmrc', hostPath: '/root/.npmrc'),
        hostPathVolume(mountPath: '/root', hostPath: "/tmp/root/${label}"),
        hostPathVolume(mountPath: '/tmp', hostPath: "/tmp/${label}")
    ]) {

    node(label) {
        def myRepo = checkout scm
        def GIT_COMMIT = "${myRepo.GIT_COMMIT[0..10]}"
        def GIT_BRANCH = myRepo.GIT_BRANCH

        echo "GIT_COMMIT ${GIT_COMMIT}"

        def baseImageName = "spoon-ui"

        def runImage = "${baseImageName}:${GIT_COMMIT}"

        def didFail = false
        def throwable = null

        echo "NPM Artifactory: $ARTIFACTORY_NPM_LOCAL"
        echo "Docker Artifactory: ${DOCKER_LOCAL_REPO}"
        try {
            stage('Build+Unit Test') {
                container('node') {
                    sh "npm install -y"
                    sh "npm test"
                    sh "npm run webpack:prod"
                    sh "npm run lib"
                }
            }

            stage('SonarQube Analysis') {
                container('sonar-scanner') {
                    withSonarQubeEnv('sonarqube-cluster') {
                        //NOTE: non-standard custom $SONAR_HOST_IN_CLUSTER_URL used rather than the plugin $SONAR_HOST_URL to resolve Sonarqube in-cluster
                        sh """sonar-scanner -Dsonar.host.url=${SONAR_HOST_IN_CLUSTER_URL} \
                          -Dsonar.projectKey=${SONAR_AUTH_TOKEN} \
                          -Dsonar.projectName="${baseImageName}" \
                          -Dsonar.projectVersion=1 \
                          -Dsonar.projectBaseDir=./ \
                          -Dsonar.sources=./lib/ """
                    }
                }
            }

            stage('Publish NPM') {
                if (GIT_BRANCH == mergeBranch) {
                    def npmrc = ""
                    container('docker') {
                        sh "pwd; whoami"
                        sh "rm -f ~/.npmrc"
                        withCredentials([usernamePassword(credentialsId: 'Jenkins-Artifactory-Credentials', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                            def cmd = "docker run " +
                                "-e NPM_USER=$USERNAME " +
                                "-e NPM_PASS=$PASSWORD " +
                                "-e NPM_EMAIL=mvniekerk@gmail.com " +
                                "-e NPM_REGISTRY=https://${ARTIFACTORY_NPM_LOCAL} " +
                                "-e NPM_SCOPE=@bigbaobab " +
                                "bravissimolabs/generate-npm-authtoken > ~/.npmrc"

                            npmrc = sh(
                                script: cmd,
                                returnStdout: true
                            ).trim()

                            sh "echo '//${ARTIFACTORY_NPM_LOCAL}:always-auth=true' >> ~/.npmrc"
                        }
                    }

                    container('node') {
                        sh "cat ~/.npmrc"
                        sh "npm publish dist/"
                    }
                }
            }

            stage('Build docker image') {
                container('docker') {
                    withDockerRegistry([credentialsId: 'Jenkins-Artifactory-Credentials', url: "https://${DOCKER_LOCAL_REPO}"]) {
                        echo "Build Nginx image"
                        sh "docker build -t ${runImage} -f Dockerfile-jenkins ."
                        echo "Push Nginx image"
                        sh "docker tag ${runImage} ${DOCKER_LOCAL_REPO}${runImage}"
                        sh "docker push ${DOCKER_LOCAL_REPO}${runImage}"
                    }
                }
            }

            stage('Deploy') {
                container('docker') {
                    if (GIT_BRANCH == mergeBranch) {
                        withDockerRegistry([credentialsId: 'Jenkins-Artifactory-Credentials', url: "https://${DOCKER_LOCAL_REPO}"]) {
                            sh "docker tag ${DOCKER_LOCAL_REPO}${runImage} ${DOCKER_LOCAL_REPO}${baseImageName}:latest"
                            sh "docker push ${DOCKER_LOCAL_REPO}${baseImageName}:latest"
                        }
                    }
                }
            }

            stage('Package Helm Charts') {
                container('helm') {
                    if (GIT_BRANCH == mergeBranch) {
                        sh 'cat /etc/resolv.conf'
                        sh 'helm init --client-only'
                        helmChartOutput = sh(
                            script: "helm package -d /tmp helm-chart/spoon-ui",
                            returnStdout: true
                        ).trim()

                        helmChartName = sh(
                            script: "echo ${helmChartOutput} | cut -d'/' -f 3 ",
                            returnStdout: true
                        ).trim()
                    }
                }
            }

            stage('Push Helm Charts') {
                container('maven') {
                    if (GIT_BRANCH == mergeBranch) {
                        withCredentials([usernamePassword(credentialsId: 'Jenkins-Artifactory-Credentials', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                            sh "curl -u$USERNAME:$PASSWORD -T /tmp/$helmChartName https://${DOCKER_LOCAL_REPO}gbl/baobab-helm-local/$helmChartName"
                        }
                    }
                }
            }

            stage('Clean Temp Packaged Helm Charts') {
                container('maven') {
                    if (GIT_BRANCH == mergeBranch) {
                        sh "rm /tmp/$helmChartName"
                    }
                }
            }
        } catch (e) {
            didFail = true
            throwable = e
        } finally {
            sh "rm -rf /tmp/${label}"
        }
        if (didFail) {
            echo "Something went wrong. Should be sending a mail"
            error throwable
        }
    }
}

