// pages/api/auth/[...auth0].js
import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export default handleAuth({
  async login(req, res) {
    try {
      console.log("Trying to log in...");

      await handleLogin(req, res, {
        authorizationParams: {
          audience: "https://donefirst.com", // or AUTH0_AUDIENCE
          // Add the `offline_access` scope to also get a Refresh Token
          scope: "openid profile email read:products ", // or AUTH0_SCOPE
        },
        returnTo: "/home",
      });
    } catch (error: any) {
      res.status(error.status || 400).end(error.message);
    }
  },
});
