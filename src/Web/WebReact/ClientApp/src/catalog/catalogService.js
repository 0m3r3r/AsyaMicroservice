import { DataService } from '../services/dataService';
import { ConfigurationService } from '../services/configurationService';
import { tap } from 'rxjs/operators';


export class CatalogService {
    catalogUrl = '';
    brandUrl = '';
    typesUrl = '';
    service=new DataService() 
    configurationService=new  ConfigurationService()
  
    constructor() {
        this.configurationService.settingsLoaded$.subscribe(x => {
            this.catalogUrl = this.configurationService.serverSettings.purchaseUrl + '/c/api/v1/catalog/items';
            this.brandUrl = this.configurationService.serverSettings.purchaseUrl + '/c/api/v1/catalog/catalogbrands';
            this.typesUrl = this.configurationService.serverSettings.purchaseUrl + '/c/api/v1/catalog/catalogtypes';
        });
    }

    getCatalog(pageIndex, pageSize, brand, type) {
        let url = this.catalogUrl;

        if (type) {
            url = this.catalogUrl + '/type/' + type.toString() + '/brand/' + ((brand) ? brand.toString() : '');
        }
        else if (brand) {
            url = this.catalogUrl + "/type/all/brand/" + ((brand) ? brand.toString() : '');
        }
      
        url = url + '?pageIndex=' + pageIndex + '&pageSize=' + pageSize;

        return this.service.get(url).pipe(tap((response) => {
            return response;
        }));
    }

    getBrands() {
        return this.service.get(this.brandUrl).pipe(tap((response) => {
            return response;
        }));
    }

    getTypes() {
        return this.service.get(this.typesUrl).pipe(tap((response) => {
            return response;
        }));
    };
}
