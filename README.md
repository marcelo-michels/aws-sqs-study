# aws-sqs-study

## O que é?
O Amazon Simple Queue Service (SQS) é um serviço de filas de mensagens gerenciado que permite o desacoplamento e a escalabilidade de microsserviços, sistemas distribuídos e aplicativos sem servidor. O SQS elimina a complexidade e a sobrecarga associadas ao gerenciamento e à operação de middleware orientado a mensagens, além de permitir que os desenvolvedores se dediquem a criar diferenciais. Use o SQS para enviar, armazenar e receber mensagens entre componentes de software em qualquer volume, sem perder mensagens ou precisar que outros serviços estejam disponíveis.  

## Capacidade
**Filas Padrão**  

Taxa de transferência ilimitada: as filas padrão comportam um número quase ilimitado de transações por segundo (TPS) por ação de API.  

Entrega pelo menos uma vez: uma mensagem é entregue pelo menos uma vez, mas, às vezes, mais de uma cópia da mensagem é entregue.  

Melhor ordenação possível: às vezes, as mensagens podem ser entregues em uma ordem diferente da qual elas foram enviadas.  

**Filas FIFO**  
Alta taxa de transferência: por padrão, as filas do tipo FIFO comportam até 300 mensagens por segundo (300 operações de envio, recebimento ou exclusão por segundo). Ao agrupar em lote 10 mensagens por operação (no máximo), as filas FIFO podem dar suporte a até 3.000 mensagens por segundo. Para solicitar um aumento de limite, envie uma solicitação de suporte.  

Processamento exatamente uma vez: uma mensagem é entregue uma vez e permanece disponível até que um consumidor a processe e exclua. Duplicatas não são inseridas na fila.  

Entrega FIFO: a ordem em que as mensagens são enviadas e recebidas é preservada com rigor (ou seja a primeira a entrar será a primeira a sair).  

## Custo  
O nível gratuito da AWS inclui 1 milhão de solicitações por mês.

**Filas Padrão:** 0,40 USD por milhão de solicitações de(0,0000004 USD por solicitação)  
**Filas FIFO:** 0,50 USD por milhão de solicitações de(0,0000004 USD por solicitação)

## Study Lab  
  
**index.js**    
Arquivo qual é responsavel por gravar itens em uma FILA  
  
**worker.js**    
Arquivo qual é responsavel por ler e deletar as mensagens da fila    
Este pode ser executado em paralelo quantas vezes for necessário (em terminais ou maquinas diferentes)  
