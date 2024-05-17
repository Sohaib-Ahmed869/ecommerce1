import jwt from 'jsonwebtoken';
export async function authtoken(token)
{
    try{
    const decoded = jwt.verify(token, 'secret');
    return decoded;
    }
    catch(err)
    {
        return null;
    }
}