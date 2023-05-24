/**
 * @param {import("../").NS} ns
 */
export function main(ns) {
    traverse(ns, ns.getHostname(), []);
}



/**
 * @param {import("../").NS} ns
 */
function traverse(ns, currentServer, visited) {
    visited.push(currentServer);
    var servers = ns.scan(currentServer);

    for(let server of servers) {


        if(visited.indexOf(server) == -1) {

            if (!ns.hasRootAccess(server)) {
                ns.exec("crack.js", ns.getHostname(), 1, server);
            }
            
            for(let fileName of [
                "basicAutoHack.js",
                "exploitTargetServer.js",
                "grow.js",
                "weaken.js",
                "hack.js"]) {
                ns.wget(`https://github.com/EduOTR/bitburner-simple-HWG/raw/main/${fileName}`, fileName, server);
            }
            
            if(ns.getServerMaxRam(server) > 4) {
                ns.exec("basicAutoHack.js", server, 1, "silver-helix");
            }

            traverse(ns, server, visited);
        }
    }
}