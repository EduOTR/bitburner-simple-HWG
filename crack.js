/**
 * @param {import("../").NS} ns
 */
export async function main(ns) {
    ns.brutessh(ns.args[0])
    ns.ftpcrack(ns.args[0])
    ns.httpworm(ns.args[0])
    ns.sqlinject(ns.args[0])
    ns.relaysmtp(ns.args[0])
    ns.nuke(ns.args[0])
}