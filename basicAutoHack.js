/**
 * @param {import("../").NS} ns 
 */
export function main(ns) {
    
    var target = {
        name: ns.args[0],
        moneyThreshold: ns.getServerMaxMoney(ns.args[0]) * 0.75,
        securityThreshold: ns.getServerMinSecurityLevel(ns.args[0]) + 5,
    };

    var host = {
        name: ns.getHostname(),
        totalRam: ns.getServerMaxRam(ns.getHostname()),
    };
    
    ns.spawn("exploitTargetServer.js", 1, [target.name, target.moneyThreshold, target.securityThreshold, host.name, host.totalRam]);
}