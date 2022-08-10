import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import jwt_decode from "jwt-decode";

export default withApiAuthRequired(async function products(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // If your Access Token is expired and you have a Refresh Token
  // `getAccessToken` will fetch you a new one using the `refresh_token` grant
  const { accessToken } = await getAccessToken(req, res, {
    //  scopes: ["read:products"],
  });

  // console.log("my Token decoded: ", jwt_decode(accessToken ?? ""));

  const response = await fetch("http://rust:8080/reservation", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  //  const products = await response.json();
  // res.status(200).json(products);
  // console.log("response", response);

  const reservations = await response.text();

  // console.log("I Got", reservations);

  res.status(200).json(reservations);
  // res.status(200).send(products);
});
