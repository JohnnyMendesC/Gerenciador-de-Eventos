# Gerenciador de Eventos - Desafio Residência - NEKI

## Descrição do Projeto

O **Gerenciador de Eventos** é um projeto de estudos elaborado para a empresa Neki em seu processo seletivo pós Residência em TIC do SerraTec. Com foco na implementação de um sistema que será operado por um Administrador que fará o controle de eventos através da plataforma web ou mobile, podendo cadastrar, listar, editar ou remover eventos. Esse administrador terá um login específico que será criado através da tela de cadastro de administrador. Os dados sensíveis, como a senha cadastrada, são salvos no Banco de Dados de forma criptografada e o sistema todo utiliza Java Web Token para validação das requisições.

Este repositório contém a implementação **FullStack** do sistema, contendo tanto a elaboração do **BackEnd** através do framework Spring Boot, quanto o **FrontEnd** através dos frameworks React para versão web, e React-Native para versão mobile.

---

## Funcionalidades.

### Backend (Spring Boot)
**Serviço de Login de Administrador**:
-	Verifique o email e senha para autenticação.
-	Retorne um token para os demais serviços.

**Serviço de Cadastro de Administrador**:
-	Receba os dados de nome, email e senha para cadastro.
-	Armazene a senha de forma criptografada.

**Serviço de Listagem de Eventos**:
-	Receba o id do administrador e retorne todos os eventos associados.

**Serviço de Cadastro de Evento**:
-	Receba o nome, data, localização, imagem e adminId para associar o evento ao administrador.

**Serviço de Atualização de Evento**:
-	Permita atualizar a data ou localização de um evento com base no eventoId.

**Serviço de Exclusão de Evento**:
-	Exclua o evento usando o eventoId.


### Frontend (React e React Native)
**Tela de Login**:  
- Campos: Email do Administrador, Senha.
- Caso opte por "Gravar Senha", salve para acesso rápido nas próximas vezes.
- Botões: Entrar e Cadastrar-se.  

**Tela de Cadastro de Administrador**:  
-	Campos: Nome do Administrador, Email, Senha, Confirmar Senha.
-	Valide se a senha coincide com o campo de confirmação.
-	Ao cadastrar, exiba uma mensagem de sucesso.  

**Tela Home de Eventos**:
-	Liste os eventos cadastrados pelo administrador, com imagem, título do evento, data e localização.
-	Opções de Editar data e localização.
-	Excluir evento da lista.
-	Botão de Adicionar Evento, que abrirá uma modal com:  
■	Campos para nome do evento, data, localização e uma imagem.  
■	Botão de salvar.

### Requisitos Adicionais
-	Segurança JWT para serviços, exceto o login.
-	Documentação dos serviços com Swagger (Spring Fox).
-	Boas práticas de API RESTFul e código disponível em um repositório público.


---

## Autoria

<br/>
<table>
    <tr>
    <td align="center">
      <a href="https://www.linkedin.com/in/j-mendes-do-carmo">
        <img src="https://avatars.githubusercontent.com/u/177888064?v=4" width="100px;" alt="Avatar Johnny Mendes"/><br>
        <sub>
          <b>Johnny Mendes</b>
        </sub>
      </a>
    </td>
</table>
</br>
</br>

