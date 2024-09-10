
export default class Chatbot {
  constructor({ serviceLocator, client }) {
    this.service = serviceLocator;
    this.client = client;
  }

  static init(obj) {
    const chat = new this(obj)
    chat.initializeHandlers();
    chat.initialize();
    return chat;
  }

  initializeHandlers() {
    this.client.on('qr', (qr) => {
      console.log('QR Recebido', qr);
    });

    this.client.on('ready', () => {
      console.log('Client está pronto!');
    });

    this.client.on('message_create', (msg) => {
      console.log(msg.body)
      if (msg.body === '!ping') {
        this.client.sendMessage(msg.from, 'pong');
      }
    });
  }

  initialize() {
    this.client.initialize();
  }
}