import { authClient } from "./auth-client"

export const getTokenFromClient = async()=>{
    const {data, error} = await authClient.token()

    return data?.token
}