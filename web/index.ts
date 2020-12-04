import { ParsedRequest, Theme, FileType, Style } from '../api/_lib/types';

const { H, R, copee } = (window as any);
let timeout = -1;

interface ImagePreviewProps {
    src: string;
    onclick: () => void;
    onload: () => void;
    onerror: () => void;
    loading: boolean;
}

const ImagePreview = ({ src, onclick, onload, onerror, loading }: ImagePreviewProps) => {
    const style = {
        filter: loading ? 'blur(5px)' : '',
        opacity: loading ? 0.1 : 1,
    };
    const title = 'Click to copy image URL to clipboard';
    return H('a',
        { className: 'image-wrapper', href: src, onclick },
        H('img',
            { src, onload, onerror, style, title }
        )
    );
}

interface DropdownOption {
    text: string;
    value: string;
}

interface DropdownProps {
    options: DropdownOption[];
    value: string;
    onchange: (val: string) => void;
    small: boolean;
}

const Dropdown = ({ options, value, onchange, small }: DropdownProps) => {
    const wrapper = small ? 'select-wrapper small' : 'select-wrapper';
    const arrow = small ? 'select-arrow small' : 'select-arrow';
    return H('div',
        { className: wrapper },
        H('select',
            { onchange: (e: any) => onchange(e.target.value) },
            options.map(o =>
                H('option',
                    { value: o.value, selected: value === o.value },
                    o.text
                )
            )
        ),
        H('div',
            { className: arrow },
            '▼'
        )
    );
}

interface TextInputProps {
    value: string;
    oninput: (val: string) => void;
}

const TextInput = ({ value, oninput }: TextInputProps) => {
    return H('div',
        { className: 'input-outer-wrapper' },
        H('div',
            { className: 'input-inner-wrapper' },
            H('input',
                { type: 'text', value, oninput: (e: any) => oninput(e.target.value) }
            )
        )
    );
}

interface FieldProps {
    label: string;
    input: any;
}

const Field = ({ label, input }: FieldProps) => {
    return H('div',
        { className: 'field' },
        H('label', 
            H('div', {className: 'field-label'}, label),
            H('div', { className: 'field-value' }, input),
        ),
    );
}

interface ToastProps {
    show: boolean;
    message: string;
}

const Toast = ({ show, message }: ToastProps) => {
    const style = { transform:  show ? 'translate3d(0,-0px,-0px) scale(1)' : '' };
    return H('div',
        { className: 'toast-area' },
        H('div',
            { className: 'toast-outer', style },
            H('div',
                { className: 'toast-inner' },
                H('div',
                    { className: 'toast-message'},
                    message
                )
            )
        ),
    );
}

const packageManagerOptions: DropdownOption[] = [
    {text: 'PHP/Composer', value: 'composer require'},
    {text: 'Node/NPM', value: 'npm install'},
    {text: 'Node/Yarn', value: 'yarn add'},
];

const themeOptions: DropdownOption[] = [
    { text: 'Light', value: 'light' },
    { text: 'Dark', value: 'dark' },
];

const styleOptions: DropdownOption[] = [
    { text: 'Default', value: 'style_1' },
    { text: 'Alternative', value: 'style_2' },
];

const fileTypeOptions: DropdownOption[] = [
    { text: 'PNG', value: 'png' },
    { text: 'JPEG', value: 'jpeg' },
];

