import AppError from "../ErrorHandler/AppError.js";
import Guid from "../models/Guid.js";
import User from "../models/User.js";

export default class UserService {
    constructor(loggerService, fetchClient) {
        this.LoggerService = loggerService;
        this.client = fetchClient
        this.LoggerService.log('[INFO] Instancia de user service criada')
    }

    async getUsers() {
        this.LoggerService.log('[INFO] Buscando usuários')
        const users = await this.client.get('/users')
        
        this.users = users.map(({ id, name, age }) => {
            return new User(id, name, age)
        })

        this.LoggerService.log(this.users)
    }

    async getUserId(id){
        this.LoggerService.log(`[INFO] Buscando usuário com id: ${id}`);

        const user = await this.client.get(`/users/${id}`);

        this.LoggerService.log(new User(user.id, user.name, user.age));

        return user;
    }

    async createUser(...user){
        const [name, age] = user;
        const data = new User(null, name, age)
        
        await this.client.post('/users', data);

        this.LoggerService.log(data);
    }

    async updateUser(...user){
        const [id, name, age] = user;

        if(!Guid.isValid(id))
            throw new AppError('O id informado não é válido.')

        const data = new User(id, name, age);

        await this.client.put(`/users/${id}`, data)

        this.LoggerService.log(data);
    }

    async deleteUser(id){
        const user = await this.getUserId(id);
        
        if(!user)
            throw new AppError('Usuário não encontrado');

        await this.client.delete(`/users/${id}`);

        this.LoggerService.log(`O usuário '${user.name}' deletado`);
    }
}