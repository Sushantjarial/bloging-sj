import { Hono } from "hono";
import { Bindings,Variables } from "../src";
import { sign, verify } from "hono/jwt";
import {z} from "zod"
import {signupInput,signinInput} from "@sushantjarial/blog-common"


const userRouter =new Hono<{Bindings:Bindings,Variables:Variables}>();

userRouter.post('/signup',async(c)=>{
    const body= await c.req.json();
    const {success,error}=signupInput.safeParse(body);
    if(!success){
        c.status(400)
        return c.json({
            error: error.issues
            
        })
    }

  
    
    const prisma= c.get("prisma");
    try{
    const user = await prisma.user.create({
        data: {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: body.password
        }
    });
    const token=await sign({id :user.id},c.env.SECRET)

    return c.json({
        token :token
    })
    
}
catch(e){
  c.status(403);
  return c.json({message:"error while signing up"})
}
})

userRouter.post("/signin",async(c)=>{
    const body= await c.req.json();
    const prisma=c.get("prisma");
    const {success,error}=signinInput.safeParse(body)
    if(!success){
        c.status(401)
        return c.json({error : error.issues})
    }

    try{
    const user= await prisma.user.findUnique({
        where : { email: body.email,
                    password : body.password
         }
    })
    if(!user){
        c.status(401)
        return c.json({
            message : "incorrect login credentials"
        })
    }
    const token=await sign( { id: user.id } , c.env.SECRET);
    c.status(200);
    return c.json({
        token : token
    })

}

    catch(e){
        return c.json({
            message: "error while signing in "
        })
    }    
})




export default userRouter;