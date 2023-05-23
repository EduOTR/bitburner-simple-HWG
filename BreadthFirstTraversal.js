/**
 * @param {import("../").NS} ns 
 */
export function main(ns) {
    traverse(ns, ns.getHostname())
}


/**
 * @param {import("../").NS} ns 
 */
function traverse(ns, targetName) {
    var servers = ns.scan(targetName)
    ns.tprint(servers)

    for(let server in servers) {
        if (!ns.hasRootAccess(server)) {
            ns.exec("crack.js", ns.getHostname(), 1, server)
        }

        
        for(let fileName in [
            "basicAutoHack.js",
            "exploitTargetServer.js",
            "grow.js",
            "weaken.js",
            "hack.js"]) {
            ns.wget(`https://github.com/EduOTR/bitburner-simple-HWG/raw/main/${fileName}`, fileName, server)
        }
        
        if(ns.getServerMaxRam(server) > 4) {
            ns.exec("basicAutoHack.js", server, 1, "silver-helix")
        }

        traverse(ns, server)
    }
}