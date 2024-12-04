import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import CryptoJS from "crypto-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function encrypt<T>(value: T) {
  if (!process.env.NEXT_PUBLIC_ENCRYPT_SECRET)
    throw new Error("No secret key provided");
  const stringValue = JSON.stringify(value);
  if (stringValue === null || stringValue === undefined || stringValue === "")
    throw new Error("No value provided");
  const encrypted = CryptoJS.AES.encrypt(
    stringValue,
    process.env.NEXT_PUBLIC_ENCRYPT_SECRET
  ).toString();
  return encrypted;
}

export function decrypt<T>(value: T) {
  if (!process.env.NEXT_PUBLIC_ENCRYPT_SECRET)
    throw new Error("No secret key provided");
  const bytes = CryptoJS.AES.decrypt(
    value as string,
    process.env.NEXT_PUBLIC_ENCRYPT_SECRET
  );
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedData);
}
