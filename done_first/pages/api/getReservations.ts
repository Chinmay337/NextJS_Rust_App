import {
  getAccessToken,
  withApiAuthRequired,
  getSession,
} from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import jwt_decode from "jwt-decode";

export default withApiAuthRequired(async function getReservations(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // If your Access Token is expired and you have a Refresh Token
  // `getAccessToken` will fetch you a new one using the `refresh_token` grant

  const session = getSession(req, res);
  let user;
  if (session) user = session.user;

  const { accessToken } = await getAccessToken(req, res, {
    //  scopes: ["read:products"],
  });

  // console.log("my Token decoded: ", jwt_decode(accessToken ?? ""));

  const response = await fetch(
    `http://rust:8080/reservation/${user?.email.toLowerCase()}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const reservations = await response.json();
  res.status(200).json(reservations);

  // res.status(200).send(products);
});
