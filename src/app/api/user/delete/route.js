import { NextResponse } from "next/server";
import ConnectMongoDb from "@/app/config/ConnectionDb";
import UserModel from "@/app/modals/UserModal";
import { verifyUserData, encryptUserData } from "@/app/config/Encryptions";

export async function DELETE(req) {
  await ConnectMongoDb(process.env.Users);

  try {
    const { Username, Password, Token } = await req.json();

    // verify the token and delete the user
    const tokenVerified = verifyUserData(Username, Password, Token);
    if (tokenVerified) {
      await UserModel.deleteOne({
        Username,
        Password,
      });
      return NextResponse.json(
        { message: "User deleted successfully", tokenVerified },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the user" },
      { status: 500 }
    );
  }
}
