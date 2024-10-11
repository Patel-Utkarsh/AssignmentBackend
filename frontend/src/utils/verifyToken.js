import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export  function verifyToken() {
    const token = cookies().get('tokenCookie')?.value;

    const {id} = jwt.verify(token,"abc");
    return id;

}