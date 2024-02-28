# README para o Script "CRUD com Next.js e Firebase"

## Introdução
O script "CRUD com Next.js e Firebase" é uma aplicação React desenvolvida para realizar operações CRUD (Criar, Ler, Atualizar, Excluir) em um banco de dados Firebase Firestore. Ele permite gerenciar uma lista de contatos por meio de uma interface simples e interativa.

## Configuração
Antes de usar o script, verifique se você configurou corretamente os seguintes itens:
- Um banco de dados Firebase Firestore configurado e inicializado.
- A biblioteca Lucide-React para os ícones.
- O roteador Next.js configurado.

## Funcionalidades
O script oferece as seguintes funcionalidades:

### Criar
- Os usuários podem preencher um formulário para adicionar novos contatos, incluindo nome, e-mail, telefone e mensagem.
- Após o envio, os dados são salvos no banco de dados Firebase Firestore.

### Ler
- Ao carregar a página, a lista de contatos é recuperada do banco de dados e exibida.
- Cada contato é mostrado em uma lista, exibindo nome, e-mail, telefone e mensagem.

### Atualizar
- Os usuários podem editar os detalhes de um contato existente clicando no ícone de edição ao lado do contato desejado.
- Os dados do contato selecionado são carregados no formulário para edição.
- Após a edição, os dados são atualizados no banco de dados Firebase Firestore.

### Excluir
- Os usuários podem remover um contato clicando no ícone de lixeira ao lado do contato desejado.
- O contato correspondente é removido do banco de dados Firebase Firestore.

## Detalhes de Implementação
- O script utiliza hooks do React, como useState e useEffect, para gerenciar o estado e os efeitos colaterais.
- Os métodos do Firebase Firestore, como getDocs, addDoc, updateDoc e deleteDoc, são usados para interagir com o banco de dados.
- A biblioteca de ícones Lucide-React é utilizada para os ícones de edição e exclusão.
- O roteador Next.js é utilizado para a navegação entre páginas.

## Uso
Para integrar o script "CRUD com Next.js e Firebase" em seu projeto, siga estas etapas:
1. Copie o script e suas dependências para seu projeto React.
2. Configure o Firebase Firestore e atualize a configuração do Firebase no script.
3. Certifique-se de que a biblioteca Lucide-React está instalada e disponível.
4. Integre o script em sua aplicação e adapte-o conforme necessário.

## Contribuidores
Este script é mantido por [Seu Nome/Organização].

## Licença
Este script é licenciado sob [Nome/Tipo da Licença]. Consulte o arquivo LICENSE para obter mais detalhes.

## Suporte
Para dúvidas ou problemas relacionados ao script, entre em contato com [Suas Informações de Contato].
