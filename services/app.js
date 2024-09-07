export default class Application {
    constructor(serviceLocator) {
        this.ServiceLocator = serviceLocator

        this.mainView = this.ServiceLocator.get('MainMenuView');
        this.ErrorManager = this.ServiceLocator.get('ErrorManager');
        this.cli = this.ServiceLocator.get('Cli');
        this.methodsToRun = [];
    }

    addMethodToRun(serviceName, methodName, args = []) {
        this.methodsToRun.push({ serviceName, methodName, args });
    }

    async run() {
        try {

            this.cli.execute(process.argv);
        } catch (error) {

            this.ErrorManager.capture(error);
        }
        // finally {
        //     this.mainView.close();
        //     process.exit(0);
        // }
    }
}