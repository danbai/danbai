var blocked      = ["steamcommunity.com",];
var proxyServer  = "PROXY fpn-hk.vpc.kr:20452";
console.log('aaaaaaaaaaaaa');
function FindProxyForURL(url, host) {
    console.log('bbbbbbbbbb');
        return proxyServer;
}
