import { IncomingMessage } from 'http';
import { parse } from 'url';
import { ParsedRequest } from './types';

export function parseRequest(req: IncomingMessage) {
    console.log('HTTP ' + req.url);
    const { pathname, query } = parse(req.url || '/', true);
    const { fontSize, images, widths, heights, theme, md, showWatermark, pattern, packageManager, packageName, description, style } = (query || {});

    if (Array.isArray(fontSize)) {
        throw new Error('Expected a single fontSize');
    }
    if (Array.isArray(theme)) {
        throw new Error('Expected a single theme');
    }
    if (Array.isArray(style)) {
        throw new Error('Expected a single style');
    }
    if (Array.isArray(pattern)) {
        throw new Error('Expected a single pattern');
    }
    if (Array.isArray(packageManager)) {
        throw new Error('Expected a single package manager');
    }
    if (Array.isArray(packageName)) {
        throw new Error('Expected a single package name');
    }
    if (Array.isArray(description)) {
        throw new Error('Expected a single package name');
    }
    
    const arr = (pathname || '/').slice(1).split('.');
    let extension = '';
    let text = '';
    if (arr.length === 0) {
        text = '';
    } else if (arr.length === 1) {
        text = arr[0];
    } else {
        extension = arr.pop() as string;
        text = arr.join('.');
    }

    const parsedRequest: ParsedRequest = {
        fileType: extension === 'jpeg' ? extension : 'png',
        text: decodeURIComponent(text),
        theme: theme === 'dark' ? 'dark' : 'light',
        style: style === 'style_2' ? 'style_2' : 'style_1',
        md: md === '1' || md === 'true',
        showWatermark: showWatermark === '1' || showWatermark === 'true',
        fontSize: fontSize || '96px',
        pattern: pattern || 'circuitBoard',
        packageManager: packageManager || '',
        packageName: packageName || '',
        description: description || '',
        images: getArray(images),
        widths: getArray(widths),
        heights: getArray(heights),
    };
    parsedRequest.images = getDefaultImages(parsedRequest.images);
    return parsedRequest;
}

function getArray(stringOrArray: string[] | string | undefined): string[] {
    if (typeof stringOrArray === 'undefined') {
        return [];
    } else if (Array.isArray(stringOrArray)) {
        return stringOrArray;
    } else {
        return [stringOrArray];
    }
}

function getDefaultImages(images: string[]): string[] {
    const defaultImage = 'https://laravel.com/img/logomark.min.svg';

    if (!images || !images[0]) {
        return [defaultImage];
    }
    return images;
}
