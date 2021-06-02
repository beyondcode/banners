
import marked from 'marked';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
import * as hero from 'hero-patterns';
import fs from 'fs';

const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

function getCss() {
    const foreground = '#ffffff';
    const background = '#000000';
    const opacity = 0.15;

    return `
    body {
        font-family: Inter;
        background-color: ${background};
        background-image: ${hero.topography(foreground, opacity)}
    }

    code {
        color: #ff2d20;
        font-size: 2vw;
        font-family: 'Space Mono';
        font-weight: bold;
        white-space: pre-wrap;
    }

    code:before, code:after {
        content: '\`';
    }

    .logo-wrapper {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
    }

    .logo {
        margin: 0 75px;
    }

    .spacer {
        margin: 150px;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }
    
    .heading {
        font-size: 100px;
        font-style: normal;
        color: ${foreground};
        font-family: 'Inter', sans-serif;
        font-weight: 800;
        line-height: 1.2;
    }

    .description {
        color: ${foreground};
    }

    .text-laravel {
        color: #ff2d20;
    }
    `;
}

function getDescription(description: string) {
    if (description === '' || description === undefined) {
        return '';
    }

    return  `
    <p class="description mx-auto text-5xl pb-12 max-w-4xl">${sanitizeHtml(description)}</p>
    `
}

function getPackageInformation(packageName: string) {
    if (
        (packageName === '' || packageName === undefined)
    ) {
        return '';
    }

    return `
        <code>${sanitizeHtml('vcapretz.com')}</code>
    `
}

function getAlternativeHtml(parsedReq: ParsedRequest) {
    const { text, images, packageName, description } = parsedReq;

    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Space+Mono&display=swap" rel="stylesheet">

    <style>
        ${getCss()}
    </style>
    <body class="h-screen w-screen flex items-center justify-center text-center">
        ${getImage(images)}
        <div class="relative z-10">
            <div class="heading pb-8">${emojify(
        marked(text)
    )}
            </div>
            ${getDescription(description)}
            ${getPackageInformation(packageName)}
        </div>
    </body>
</html>`;
}

export function getHtml(parsedReq: ParsedRequest) {
    return getAlternativeHtml(parsedReq);
}

function getImage(src: string) {
    const filename = `${__dirname}/../../node_modules/heroicons/outline/${sanitizeHtml(src)}.svg`;

    if (fs.existsSync(filename)) {
        const iconContent = fs.readFileSync(filename).toString();

        return iconContent.replace('<svg ',`<svg
            style="width: ${sanitizeHtml('225')}px; height: ${sanitizeHtml('225')}px;"
            class="opacity-50 absolute top-0 right-0 -mr-12 -mt-12 text-laravel -rotate-12 transform"
        `);
    }

    return `<img
        class="opacity-50 absolute top-0 right-0 -mr-12 -mt-12 text-laravel -rotate-12 transform"
        alt="Generated Image"
        src="${sanitizeHtml(src)}"
        width="${sanitizeHtml('225')}"
        height="${sanitizeHtml('225')}"
    />`
}