let heroPatternOptions: DropdownOption[] = [
    { text: 'anchorsAway', value: 'anchorsAway' },
    { text: 'architect', value: 'architect' },
    { text: 'autumn', value: 'autumn' },
    { text: 'aztec', value: 'aztec' },
    { text: 'bamboo', value: 'bamboo' },
    { text: 'bankNote', value: 'bankNote' },
    { text: 'bathroomFloor', value: 'bathroomFloor' },
    { text: 'bevelCircle', value: 'bevelCircle' },
    { text: 'boxes', value: 'boxes' },
    { text: 'brickWall', value: 'brickWall' },
    { text: 'bubbles', value: 'bubbles' },
    { text: 'cage', value: 'cage' },
    { text: 'charlieBrown', value: 'charlieBrown' },
    { text: 'churchOnSunday', value: 'churchOnSunday' },
    { text: 'circlesAndSquares', value: 'circlesAndSquares' },
    { text: 'circuitBoard', value: 'circuitBoard' },
    { text: 'connections', value: 'connections' },
    { text: 'corkScrew', value: 'corkScrew' },
    { text: 'current', value: 'current' },
    { text: 'curtain', value: 'curtain' },
    { text: 'cutout', value: 'cutout' },
    { text: 'deathStar', value: 'deathStar' },
    { text: 'diagonalLines', value: 'diagonalLines' },
    { text: 'diagonalStripes', value: 'diagonalStripes' },
    { text: 'dominos', value: 'dominos' },
    { text: 'endlessClouds', value: 'endlessClouds' },
    { text: 'eyes', value: 'eyes' },
    { text: 'fallingTriangles', value: 'fallingTriangles' },
    { text: 'fancyRectangles', value: 'fancyRectangles' },
    { text: 'flippedDiamonds', value: 'flippedDiamonds' },
    { text: 'floatingCogs', value: 'floatingCogs' },
    { text: 'floorTile', value: 'floorTile' },
    { text: 'formalInvitation', value: 'formalInvitation' },
    { text: 'fourPointStars', value: 'fourPointStars' },
    { text: 'glamorous', value: 'glamorous' },
    { text: 'graphPaper', value: 'graphPaper' },
    { text: 'groovy', value: 'groovy' },
    { text: 'happyIntersection', value: 'happyIntersection' },
    { text: 'heavyRain', value: 'heavyRain' },
    { text: 'hexagons', value: 'hexagons' },
    { text: 'hideout', value: 'hideout' },
    { text: 'houndstooth', value: 'houndstooth' },
    { text: 'iLikeFood', value: 'iLikeFood' },
    { text: 'intersectingCircles', value: 'intersectingCircles' },
    { text: 'jigsaw', value: 'jigsaw' },
    { text: 'jupiter', value: 'jupiter' },
    { text: 'kiwi', value: 'kiwi' },
    { text: 'leaf', value: 'leaf' },
    { text: 'linesInMotion', value: 'linesInMotion' },
    { text: 'lips', value: 'lips' },
    { text: 'lisbon', value: 'lisbon' },
    { text: 'melt', value: 'melt' },
    { text: 'moroccan', value: 'moroccan' },
    { text: 'morphingDiamonds', value: 'morphingDiamonds' },
    { text: 'overcast', value: 'overcast' },
    { text: 'overlappingCircles', value: 'overlappingCircles' },
    { text: 'overlappingDiamonds', value: 'overlappingDiamonds' },
    { text: 'overlappingHexagons', value: 'overlappingHexagons' },
    { text: 'parkayFloor', value: 'parkayFloor' },
    { text: 'pianoMan', value: 'pianoMan' },
    { text: 'pieFactory', value: 'pieFactory' },
    { text: 'pixelDots', value: 'pixelDots' },
    { text: 'plus', value: 'plus' },
    { text: 'polkaDots', value: 'polkaDots' },
    { text: 'rails', value: 'rails' },
    { text: 'rain', value: 'rain' },
    { text: 'randomShapes', value: 'randomShapes' },
    { text: 'roundedPlusConnected', value: 'roundedPlusConnected' },
    { text: 'signal', value: 'signal' },
    { text: 'skulls', value: 'skulls' },
    { text: 'slantedStars', value: 'slantedStars' },
    { text: 'squares', value: 'squares' },
    { text: 'squaresInSquares', value: 'squaresInSquares' },
    { text: 'stampCollection', value: 'stampCollection' },
    { text: 'steelBeams', value: 'steelBeams' },
    { text: 'stripes', value: 'stripes' },
    { text: 'temple', value: 'temple' },
    { text: 'texture', value: 'texture' },
    { text: 'ticTacToe', value: 'ticTacToe' },
    { text: 'tinyCheckers', value: 'tinyCheckers' },
    { text: 'topography', value: 'topography' },
    { text: 'volcanoLamp', value: 'volcanoLamp' },
    { text: 'wallpaper', value: 'wallpaper' },
    { text: 'wiggle', value: 'wiggle' },
    { text: 'xEquals', value: 'xEquals' },
    { text: 'yyy', value: 'yyy' },
    { text: 'zigZag', value: 'zigZag' },
];

const fontSizeOptions: DropdownOption[] = Array
    .from({ length: 10 })
    .map((_, i) => i * 25)
    .filter(n => n > 0)
    .map(n => ({ text: n + 'px', value: n + 'px' }));

