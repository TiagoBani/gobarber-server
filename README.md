# gotack-node

### Recuperação de senha

**RF**

- [ ]o usuário deve poder **recuperar sua senha** informando o e-mail.

- [ ]o usuário deve **receber um e-mail** com instruções de recuperação de senha.

- [ ]O usuário deve poder **resetar sua senha**.

**RNF**

- [ ]Utilizar `Mailtrap` para testar envios de e-mail em ambiente de desenvolvimento.

- [ ]Utilizar `Amazon SES` para envios de e-mail em ambiente de desenvolvimento.

- [ ]O envio de e-mails deve acontecer em **segundo plano** (background job).

**RN**

- [ ]O link enviado por e-mail para resetar senha, deve **expirar** em 2 horas.

- [ ]O usuário precisa **confirmar** a nova senha ao resetar a senha.


### Atualização do perfil

**RF**

- [ ]O usuário deve pode atualizar seu **nome, email e senha**.

**RN**

- [ ]O usuário não pode alterar seu e-mail para outro **já utilizado por outro usuário**.

- [ ]Para **atualizar** sua senha, o usuário deve **informar sua senha antiga**.

- [ ]Para **atualizar** sua senha, o uruário deve **confirmar a nova senha**.

### Painel do prestador

**RF**

- [ ]O usuário deve poder **listar seus agendamentos** de um dia específicos.

- [ ]O usuário deve receber uma **notificação** sempre que houver um **novo agendamento**.

- [ ]O prestador deve poder visualizar as **notificações não lidas**.

**RNF**

- [ ]Os agendamentos do prestador no dia devem ser armazenados em cache.

- [ ]As notificações do prestador devem ser armazenadas no MongoDB.

- [ ]As notificações do prestador devem ser enviadas em tempo real utilizando `Socket.io`.

**RN**

- [ ]A notificação deve possuir um status de **lida** ou **não-lida** para que o prestador possa controlar.


### Agendamento de serviços

**RF**

- [ ]O usuário deve poder **listar todos** os prestadores de serviço cadastrados.

- [ ]O usuário deve poder **listar os dias** de um mês com pelo menos um horário disponíviel de um prestador.

- [ ]O usuário deve poder **listar horários** disponívies em um dia específico de um prestador.

- [ ]O usuário deve poder realizar um **novo agendamento** com um prestador.

**RNF**

- [ ]A listagem de prestadores deve ser **armazenada em cache**.

**RN**

- [ ]Cada agendamento deve **durar 1 hora** exatamente.

- [ ]Os agendamentos deve estar disponíveis **entre 8 hrs e 18 hrs** (Primeiro ás 8 horas, último ás 17 horas).

- [ ]O usuário não pode agendar em um **horário já ocupado**.

- [ ]O usuário não pode agendar em um **horário que já passou**.

- [ ]O usuário não pode agendar **serviços consigo mesmo**.
