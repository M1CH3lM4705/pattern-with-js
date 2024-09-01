export default class Application {
    constructor(serviceLocator) {
        this.ServiceLocator = serviceLocator

        this.mainView = this.ServiceLocator.get('MainMenuView');
        this.ErrorManager = this.ServiceLocator.get('ErrorManager');
        this.methodsToRun = [];
    }

    addMethodToRun(serviceName, methodName, args = [] ){
        this.methodsToRun.push({serviceName, methodName, args});
    }

    async run() {
        try {
            
           await this.mainView.view();
        } catch (error) {
            
            this.ErrorManager.capture(error);
            await this.run();
        }
        finally{
            this.mainView.close();
        }
    }
}