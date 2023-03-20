
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { SecurityService } from './securityService';
import { Guid } from '../guid';


export class DataService {
    http=new HttpClient();
    securityService=new SecurityService()


    get(url, params) {
        let options = { };
        this.setHeaders(options);
        return this.http.get(url, options)
            .pipe(
                // retry(3), // retry a failed request up to 3 times
                tap((res) => {
                    return res;
                }),
                catchError(this.handleError)
            );
    }

    postWithId(url, data, params) {
        return this.doPost(url, data, true, params);
    }

    post(url, data, params){
        return this.doPost(url, data, false, params);
    }

    putWithId(url, data, params) {
        return this.doPut(url, data, true, params);
    }

    doPost(url, data, needId, params){
        let options = { };
        this.setHeaders(options, needId);

        return this.http.post(url, data, options)
            .pipe(
                tap((res) => {
                    return res;
                }),
                catchError(this.handleError)
            );
    }
    
    delete(url, params) {
        let options = { };
        this.setHeaders(options);

        console.log('data.service deleting');

        this.http.delete(url, options)
            .subscribe((res) => {console.log('deleted');
        });
    }

    handleError(error) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('Client side network error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error('Backend - ' +
                `status: ${error.status}, ` +
                `statusText: ${error.statusText}, ` +
                `message: ${error.error.message}`);
        }

        // return an observable with a user-facing error message
        return throwError(error || 'server error');
    }

    doPut(url, data, needId, params) {
        let options = { };
        this.setHeaders(options, needId);
       
        return this.http.put(url, data, options)
            .pipe(
                tap((res) => {
                    return res;
                }),
                catchError(this.handleError)
            );
    }

    setHeaders(options, needId){
        if (needId && this.securityService) {
            options["headers"] = new HttpHeaders()
                .append('authorization', 'Bearer ' + this.securityService.GetToken())
                .append('x-requestid', Guid.newGuid);
        }   
        else if (this.securityService) {
            options["headers"] = new HttpHeaders()
                .append('authorization', 'Bearer ' + this.securityService.GetToken());
        }
    }

    // setHeaders(options, needId){
    //     if (needId && this.securityService) {
    //         options["headers"] = new HttpHeaders()
    //             .append('authorization', 'Bearer ' + this.securityService.GetToken())
    //             .append('x-requestid', Guid.newGuid);
    //     }
    //     else if (this.securityService) {
    //         options["headers"] = new HttpHeaders()
    //             .append('authorization', 'Bearer ' + this.securityService.GetToken());
    //     }
    // }
}
