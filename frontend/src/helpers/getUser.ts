const apiUrl = process.env.NEXT_PUBLIC_API_USERS

export async function getUser(id:string) {
    try {
        const res = await fetch(`${apiUrl}/${id}`, {
            method: "GET",
        })
        const user = await res.json();
        return user;
    } catch (error: any) {
        throw new Error(error)
    }
}