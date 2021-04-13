; // bundle: page___1fef796ba7d7afcefb1b410d251fbb63_m
; // files: common/deviceMeta.js

; // common/deviceMeta.js
var Roblox = Roblox || {};
Roblox.DeviceMeta = function() {
    var t = document.querySelector('meta[name="device-meta"]');
    if (t === null) {
        console.debug("Error loading device information from meta tag - please check if meta tag is present");
        return
    }
    var n = t.dataset || {},
        i = {
            android: "android",
            ios: "ios",
            xbox: "xbox",
            uwp: "uwp",
            amazon: "amazon",
            win32: "win32",
            universalapp: "universalApp",
            unknown: "unknown"
        },
        r = {
            computer: "computer",
            tablet: "tablet",
            phone: "phone",
            console: "console"
        };
    return function() {
        return {
            deviceType: r[n.deviceType] || "",
            appType: i[n.appType] || "",
            isInApp: n.isInApp === "true",
            isDesktop: n.isDesktop === "true",
            isPhone: n.isPhone === "true",
            isTablet: n.isTablet === "true",
            isConsole: n.isConsole === "true",
            isAndroidApp: n.isAndroidApp === "true",
            isIosApp: n.isIosApp === "true",
            isUWPApp: n.isUwpApp === "true",
            isXboxApp: n.isXboxApp === "true",
            isAmazonApp: n.isAmazonApp === "true",
            isWin32App: n.isWin32App === "true",
            isStudio: n.isStudio === "true",
            isIosDevice: n.isIosDevice === "true",
            isAndroidDevice: n.isAndroidDevice === "true",
            isUniversalApp: n.isUniversalApp === "true"
        }
    }
}();