const markdownOptions: DropdownOption[] = [
    { text: 'Plain Text', value: '0' },
    { text: 'Markdown', value: '1' },
];

const watermarkOptions: DropdownOption[] = [
    { text: 'No', value: '0' },
    { text: 'Yes', value: '1' },
];

const imageOptions: DropdownOption[] = [
    { text: 'Laravel Logo', value: 'https://laravel.com/img/logomark.min.svg' }, 
    { text: 'Beyond Code Logo', value: 'https://beyondco.de/img/logo.svg' }, 
    { text: 'PHP Logo', value: 'https://www.php.net/images/logos/new-php-logo.svg' }, 
    { text: 'Alternative PHP Logo', value: 'https://www.php.net/images/logos/php-logo.svg' }, 
    { text: 'academic-cap', value: 'academic-cap' },
    { text: 'adjustments', value: 'adjustments' },
    { text: 'annotation', value: 'annotation' },
    { text: 'archive', value: 'archive' },
    { text: 'arrow-circle-down', value: 'arrow-circle-down' },
    { text: 'arrow-circle-left', value: 'arrow-circle-left' },
    { text: 'arrow-circle-right', value: 'arrow-circle-right' },
    { text: 'arrow-circle-up', value: 'arrow-circle-up' },
    { text: 'arrow-down', value: 'arrow-down' },
    { text: 'arrow-left', value: 'arrow-left' },
    { text: 'arrow-narrow-down', value: 'arrow-narrow-down' },
    { text: 'arrow-narrow-left', value: 'arrow-narrow-left' },
    { text: 'arrow-narrow-right', value: 'arrow-narrow-right' },
    { text: 'arrow-narrow-up', value: 'arrow-narrow-up' },
    { text: 'arrow-right', value: 'arrow-right' },
    { text: 'arrow-up', value: 'arrow-up' },
    { text: 'arrows-expand', value: 'arrows-expand' },
    { text: 'at-symbol', value: 'at-symbol' },
    { text: 'backspace', value: 'backspace' },
    { text: 'badge-check', value: 'badge-check' },
    { text: 'ban', value: 'ban' },
    { text: 'beaker', value: 'beaker' },
    { text: 'bell', value: 'bell' },
    { text: 'book-open', value: 'book-open' },
    { text: 'bookmark-alt', value: 'bookmark-alt' },
    { text: 'bookmark', value: 'bookmark' },
    { text: 'briefcase', value: 'briefcase' },
    { text: 'cake', value: 'cake' },
    { text: 'calculator', value: 'calculator' },
    { text: 'calendar', value: 'calendar' },
    { text: 'camera', value: 'camera' },
    { text: 'cash', value: 'cash' },
    { text: 'chart-bar', value: 'chart-bar' },
    { text: 'chart-pie', value: 'chart-pie' },
    { text: 'chart-square-bar', value: 'chart-square-bar' },
    { text: 'chat-alt-2', value: 'chat-alt-2' },
    { text: 'chat-alt', value: 'chat-alt' },
    { text: 'chat', value: 'chat' },
    { text: 'check-circle', value: 'check-circle' },
    { text: 'check', value: 'check' },
    { text: 'chevron-double-down', value: 'chevron-double-down' },
    { text: 'chevron-double-left', value: 'chevron-double-left' },
    { text: 'chevron-double-right', value: 'chevron-double-right' },
    { text: 'chevron-double-up', value: 'chevron-double-up' },
    { text: 'chevron-down', value: 'chevron-down' },
    { text: 'chevron-left', value: 'chevron-left' },
    { text: 'chevron-right', value: 'chevron-right' },
    { text: 'chevron-up', value: 'chevron-up' },
    { text: 'chip', value: 'chip' },
    { text: 'clipboard-check', value: 'clipboard-check' },
    { text: 'clipboard-copy', value: 'clipboard-copy' },
    { text: 'clipboard-list', value: 'clipboard-list' },
    { text: 'clipboard', value: 'clipboard' },
    { text: 'clock', value: 'clock' },
    { text: 'cloud-download', value: 'cloud-download' },
    { text: 'cloud-upload', value: 'cloud-upload' },
    { text: 'cloud', value: 'cloud' },
    { text: 'code', value: 'code' },
    { text: 'cog', value: 'cog' },
    { text: 'collection', value: 'collection' },
    { text: 'color-swatch', value: 'color-swatch' },
    { text: 'credit-card', value: 'credit-card' },
    { text: 'cube-transparent', value: 'cube-transparent' },
    { text: 'cube', value: 'cube' },
    { text: 'currency-bangladeshi', value: 'currency-bangladeshi' },
    { text: 'currency-dollar', value: 'currency-dollar' },
    { text: 'currency-euro', value: 'currency-euro' },
    { text: 'currency-pound', value: 'currency-pound' },
    { text: 'currency-rupee', value: 'currency-rupee' },
    { text: 'currency-yen', value: 'currency-yen' },
    { text: 'cursor-click', value: 'cursor-click' },
    { text: 'database', value: 'database' },
    { text: 'desktop-computer', value: 'desktop-computer' },
    { text: 'device-mobile', value: 'device-mobile' },
    { text: 'device-tablet', value: 'device-tablet' },
    { text: 'document-add', value: 'document-add' },
    { text: 'document-download', value: 'document-download' },
    { text: 'document-duplicate', value: 'document-duplicate' },
    { text: 'document-remove', value: 'document-remove' },
    { text: 'document-report', value: 'document-report' },
    { text: 'document-search', value: 'document-search' },
    { text: 'document-text', value: 'document-text' },
    { text: 'document', value: 'document' },
    { text: 'dots-circle-horizontal', value: 'dots-circle-horizontal' },
    { text: 'dots-horizontal', value: 'dots-horizontal' },
    { text: 'dots-vertical', value: 'dots-vertical' },
    { text: 'download', value: 'download' },
    { text: 'duplicate', value: 'duplicate' },
    { text: 'emoji-happy', value: 'emoji-happy' },
    { text: 'emoji-sad', value: 'emoji-sad' },
    { text: 'exclamation-circle', value: 'exclamation-circle' },
    { text: 'exclamation', value: 'exclamation' },
    { text: 'external-link', value: 'external-link' },
    { text: 'eye-off', value: 'eye-off' },
    { text: 'eye', value: 'eye' },
    { text: 'fast-forward', value: 'fast-forward' },
    { text: 'film', value: 'film' },
    { text: 'filter', value: 'filter' },
    { text: 'finger-print', value: 'finger-print' },
    { text: 'fire', value: 'fire' },
    { text: 'flag', value: 'flag' },
    { text: 'folder-add', value: 'folder-add' },
    { text: 'folder-download', value: 'folder-download' },
    { text: 'folder-open', value: 'folder-open' },
    { text: 'folder-remove', value: 'folder-remove' },
    { text: 'folder', value: 'folder' },
    { text: 'gift', value: 'gift' },
    { text: 'globe-alt', value: 'globe-alt' },
    { text: 'globe', value: 'globe' },
    { text: 'hand', value: 'hand' },
    { text: 'hashtag', value: 'hashtag' },
    { text: 'heart', value: 'heart' },
    { text: 'home', value: 'home' },
    { text: 'identification', value: 'identification' },
    { text: 'inbox-in', value: 'inbox-in' },
    { text: 'inbox', value: 'inbox' },
    { text: 'information-circle', value: 'information-circle' },
    { text: 'key', value: 'key' },
    { text: 'library', value: 'library' },
    { text: 'light-bulb', value: 'light-bulb' },
    { text: 'lightning-bolt', value: 'lightning-bolt' },
    { text: 'link', value: 'link' },
    { text: 'location-marker', value: 'location-marker' },
    { text: 'lock-closed', value: 'lock-closed' },
    { text: 'lock-open', value: 'lock-open' },
    { text: 'login', value: 'login' },
    { text: 'logout', value: 'logout' },
    { text: 'mail-open', value: 'mail-open' },
    { text: 'mail', value: 'mail' },
    { text: 'map', value: 'map' },
    { text: 'menu-alt-1', value: 'menu-alt-1' },
    { text: 'menu-alt-2', value: 'menu-alt-2' },
    { text: 'menu-alt-3', value: 'menu-alt-3' },
    { text: 'menu-alt-4', value: 'menu-alt-4' },
    { text: 'menu', value: 'menu' },
    { text: 'microphone', value: 'microphone' },
    { text: 'minus-circle', value: 'minus-circle' },
    { text: 'minus-sm', value: 'minus-sm' },
    { text: 'minus', value: 'minus' },
    { text: 'moon', value: 'moon' },
    { text: 'music-note', value: 'music-note' },
    { text: 'newspaper', value: 'newspaper' },
    { text: 'office-building', value: 'office-building' },
    { text: 'paper-airplane', value: 'paper-airplane' },
    { text: 'paper-clip', value: 'paper-clip' },
    { text: 'pause', value: 'pause' },
    { text: 'pencil-alt', value: 'pencil-alt' },
    { text: 'pencil', value: 'pencil' },
    { text: 'phone-incoming', value: 'phone-incoming' },
    { text: 'phone-missed-call', value: 'phone-missed-call' },
    { text: 'phone-outgoing', value: 'phone-outgoing' },
    { text: 'phone', value: 'phone' },
    { text: 'photograph', value: 'photograph' },
    { text: 'play', value: 'play' },
    { text: 'plus-circle', value: 'plus-circle' },
    { text: 'plus-sm', value: 'plus-sm' },
    { text: 'plus', value: 'plus' },
    { text: 'presentation-chart-bar', value: 'presentation-chart-bar' },
    { text: 'presentation-chart-line', value: 'presentation-chart-line' },
    { text: 'printer', value: 'printer' },
    { text: 'puzzle', value: 'puzzle' },
    { text: 'qrcode', value: 'qrcode' },
    { text: 'question-mark-circle', value: 'question-mark-circle' },
    { text: 'receipt-refund', value: 'receipt-refund' },
    { text: 'receipt-tax', value: 'receipt-tax' },
    { text: 'refresh', value: 'refresh' },
    { text: 'reply', value: 'reply' },
    { text: 'rewind', value: 'rewind' },
    { text: 'rss', value: 'rss' },
    { text: 'save-as', value: 'save-as' },
    { text: 'save', value: 'save' },
    { text: 'scale', value: 'scale' },
    { text: 'scissors', value: 'scissors' },
    { text: 'search-circle', value: 'search-circle' },
    { text: 'search', value: 'search' },
    { text: 'selector', value: 'selector' },
    { text: 'server', value: 'server' },
    { text: 'share', value: 'share' },
    { text: 'shield-check', value: 'shield-check' },
    { text: 'shield-exclamation', value: 'shield-exclamation' },
    { text: 'shopping-bag', value: 'shopping-bag' },
    { text: 'shopping-cart', value: 'shopping-cart' },
    { text: 'sort-ascending', value: 'sort-ascending' },
    { text: 'sort-descending', value: 'sort-descending' },
    { text: 'sparkles', value: 'sparkles' },
    { text: 'speakerphone', value: 'speakerphone' },
    { text: 'star', value: 'star' },
    { text: 'status-offline', value: 'status-offline' },
    { text: 'status-online', value: 'status-online' },
    { text: 'stop', value: 'stop' },
    { text: 'sun', value: 'sun' },
    { text: 'support', value: 'support' },
    { text: 'switch-horizontal', value: 'switch-horizontal' },
    { text: 'switch-vertical', value: 'switch-vertical' },
    { text: 'table', value: 'table' },
    { text: 'tag', value: 'tag' },
    { text: 'template', value: 'template' },
    { text: 'terminal', value: 'terminal' },
    { text: 'thumb-down', value: 'thumb-down' },
    { text: 'thumb-up', value: 'thumb-up' },
    { text: 'ticket', value: 'ticket' },
    { text: 'translate', value: 'translate' },
    { text: 'trash', value: 'trash' },
    { text: 'trending-down', value: 'trending-down' },
    { text: 'trending-up', value: 'trending-up' },
    { text: 'truck', value: 'truck' },
    { text: 'upload', value: 'upload' },
    { text: 'user-add', value: 'user-add' },
    { text: 'user-circle', value: 'user-circle' },
    { text: 'user-group', value: 'user-group' },
    { text: 'user-remove', value: 'user-remove' },
    { text: 'user', value: 'user' },
    { text: 'users', value: 'users' },
    { text: 'variable', value: 'variable' },
    { text: 'video-camera', value: 'video-camera' },
    { text: 'view-boards', value: 'view-boards' },
    { text: 'view-grid-add', value: 'view-grid-add' },
    { text: 'view-grid', value: 'view-grid' },
    { text: 'view-list', value: 'view-list' },
    { text: 'volume-off', value: 'volume-off' },
    { text: 'volume-up', value: 'volume-up' },
    { text: 'wifi', value: 'wifi' },
    { text: 'x-circle', value: 'x-circle' },
    { text: 'x', value: 'x' },
    { text: 'zoom-in', value: 'zoom-in' },
    { text: 'zoom-out', value: 'zoom-out' },
];

