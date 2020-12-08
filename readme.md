## Instalação
Você pode clonar este repositório OU baixar o .zip


## Configuração
Todos os arquivos de **configuração** e aplicação estão dentro da pasta *src*.

A configuração da API está no arquivo *src/app/fetch.js*
As configurações de URL está no arquivo *src/routes.js*

## Uso
Você deve acessar a api através da *url* do projeto na pasta routes.
Deve ser usado o modelo de url a seguir: *http://localhost:3000?state=SP&dateStart=2020-11-08&dateEnd=2020-10-11*
Os filtros devem estar presentes, caso contrário o retorno será o status **http 400 (bad request)**
