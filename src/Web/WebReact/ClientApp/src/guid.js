import { uuid } from 'uuidv4';
export class Guid {
    constructor(){
        this.newGuid=this.newGuid
    }
    // static newGuid() {
    //     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    //         var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r&0x3|0x8);
    //         return v.toString(16);
    //     });
    // }

    static newGuid() {
        
            var r = uuid();
            return r;
        
    }

    
}
