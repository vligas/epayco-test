import jose from 'node-jose'
import { sessionSecretKey } from '../config/env'

const keystore = jose.JWK.createKeyStore();
let key: jose.JWK.Key

keystore.generate("oct", 256)
    .then(function (result) {
        key = result;
    });

export const encrypt = (input: any) => {
    return jose.JWE.createEncrypt({ format: 'compact' }, key).update(JSON.stringify(input)).final()
}

export const decrypt = (input: any) => {
    return jose.JWE.createDecrypt(key).decrypt(input).then(result => JSON.parse(result.payload.toString()))
}