const widthOptions = [
    { text: 'width', value: 'auto' },
    { text: '50', value: '50' },
    { text: '100', value: '100' },
    { text: '150', value: '150' },
    { text: '200', value: '200' },
    { text: '250', value: '250' },
    { text: '300', value: '300' },
    { text: '350', value: '350' },
    { text: '350', value: '350' },
    { text: '400', value: '400' },
    { text: '450', value: '450' },
    { text: '500', value: '500' },
    { text: '550', value: '550' },
    { text: '600', value: '600' },
    { text: '650', value: '650' },
    { text: '700', value: '700' },
    { text: '750', value: '750' },
    { text: '800', value: '800' },
];

const heightOptions = [
    { text: 'height', value: 'auto' },
    { text: '50', value: '50' },
    { text: '100', value: '100' },
    { text: '150', value: '150' },
    { text: '200', value: '200' },
    { text: '250', value: '250' },
    { text: '300', value: '300' },
    { text: '350', value: '350' },
    { text: '350', value: '350' },
    { text: '400', value: '400' },
    { text: '450', value: '450' },
    { text: '500', value: '500' },
    { text: '550', value: '550' },
    { text: '600', value: '600' },
    { text: '650', value: '650' },
    { text: '700', value: '700' },
    { text: '750', value: '750' },
    { text: '800', value: '800' },
];

