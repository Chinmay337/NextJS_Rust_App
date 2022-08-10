import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import jwt_decode from "jwt-decode";

export default withApiAuthRequired(async function getReservations(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // If your Access Token is expired and you have a Refresh Token
  // `getAccessToken` will fetch you a new one using the `refresh_token` grant

  const { accessToken } = await getAccessToken(req, res, {
    //  scopes: ["read:products"],
  });

  const decodedToken: any = jwt_decode(accessToken ?? "");

  const [role] = decodedToken["https://donefirstexampleaa.com/roles"];

  console.log("decoded token & role", decodedToken, role);
  res.status(200).json({ role: role });

  // res.status(200).send(products);
});
