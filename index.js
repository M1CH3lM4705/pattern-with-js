import GenericBuilder from "./builder/GenericBuild.js";
import InjectionConfig from "./Config/InjectionConfig.js";
import ServiceLocator from "./Config/ServiceLocator.js";
import Application from "./services/app.js";


const serviceLocator = new ServiceLocator();

InjectionConfig.init({
  serviceLocator:serviceLocator
})

const app = GenericBuilder
                .configure(Application)
                .withDependency(serviceLocator)              
                .build();


app.run();