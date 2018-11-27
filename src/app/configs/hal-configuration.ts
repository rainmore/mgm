import { Injectable }                                                   from '@angular/core';
import { ExternalConfigurationHandlerInterface, ExternalConfiguration } from 'angular4-hal';
import { HttpClient }                                                   from '@angular/common/http';
import { projectConfiguration }                                         from './project-configuration';

@Injectable()
export class HalConfiguration implements ExternalConfigurationHandlerInterface {

    constructor(private httpClient: HttpClient) {
    }

    getProxyUri(): string {
        return this.getRootUri();
    }

    getRootUri(): string {
        return projectConfiguration.apiUrl;
    }

    // @ts-ignore
    getHttp(): HttpClient {
        return this.httpClient;
    }

    getExternalConfiguration(): ExternalConfiguration {
        return null;
    }

    setExternalConfiguration(externalConfiguration: ExternalConfiguration) {
    }

    serialize() {
    };

    deserialize() {
    };
}
