const {z} = require('zod')

const AddUserRequest = z.object({
    phoneNumber: z.string()
})

const VerifyUserRequest = z.object({
    phoneNumber: z.string(),
    accessCode: z.string()
})

const LikeGithubUserRequest = z.object({
    phone_number: z.string(),
    github_user_id: z.union([z.string(), z.number().positive().int()])
})

module.exports = {
    AddUserRequest,
    VerifyUserRequest,
    LikeGithubUserRequest
}
