import { NextApiRequest, NextApiResponse } from "next";

import jwt from "jsonwebtoken";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bearerToken = req.headers["authorization"] as string;
  const token = bearerToken.split(" ")[1];

  const payload = jwt.decode(token) as { email: string };

  if (!payload.email) {
    return res.status(401).json({
      errorMessage: "Unauthorized request",
    });
  }

  const user = {
    id: "id",
    firstName: "firstName",
    lastName: "lastName",
    email: payload.email,
    city: "city",
    phone: "phone"
  }

  if (!user) {
    return res.status(401).json({
      errorMessage: "User not found",
    });
  }

  return res.json({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    city: user.city,
  });
}
