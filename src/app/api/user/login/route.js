import { NextResponse } from "next/server";
import ConnectMongoDb from "@/app/config/ConnectionDb";
import UserModel from "@/app/modals/UserModal";
import { verifyUserData, encryptUserData } from "@/app/config/Encryptions";

export async function POST(req) {
  await ConnectMongoDb(process.env.Users);

  try {
    const { Username, Email, Password } = await req.json();

    // check if any user exists with the same username or email or not
    const userExists = await UserModel.findOne({
      $or: [{ Username }, { Email }],
    });

    if (!userExists) {
      return NextResponse.json(
        { error: "User with the same username or email does not exists" },
        { status: 400 }
      );
    }

    // create a token for the user and send it back to the user
    const token = encryptUserData(Username, Password);

    return NextResponse.json({ userExists, token });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the user" },
      { status: 500 }
    );
  }
}
