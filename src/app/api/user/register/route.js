import { NextResponse } from "next/server";
import ConnectMongoDb from "@/app/config/ConnectionDb";
import UserModel from "@/app/modals/UserModal";

async function validateAndCreateUser(data) {
  const {
    Username,
    Email,
    Phone_no,
    Password,
    Avatar,
    Security_Q,
    Security_A,
  } = data;

  // Validate required fields
  if (
    !Username ||
    !Email ||
    !Phone_no ||
    !Password ||
    !Security_Q ||
    !Security_A
  ) {
    return NextResponse.json(
      { error: "Please fill all the fields" },
      { status: 400 }
    );
  }

  // Check if user already exists
  const [emailExists, phoneNoExists, usernameExists] = await Promise.all([
    UserModel.findOne({ Email }),
    UserModel.findOne({ Phone_no }),
    UserModel.findOne({ Username }),
  ]);

  if (emailExists) {
    return NextResponse.json(
      { error: "User with this email already exists" },
      { status: 400 }
    );
  } else if (phoneNoExists) {
    return NextResponse.json(
      { error: "User with this Phone_no already exists" },
      { status: 400 }
    );
  } else if (usernameExists) {
    return NextResponse.json(
      { error: "User with this Username already exists" },
      { status: 400 }
    );
  }

  // Create user
  const user = await UserModel.create({
    Username,
    Email,
    Phone_no,
    Password,
    Avatar,
    Security_Q,
    Security_A,
  });

  return NextResponse.json(user);
}

export async function POST(req) {
  await ConnectMongoDb(process.env.Users);

  try {
    const userData = await req.json();
    const response = await validateAndCreateUser(userData);
    return response;
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the user" },
      { status: 500 }
    );
  }
}
