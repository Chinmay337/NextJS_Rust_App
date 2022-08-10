import {
  getAccessToken,
  withApiAuthRequired,
  getSession,
} from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default withApiAuthRequired(async function getReservations(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // If your Access Token is expired and you have a Refresh Token
  // `getAccessToken` will fetch you a new one using the `refresh_token` grant

  const session = getSession(req, res);
  let user;
  if (session) user = session.user;
  console.group();
  console.log("stringified body", JSON.stringify(req.body));
  // const body = JSON.parse(req.body);

  // Safety guard to ensure we make POST request with Real User Email

  const body = req.body;
  body.email = user?.email.toLowerCase();

  const { accessToken } = await getAccessToken(req, res, {
    //  scopes: ["read:products"],
  });

  // console.log("my Token: ", accessToken);

  const response = await fetch(`http://rust:8080/reservation`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  });
  console.log("response", response);
  console.groupEnd();
  const status = await response.json();
  res.status(200).json(status);

  // res.status(200).send(products);
});
