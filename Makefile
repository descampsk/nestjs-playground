docker-login:
	aws ecr get-login-password --region eu-west-1 --profile innovorder-lab | docker login --username AWS --password-stdin 920081703738.dkr.ecr.eu-west-1.amazonaws.com
docker-push:
	docker push 920081703738.dkr.ecr.eu-west-1.amazonaws.com/demo-aws-app-runner:prod
