

export const utils = {
    isMobileDevice
}

function isMobileDevice(){
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}