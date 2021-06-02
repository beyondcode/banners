import { IncomingMessage } from 'http';
import { parse } from 'url';
import { ParsedRequest } from './types';

export function parseRequest(req: IncomingMessage) {
    console.log('HTTP ' + req.url);
    const { pathname, query } = parse(req.url || '/', true);
    const { packageName, description } = (query || {});

    if (Array.isArray(packageName)) {
        throw new Error('Expected a single package name');
    }
    if (Array.isArray(description)) {
        throw new Error('Expected a single package name');
    }
    
    const arr = (pathname || '/').slice(1).split('.');

    let text = '';

    if (arr.length === 0) {
        text = '';
    } else if (arr.length === 1) {
        text = arr[0];
    } else {
        text = arr.join('.');
    }

    const parsedRequest: ParsedRequest = {
        text: decodeURIComponent(text),
        packageName: packageName || '',
        description: description || '',
        images: 'lightning-bolt',
    };
    return parsedRequest;
}