interface AppState extends ParsedRequest {
    loading: boolean;
    showToast: boolean;
    messageToast: string;
    selectedImageIndex: number;
    widths: string[];
    heights: string[];
    overrideUrl: URL | null;
}

type SetState = (state: Partial<AppState>) => void;

const App = (_: any, state: AppState, setState: SetState) => {
    const setLoadingState = (newState: Partial<AppState>) => {
        window.clearTimeout(timeout);
        if (state.overrideUrl && state.overrideUrl !== newState.overrideUrl) {
            newState.overrideUrl = state.overrideUrl;
        }
        if (newState.overrideUrl) {
            timeout = window.setTimeout(() => setState({ overrideUrl: null }), 200);
        }

        setState({ ...newState, loading: true });
    };
    const {
        fileType = 'png',
        fontSize = '100px',
        theme = 'light',
        md = true,
        text = 'My Package',
        packageManager = packageManagerOptions[0].value,
        packageName = 'vendor/my-awesome-package',
        images = [imageOptions[0].value],
        widths=[],
        heights=[],
        showWatermark = true,
        style = 'style_1',
        pattern = 'architect',
        description = 'This is why it\'s awesome',
        showToast = false,
        messageToast = '',
        loading = true,
        selectedImageIndex = 0,
        overrideUrl = null,
    } = state;
    const mdValue = md ? '1' : '0';
    const watermarkValue = showWatermark ? '1' : '0';
    const url = new URL(window.location.origin);
    url.pathname = `${encodeURIComponent(text)}.${fileType}`;
    url.searchParams.append('theme', theme);
    url.searchParams.append('packageManager', packageManager);
    url.searchParams.append('packageName', packageName);
    url.searchParams.append('pattern', pattern);
    url.searchParams.append('style', style);
    url.searchParams.append('description', description);
    url.searchParams.append('md', mdValue);
    url.searchParams.append('showWatermark', watermarkValue);
    url.searchParams.append('fontSize', fontSize);
    for (let image of images) {
        url.searchParams.append('images', image);
    }
    for (let width of widths) {
        url.searchParams.append('widths', width);
    }
    for (let height of heights) {
        url.searchParams.append('heights', height);
    }

    return H('div',
        { className: 'split' },
        H('div',
            { className: 'pull-left' },
            H('div',
                H(Field, {
                    label: 'Theme',
                    input: H(Dropdown, {
                        options: themeOptions,
                        value: theme,
                        onchange: (val: Theme) => {
                            let clone = [...images];
                            clone[0] = imageOptions[selectedImageIndex].value;
                            setLoadingState({ theme: val, images: clone });
                        }
                    })
                }),
                H(Field, {
                    label: 'Style',
                    input: H(Dropdown, {
                        options: styleOptions,
                        value: style,
                        onchange: (val: Style) => {
                            setLoadingState({ style: val });
                        }
                    })
                }),
                H(Field, {
                    label: 'Background Pattern',
                    input: H(Dropdown, {
                        options: heroPatternOptions,
                        value: pattern,
                        onchange: (val: string) => {
                            setLoadingState({ pattern: val });
                        }
                    })
                }),
                H(Field, {
                    label: 'File Type',
                    input: H(Dropdown, {
                        options: fileTypeOptions,
                        value: fileType,
                        onchange: (val: FileType) => setLoadingState({ fileType: val })
                    })
                }),
                H(Field, {
                    label: 'Font Size',
                    input: H(Dropdown, {
                        options: fontSizeOptions,
                        value: fontSize,
                        onchange: (val: string) => setLoadingState({ fontSize: val })
                    })
                }),
                H(Field, {
                    label: 'Text Type',
                    input: H(Dropdown, {
                        options: markdownOptions,
                        value: mdValue,
                        onchange: (val: string) => setLoadingState({ md: val === '1' })
                    })
                }),
                H(Field, {
                    label: 'Text Input',
                    input: H(TextInput, {
                        value: text,
                        oninput: (val: string) => {
                            setLoadingState({ text: val, overrideUrl: url });
                        }
                    })
                }),
                H(Field, {
                    label: 'Short Description',
                    input: H(TextInput, {
                        value: description,
                        oninput: (val: string) => {
                            setLoadingState({ description: val, overrideUrl: url });
                        }
                    })
                }),
                H(Field, {
                    label: 'Package Manager',
                    input: H(Dropdown, {
                        options: packageManagerOptions,
                        value: packageManager,
                        onchange: (val: string) => setLoadingState({ packageManager: val, overrideUrl: url })
                    })
                }),
                H(Field, {
                    label: 'Package Name',
                    input: H(TextInput, {
                        value: packageName,
                        oninput: (val: string) => {
                            setLoadingState({ packageName: val, overrideUrl: url });
                        }
                    })
                }),
                H(Field, {
                    label: 'Image',
                    input: H('div',
                        H(Dropdown, {
                            options: imageOptions,
                            value: imageOptions[selectedImageIndex].value,
                            onchange: (val: string) =>  {
                                let clone = [...images];
                                clone[0] = val;
                                const selected = imageOptions.map(o => o.value).indexOf(val);
                                setLoadingState({ images: clone, selectedImageIndex: selected });
                            }
                        }),
                        H('div',
                            { className: 'field-flex' },
                            H(Dropdown, {
                                options: widthOptions,
                                value: widths[0],
                                small: true,
                                onchange: (val: string) =>  {
                                    let clone = [...widths];
                                    clone[0] = val;
                                    setLoadingState({ widths: clone });
                                }
                            }),
                            H(Dropdown, {
                                options: heightOptions,
                                value: heights[0],
                                small: true,
                                onchange: (val: string) =>  {
                                    let clone = [...heights];
                                    clone[0] = val;
                                    setLoadingState({ heights: clone });
                                }
                            })
                        )
                    ),
                }),
                H(Field, {
                    label: 'Watermark',
                    input: H(Dropdown, {
                        options: watermarkOptions,
                        value: watermarkValue,
                        onchange: (val: string) => setLoadingState({ showWatermark: val === '1', overrideUrl: url })
                    })
                }),
            )
        ),
        H('div',
            { className: 'pull-right' },
            H(ImagePreview, {
                src: overrideUrl ? overrideUrl.href : url.href,
                loading: loading,
                onload: () => setState({ loading: false }),
                onerror: () => {
                    setState({ showToast: true, messageToast: 'Oops, an error occurred' });
                    setTimeout(() => setState({ showToast: false }), 2000);
                },
                onclick: (e: Event) => {
                    e.preventDefault();
                    const success = copee.toClipboard(url.href);
                    if (success) {
                        setState({ showToast: true, messageToast: 'Copied image URL to clipboard' });
                        setTimeout(() => setState({ showToast: false }), 3000);
                    } else {
                        window.open(url.href, '_blank');
                    }
                    return false;
                }
            })
        ),
        H(Toast, {
            message: messageToast,
            show: showToast,
        })
    );
};

R(H(App), document.getElementById('app'));
