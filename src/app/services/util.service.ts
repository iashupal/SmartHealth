import { Injectable } from '@angular/core';
import { CRYPTO_KEY } from '../../environments/environment';

declare var CryptoJS: any;
// declare var TextEncoder: any;
// declare var TextDecoder: any;

@Injectable()
export class UtilService {

    private CRYPTO_KEY = CRYPTO_KEY;

    constructor() {
    }

    /**
     * get_HMAC_SHA256
     */
    get_HMAC_SHA256(currentObj: Object, currentTime: number): string {
        const cryptoMsgArr = [];
        if (currentObj !== null && Object.keys(currentObj).length !== 0) {
            Object.keys(currentObj).map(key => cryptoMsgArr.push(key + '=' + encodeURIComponent(currentObj[key])));
        }
        cryptoMsgArr.push('current_time=' + encodeURIComponent(currentTime.toString()));
        const cryptoMsg = cryptoMsgArr.join('&');
        console.log('cryptoMsg', cryptoMsg);
        // const encodedKeyArr = new TextEncoder('utf-8').encode(CRYPTO_KEY);
        // const encodedKeyStr = new TextDecoder('utf-8').decode(encodedKeyArr);
        const signature = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(cryptoMsg, CRYPTO_KEY));
        console.log('Final Base64 signature', signature);
        return signature;
    }

}
