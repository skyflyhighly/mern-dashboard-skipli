const { z } = require('zod')

const GetUserProfileResponse = z.object({
    favoriteGithubUsers: z.array(z.number())
})

module.exports = {
    GetUserProfileResponse
}
