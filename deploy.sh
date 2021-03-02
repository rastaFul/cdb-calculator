echo $1

docker-compose --env-file .env build $1
docker-compose --env-file .env up -d $1
