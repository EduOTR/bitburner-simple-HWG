/**
 * @param {import("../").NS} ns 
 */
export async function main(ns) {
    
}


/**
 * @param {import("../").NS} ns 
 */
async function traverse(ns, targetName) {
    var servers = ns.scan(targetName)

    for(let server in servers) {
        if (!ns.hasRootAccess(server)) {
            ns.run("crack.js", 1, server)
        }

        ns.wget()
    }
}