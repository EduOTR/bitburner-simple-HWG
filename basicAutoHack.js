/**
 * @param {NS} ns
 */
export async function main(ns) {

    var target = {
        name: ns.args[0],
        moneyThresh: ns.getServerMaxMoney(ns.args[0]) * 0.75,
        securityThresh: ns.getServerMinSecurityLevel(ns.args[0]) + 5,
    };

    var host = {
        name: ns.getHostname(),
        totalRam: ns.getServerMaxRam(ns.getHostname()),
    };

    await exploitTargetServer(ns, target, host);
}



async function exploitTargetServer(ns, target, host) {

    var scriptName;

    if (ns.getServerSecurityLevel(target.name) > target.securityThresh) {
        scriptName = "weaken.js";
    }
    else if (ns.getServerMoneyAvailable(target.name) < target.moneyThresh) {
        scriptName = "grow.js";
    }
    else {
        scriptName = "hack.js";
    }

    var usedRam = ns.getServerUsedRam(host.name);
    var freeRam = host.totalRam - usedRam;
    var scriptRam = ns.getScriptRam(scriptName);
    var numThreads = Math.floor(freeRam / scriptRam);

    if (!numThreads) {
        throw "Insufficient RAM";
    }
    else {
        var processID = ns.exec(scriptName, host.name, numThreads, target.name);
    }
    while (ns.isRunning(processID)) {
        await ns.sleep(25);
    }

    await exploitTargetServer(ns, target, host);
}