import Configuration from "../models/configuration";
import { Subject } from 'rxjs';
import StorageService from "../services/storageService"
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";

export class ConfigurationService{
    serverSettings=new Configuration()
    settingsLoadedSource=new Subject()
    isReady= false
    storageService=new StorageService()
    http= new HttpClient()
    settingsLoaded$ = this.settingsLoadedSource.asObservable();

    load() {
        const baseURI = document.baseURI.endsWith('/') ? document.baseURI : `${document.baseURI}/`;
        let url = `${baseURI}Home/Configuration`;
        this.http.get(url).subscribe((response) => {
            console.log('server settings loaded');
            this.serverSettings = response;
            console.log(this.serverSettings);
            this.storageService.store('identityUrl', this.serverSettings.identityUrl);
            this.storageService.store('purchaseUrl', this.serverSettings.purchaseUrl);
            this.storageService.store('signalrHubUrl', this.serverSettings.signalrHubUrl);
            this.storageService.store('activateCampaignDetailFunction', this.serverSettings.activateCampaignDetailFunction);
            this.isReady = true;
            this.settingsLoadedSource.next();
        });
    }

}