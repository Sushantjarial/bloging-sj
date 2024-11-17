import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";
import { Bindings , Variables} from "../src";



export const authMiddleware=createMiddleware<{Bindings:Bindings,Variables:Variables}>( async (c , next) => {
        const jwt=  c.req.header("Authorization")
        if(!jwt){
            return c.json({
                error : "unauthorized"
            })
        }
        const token = jwt.split(' ')[1];
        try {
            const user = await verify(token, c.env.SECRET);
            const userId=String(user.id);
        c.set("userId" , userId);
       await next();
        } catch (error) {
            c.status(401)
            return c.json({ error: "invalid token" });
        }
        
}) 