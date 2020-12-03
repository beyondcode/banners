export type FileType = 'png' | 'jpeg';
export type Theme = 'light' | 'dark' | 'custom';
export type Style = 'style_1' | 'style_2';

export interface ParsedRequest {
    fileType: FileType;
    text: string;
    theme: Theme;
    style: Style;
    showWatermark: boolean;
    packageName: string;
    description: string;
    pattern: string;
    md: boolean;
    fontSize: string;
    customForeground: string;
    customBackground: string;
    images: string[];
    widths: string[];
    heights: string[];
}
