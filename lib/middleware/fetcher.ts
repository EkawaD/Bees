export const getData = async (ctx) => {
    try {
        const res = await fetch("http://localhost:3000/api/user/1")
        const data = await res.json()

        return {
            props: {
                user: JSON.parse(JSON.stringify(data))
            }
        }
    
    } catch (error) {
        console.log(error)
    }




}