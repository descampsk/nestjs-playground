# ----------------- AWS App Runner -----------------
docker-login:
	aws ecr get-login-password --profile kdescamps --region eu-west-1 | docker login --username AWS --password-stdin 644423257741.dkr.ecr.eu-west-1.amazonaws.com/demo-aws-app-runner
docker-build:
	docker build . -t 644423257741.dkr.ecr.eu-west-1.amazonaws.com/demo-aws-app-runner
docker-run:
	docker run -p 3000:3000 -it 644423257741.dkr.ecr.eu-west-1.amazonaws.com/demo-aws-app-runner
docker-push:
	docker push 644423257741.dkr.ecr.eu-west-1.amazonaws.com/demo-aws-app-runner

# ----------------- Google Cloud Run -----------------
PROJECT_NAME := kdescamps-playground

run_create_service_account:
	gcloud iam service-accounts create nestjs-playground \
		--project ${PROJECT_NAME} \
		--description="Service account for the nestjs-playground app"
run_set_iam_rights:
	gcloud secrets add-iam-policy-binding doppler-nestjs-playground \
		--project ${PROJECT_NAME} \
		--member=serviceAccount:nestjs-playground@${PROJECT_NAME}.iam.gserviceaccount.com \
		--role=roles/secretmanager.secretAccessor
run_deploy:
	gcloud run deploy nestjs-playground \
		--project ${PROJECT_NAME} --region europe-west1 \
		--source . \
		--allow-unauthenticated \
		--execution-environment gen2 \
		--max-instances 5 \
		--service-account=nestjs-playground@${PROJECT_NAME}.iam.gserviceaccount.com \
		--set-secrets=DOPPLER_TOKEN=doppler-nestjs-playground:latest

# ----------------- K6 -----------------
k6_run_cloud:
	k6 cloud ./k6/script.js
k6_run:
	k6 run ./k6/script.js
