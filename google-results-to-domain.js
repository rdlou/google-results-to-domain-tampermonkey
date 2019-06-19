// ==UserScript==
// @name         Copy Google Results Domain
// @include      https://www.google.tld/*
// @run-at       document-start
// @grant GM_setClipboard
// ==/UserScript==


//Majority of this has been taken from https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string
function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    hostname = hostname.split(' ')[0];

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    if (hostname.includes("www.") == true) {
    hostname = hostname.split('www.')[1]
    }

    return hostname;
}

window.onload = function(){
    if (location.href.match(/[#&?]q=/)) {
        // get all results in an array
        var links = document.querySelectorAll('.r cite');
        //var index = 1
        links.forEach(function(entry, index) {
            console.log(index + 1, extractHostname(entry.innerHTML));
            index += 1
        });
        window.addEventListener('keydown', function(e) {
            var digit = e.keyCode - 48;
            //I'm aware this next section is messy and unefficient. Especially the linkIndex +=100 haha. But, lunchtime project...
            var linkIndex = 1
            links.forEach(function(entry){
                if (linkIndex == digit){
                    var domain = extractHostname(entry.innerHTML);
                    GM_setClipboard (domain);
                    console.log("Copied entry ", digit, " - " , domain)
                    linkIndex +=100
                }else {
                    linkIndex += 1
                }
            });
        });
    };
};
