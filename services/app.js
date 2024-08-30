export default class Application {
    constructor(userView, loggerService, errorManager) {
        // this.ServiceLocator = serviceLocator
        this.LoggerService = loggerService
        this.UserView = userView;
        this.ErrorManager = errorManager;
        this.methodsToRun = [];
    }

    addMethodToRun(serviceName, methodName, args = [] ){
        this.methodsToRun.push({serviceName, methodName, args});
    }

    async run() {
        try {
            
           await this.UserView.view();
        } catch (error) {
            
            this.ErrorManager.capture(error);
            await this.run();
        }
    }
}