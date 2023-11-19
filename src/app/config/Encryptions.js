import { createHash } from "crypto";

export function encryptUserData(username, password = "") {
  const secretString = process.env.SECRET_STRING;
  const combinedString = `${username}:${password}:${secretString}`;
  return createHash("sha256").update(combinedString).digest("hex");
}

export function verifyUserData(username, password = "", providedHash) {
  const secretString = process.env.SECRET_STRING;
  const calculatedHash = encryptUserData(username, password, secretString);
  return calculatedHash === providedHash;
}
