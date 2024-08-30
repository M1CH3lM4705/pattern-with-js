export default class DatabaseService {
    constructor(connectionString) {
        this.connectionString = connectionString;
    }

    connect() {
        console.log(`Conectando ao banco de dados em ${this.connectionString}`);
    }
}