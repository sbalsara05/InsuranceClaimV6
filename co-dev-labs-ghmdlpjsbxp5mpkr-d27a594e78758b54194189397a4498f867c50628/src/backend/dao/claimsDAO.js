let claims

export default class ClaimsDAO {
    static async injectDB(conn) { // Makes sure the DB is connected
        if (claims) {
            return
        }
        try {
            claims = await conn.db("insurance").collection("claims") // Handles the claims created by the user
        } catch (e) {
            console.error(`Unable to establish collection handles in ClaimsDAO: ${e}`)
        }
    }

    static async getClaims({ filters = null, page = 0, claimsPerPage = 20 } = {}) {
        let query
        let cursor
        try {
            cursor = await claims.find(query).limit(claimsPerPage).skip(claimsPerPage * page)
            const claimsList = await cursor.toArray()
            const totalNumClaims = await claims.countDocuments(query)
            return { claimsList, totalNumClaims }
        } catch (e) {
            console.error(`Unable to fetch claims: ${e}`)
            return { claimsList: [], totalNumClaims: 0 }
        }
    }
}
