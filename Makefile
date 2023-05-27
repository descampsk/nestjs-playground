docker-login:
	aws ecr get-login-password --profile kdescamps --region eu-west-1 | docker login --username AWS --password-stdin 644423257741.dkr.ecr.eu-west-1.amazonaws.com/demo-aws-app-runner
docker-build:
	docker build . -t 644423257741.dkr.ecr.eu-west-1.amazonaws.com/demo-aws-app-runner
docker-run:
	docker run -p 3000:3000 -it 644423257741.dkr.ecr.eu-west-1.amazonaws.com/demo-aws-app-runner
docker-push:
	docker push 644423257741.dkr.ecr.eu-west-1.amazonaws.com/demo-aws-app-runner
run-k6-cloud:
	k6 cloud ./k6/script.js
run-k6:
	k6 run ./k6/script.js
