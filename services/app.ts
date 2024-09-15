import ServiceLocator from "../Config/ServiceLocator";
import ErrorManager from "../Observer/ErrorManager";
import MainMenuView from "../views/mainMenuView";

type ApplicationProps = {
    serviceName: string;
    methodName: string;
    args: string[]
}

export default class Application {
    private readonly serviceLocator: ServiceLocator;
    private readonly errorManager: ErrorManager;
    private readonly mainView: MainMenuView;
    private methodsToRun: ApplicationProps[];

    constructor(service: ServiceLocator) {
        this.serviceLocator = service

        this.mainView = this.serviceLocator.get('MainMenuView');
        this.errorManager = this.serviceLocator.get('ErrorManager');
        this.methodsToRun = [];
    }

    addMethodToRun({ serviceName, methodName, args = [] }: ApplicationProps) {
        this.methodsToRun.push({ serviceName, methodName, args });
    }

    async run() {
        try {

            await this.mainView.view();
        } catch (error) {

            this.errorManager.capture(error);
            await this.run();
        }
        finally {
            this.mainView.close();
            process.exit(0);
        }
    }
}