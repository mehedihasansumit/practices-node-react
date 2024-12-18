export function detectExtensionByDOM() {
    const extensionIndicators = [
        'chrome-extension', // URLs injected by Chrome extensions
        '__REACT_DEVTOOLS_GLOBAL_HOOK__', // React Developer Tools
        '__VUE_DEVTOOLS_GLOBAL_HOOK__', // Vue Developer Tools
    ];
    console.log({ window })
    return extensionIndicators.some((indicator) => {
        return !!window[indicator] || document.querySelector(`[src*="${indicator}"]`);
    });
}


export function detectExtensionByJSChanges() {
    const originalQuerySelector = document.querySelector;
    try {
        // console.log({ originalQuerySelector, second: document.querySelector })
        document.querySelector = function () { };
        if (document.querySelector !== originalQuerySelector) {
            console.log('Potential extension detected via JavaScript modification.');
            return true;
        }
    } finally {
        document.querySelector = originalQuerySelector; // Restore original
    }
    return false;
}