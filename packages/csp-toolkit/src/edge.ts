import { HashAlgorithms } from "./types";
// import crypto from "crypto";

/**
 * Take a string and generate a hash
 * @param str - The string to hash
 * @param algorithm - The algorithm to use
 * @returns A hash of your string
 */
export const generateHash = async (str: string, algorithm: HashAlgorithms) => {
    // Convert the string to a Uint8Array
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    
    // Map Node.js hash algorithms to Web Crypto algorithms
    const webCryptoAlgorithms: Record<HashAlgorithms, string> = {
        'sha256': 'SHA-256',
        'sha384': 'SHA-384',
        'sha512': 'SHA-512'
    };

    // Generate the hash
    const hashBuffer = await crypto.subtle.digest(webCryptoAlgorithms[algorithm], data);
    
    // Convert the hash to base64
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return btoa(hashHex);
};

/**
 * Generates a nonce. To be used server side, generate one per request
 * @returns A nonsensical string
 */
export const generateNonce = () => {
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
    return nonce;
}

export * from "./types";