import { SecurityService } from './securityService';
import { ConfigurationService } from './configurationService';
import { HubConnection, HubConnectionBuilder, LogLevel} from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';


export class SignalrService {
    _hubConnection= new HubConnection();
    SignalrHubUrl='';
    msgSignalrSource = new Subject();
    msgReceived$ = this.msgSignalrSource.asObservable();
    securityService=new SecurityService()
    configurationService=new ConfigurationService()
    toastr=new ToastrService()

    constructor() {
        if (this.configurationService.isReady) {
            this.SignalrHubUrl = this.configurationService.serverSettings.signalrHubUrl;
            this.init();
        }
        else {
            this.configurationService.settingsLoaded$.subscribe(x => {
                this.SignalrHubUrl = this.configurationService.serverSettings.signalrHubUrl;
                this.init();
            });
        }
    }

    stop() {
        this._hubConnection.stop();
    }

    init() {
        if (this.securityService.IsAuthorized === true) {
            this.register();
            this.stablishConnection();
            this.registerHandlers();
        }
    }

    register() {
        this._hubConnection = new HubConnectionBuilder()
            .withUrl(this.SignalrHubUrl + '/hub/notificationhub', {
                accessTokenFactory: () => this.securityService.GetToken()
            })
            .configureLogging(LogLevel.Information)
            .withAutomaticReconnect()
            .build();
    }

    stablishConnection() {
        this._hubConnection.start()
            .then(() => {
                console.log('Hub connection started')
            })
            .catch(() => {
                console.log('Error while establishing connection')
            });
    }

    registerHandlers() {
        this._hubConnection.on('UpdatedOrderState', (msg) => {
            console.log(`Order ${msg.orderId} updated to ${msg.status}`);
            this.toastr.success('Updated to status: ' + msg.status, 'Order Id: ' + msg.orderId);
            this.msgSignalrSource.next();
        });
    }
}