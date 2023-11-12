import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

export const GET = withApiAuthRequired(async function protected_(req) {
  try {
    const res = new NextResponse();
    const { accessToken } = await getAccessToken(req, res, {});
    console.log("Access Token:", accessToken);
    const response = await fetch(`http://localhost:5247/auth`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const protected_ = await response.json();
    console.log(protected_);
    return NextResponse.json(protected_, res);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
});
