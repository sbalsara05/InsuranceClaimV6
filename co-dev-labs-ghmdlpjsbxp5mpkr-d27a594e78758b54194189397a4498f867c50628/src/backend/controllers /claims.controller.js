import ClaimsDAO from "../dao/claimsDAO.js"

export default class ClaimsController {
    static async apiGetClaims(req, res, next) {
        const claimsPerPage = parseInt(req.query.claimsPerPage, 10) || 20
        const page = parseInt(req.query.page, 10) || 0

        const filters = {}
        if (req.query.policy_number) {
            filters.policy_number = req.query.policy_number
        }

        const { claimsList, totalNumClaims } = await ClaimsDAO.getClaims({
            filters,
            page,
            claimsPerPage,
        })

        let response = {
            claims: claimsList,
            page: page,
            filters: filters,
            entries_per_page: claimsPerPage,
            total_results: totalNumClaims,
        }
        res.json(response)
    }
}
