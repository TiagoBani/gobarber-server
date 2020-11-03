# gotack-node
![CI](https://github.com/TiagoBani/gobarber-server/workflows/CI/badge.svg?branch=master)

### Recuperação de senha

**RF**

- [x] o usuário deve poder **recuperar sua senha** informando o e-mail.

- [x] o usuário deve **receber um e-mail** com instruções de recuperação de senha.

- [x] O usuário deve poder **resetar sua senha**.

**RNF**

- [x] Utilizar `EtherealMail` para testar envios de e-mail em ambiente de desenvolvimento.

- [x] Utilizar `Amazon SES` para envios de e-mail em ambiente de desenvolvimento.

- [x] O envio de e-mails deve acontecer em **segundo plano** (background job).

**RN**

- [x] O link enviado por e-mail para resetar senha, deve **expirar** em 2 horas.

- [x] O usuário precisa **confirmar** a nova senha ao resetar a senha.


### Atualização do perfil

**RF**

- [x] O usuário deve pode atualizar seu **nome, email e senha**.

**RN**

- [x] O usuário não pode alterar seu e-mail para outro **já utilizado por outro usuário**.

- [x] Para **atualizar** sua senha, o usuário deve **informar sua senha antiga**.

- [x] Para **atualizar** sua senha, o usuário deve **confirmar a nova senha**.

### Painel do prestador

**RF**

- [x] O usuário deve poder **listar seus agendamentos** de um dia específicos.

- [x] O usuário deve receber uma **notificação** sempre que houver um **novo agendamento**.

- [x] O prestador deve poder visualizar as **notificações não lidas**.

**RNF**

- [x] Os agendamentos do prestador no dia devem ser armazenados em cache.

- [x] As notificações do prestador devem ser armazenadas no MongoDB.

- [ ] As notificações do prestador devem ser enviadas em tempo real utilizando `Socket.io`.

**RN**

- [x] A notificação deve possuir um status de **lida** ou **não-lida** para que o prestador possa controlar.


### Agendamento de serviços

**RF**

- [x] O usuário deve poder **listar todos** os prestadores de serviço cadastrados.

- [x] O usuário deve poder **listar os dias** de um mês com pelo menos um horário disponíviel de um prestador.

- [x] O usuário deve poder **listar horários** disponívies em um dia específico de um prestador.

- [x] O usuário deve poder realizar um **novo agendamento** com um prestador.

**RNF**

- [x] A listagem de prestadores deve ser **armazenada em cache**.

**RN**

- [x] Cada agendamento deve **durar 1 hora** exatamente.

- [x] Os agendamentos deve estar disponíveis **entre 8 hrs e 18 hrs** (Primeiro ás 8 horas, último ás 17 horas).

- [x] O usuário não pode agendar em um **horário já ocupado**.

- [x] O usuário não pode agendar em um **horário que já passou**.

- [x] O usuário não pode agendar **serviços consigo mesmo**.
