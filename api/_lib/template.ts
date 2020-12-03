
import marked from 'marked';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest, Style, Theme } from './types';
import * as hero from 'hero-patterns';
import fs from 'fs';

const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

function getCss(theme: string, pattern: string, fontSize: string, customForeground: string, customBackground: string) {
    let foreground = '#000000';
    let background = '#ffffff';
    let opacity = 0.07;

    if (theme === 'dark') {
        foreground = '#ffffff';
        background = '#000000';
        opacity = 0.15;
    }

    if (theme === 'custom') {
        foreground = customForeground;
        background = customBackground;
    }

    return `
    body {
        font-family: Inter;
        background-color: ${background};
        background-image: ${hero[pattern](foreground, opacity)}
    }

    code {
        color: ${foreground};
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
        font-size: ${sanitizeHtml(fontSize)};
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
        color: ${foreground};
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

function getAlternativeHtml(parsedReq: ParsedRequest) {
    const { text, theme, md, fontSize, images, widths, heights, pattern, packageName, description, style, showWatermark, customForeground, customBackground } = parsedReq;

    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Space+Mono&display=swap" rel="stylesheet">

    <style>
        ${getCss(theme, pattern, fontSize, customForeground, customBackground)}
    </style>
    <body class="h-screen w-screen flex items-center justify-center text-center">
        ${images.map((img, i) =>
            getImage(img, widths[i], heights[i], style)
        ).join('')}
        <div class="relative z-10">
            <div class="heading pb-8">${emojify(
        md ? marked(text) : sanitizeHtml(text)
    )}
            </div>
            ${getDescription(description)}
            <code>composer require ${sanitizeHtml(packageName)}</code>
        </div>
        ${showWatermark ? getWatermark(theme) : ''}
    </body>
</html>`;
}

function getWatermark(theme: Theme) {
    if (theme === 'dark') {
        return `<div class="absolute bottom-0 right-0 opacity-25 text-2xl text-white p-8">Generated using banners.beyondco.de</div>`
    } else {
        return `<div class="absolute bottom-0 right-0 opacity-50 text-2xl text-black p-8">Generated using banners.beyondco.de</div>`
    }
}

export function getHtml(parsedReq: ParsedRequest) {
    const { text, theme, md, fontSize, images, widths, heights, pattern, packageName, description, style, showWatermark, customForeground, customBackground } = parsedReq;

    if (style === 'style_2') {
        return getAlternativeHtml(parsedReq);
    }

    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Space+Mono&display=swap" rel="stylesheet">

    <style>
        ${getCss(theme, pattern, fontSize, customForeground, customBackground)}
    </style>
    <body class="h-screen w-screen flex items-center justify-center text-center">
        <div>
            <div class="flex items-center justify-center">
                ${images.map((img, i) =>
                    getImage(img, widths[i], heights[i], style)
                ).join('')}
            </div>
            <div class="heading py-12">${emojify(
                md ? marked(text) : sanitizeHtml(text)
            )}
            </div>
            ${getDescription(description)}
            <code>composer require ${sanitizeHtml(packageName)}</code>
            ${showWatermark ? getWatermark(theme) : ''}
        </div>
    </body>
</html>`;
}

function getImage(src: string, width ='225', height = '225', style: Style) {
    const filename = `${__dirname}/../../node_modules/heroicons/outline/${sanitizeHtml(src)}.svg`;

    if (fs.existsSync(filename)) {
        const iconContent = fs.readFileSync(filename).toString();

        if (style === 'style_2') {
            return iconContent.replace('<svg ',`<svg
                style="width: ${sanitizeHtml(width)}px; height: ${sanitizeHtml(height)}px;"
                class="opacity-50 absolute top-0 right-0 -mr-12 -mt-12 text-laravel -rotate-12 transform"
            `);
        }
        return iconContent.replace('<svg ', `<svg 
        style="width: ${sanitizeHtml(width)}px; height: ${sanitizeHtml(height)}px;"
        class="text-laravel -mt-24" `);
    }

    if (style === 'style_2') {
        return `<img
            class="opacity-50 absolute top-0 right-0 -mr-12 -mt-12 text-laravel -rotate-12 transform"
            alt="Generated Image"
            src="${sanitizeHtml(src)}"
            width="${sanitizeHtml(width)}"
            height="${sanitizeHtml(height)}"
        />`
    }
    return `<img
        class="logo"
        alt="Generated Image"
        src="${sanitizeHtml(src)}"
        width="${sanitizeHtml(width)}"
        height="${sanitizeHtml(height)}"
    />`
}