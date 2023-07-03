import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { setCookie } from "cookies-next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const errors: string[] = [];
    const { email, password } = req.body;

    const validationSchema = [
      {
        valid: validator.isEmail(email),
        errorMessage: "Email is invalid",
      },
      {
        valid: validator.isLength(password, {
          min: 1,
        }),
        errorMessage: "Password is invalid",
      },
    ];

    validationSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage);
      }
    });

    if (errors.length) {
      return res.status(400).json({ errorMessage: errors[0] });
    }


    try {
      const response = await axios.post('http://localhost:8080/token', null, {
        auth: {
          username: 'user1@abc.com',
          password: 'password'
        }
      });

      // 处理响应
      const token = response.data;
      console.log(token);
      setCookie("jwt", token, { req, res, maxAge: 60 * 6 * 24 });
    } catch (error) {
      // 处理错误
      console.error(error);
      return res
        .status(401)
        .json({ errorMessage: "Email or password is invalid" });
    }


    const user = {
      id: "id",
      firstName: "firstName",
      lastName: "lastName",
      email: email,
      city: "city",
      password: password,
      phone: "phone"
    }

    return res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      city: user.city,
    });
  }

  return res.status(404).json("Unknown endpoint");
}
