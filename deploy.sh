APPS_DIR="/home/$USER/projects"
echo $1 $2

case "$1" in
    clone)
        cd $APPS_DIR
        echo "Clonando projetos..."
        git clone
        echo "Projeto baixado"
        echo "Concluído"
        exit 0;
    ;;    
    deploy)
            docker-compose --env-file .env build $2
            docker-compose --env-file .env up -d $2
        exit 0;
    ;;
    *)
        echo "ERRO: Use: deploy.sh {clone|deploy}" >&2
        exit 1
    ;;
esac