import uuid from 'react-native-uuid';
import { AttNetworkRequest, AttNetworkResponseResolve, SignedAttRequest } from './index.d'
import { AlgorithmUrls } from './classes/AlgorithmUrls';
import URLParse from 'url-parse';

export function assemblyParams(att: SignedAttRequest, algorithmUrls?: AlgorithmUrls) {
    const primusMpcUrl = algorithmUrls? algorithmUrls.primusMpcUrl : "";
    const primusProxyUrl = algorithmUrls? algorithmUrls.primusProxyUrl : "";
    const proxyUrl = algorithmUrls? algorithmUrls.proxyUrl : "";
    let padoUrl = primusProxyUrl;
    let modelType = "proxytls";
    const { attRequest: { request, responseResolves, attMode, userAddress, appId, additionParams, sslCipher }, appSignature } = att
    let host = new URLParse(request.url).host; // UUUU
    const requestid = uuid.v4();
    if (attMode?.algorithmType === "mpctls") {
        padoUrl = primusMpcUrl;
        modelType = "mpctls"
    }
    let timestamp = (+ new Date()).toString();
    const attestationParams = {
        source: "source", // not empty
        requestid,
        padoUrl,
        proxyUrl,
        getdatatime: timestamp,
        credVersion: "1.0.5",
        modelType, // one of [mpctls, proxytls]
        user: {
            userid: "0",
            address: userAddress,
            token: "",
        },
        authUseridHash: "",
        appParameters: {
            appId: appId,
            appSignParameters: JSON.stringify(att.attRequest),
            appSignature: appSignature,
            additionParams: additionParams || ''
        },
        reqType: "web",
        host,
        requests: assemblyRequest(request),
        responses: assemblyResponse(responseResolves),
        templateId: "",
        padoExtensionVersion: "0.3.21",
        cipher: sslCipher,
    };
    return attestationParams;
}

function assemblyRequest(request: AttNetworkRequest) {
    let { url, header, method, body } = request;
    const formatRequest = {
        url,
        method,
        headers: { ...header, 'Accept-Encoding': 'identity' },
        body,
    }
    return [formatRequest]
}

function assemblyResponse(responseResolves: AttNetworkResponseResolve[]) {
    const subconditions = responseResolves.map(rR => {
        const { keyName, parsePath } = rR
        return {
            field: parsePath,
            reveal_id: keyName,
            op: "REVEAL_STRING",
            type: "FIELD_REVEAL"
        }
    })
    const formatResponse = {
        conditions: {
            type: "CONDITION_EXPANSION",
            op: "&",
            subconditions
        }
    }
    return [formatResponse];
}

