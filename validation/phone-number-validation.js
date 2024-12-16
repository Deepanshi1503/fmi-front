import * as yup from "yup";
// const phoneNumberRegex = /^(\+\d{1,15}|\d{1,15})$/;
const phoneNumberRegex = /^91\d{10}$/;

export const userSchema = yup
  .string()
  .matches(phoneNumberRegex, "Please enter a valid phone number");

export const otpSchema = yup
  .string()
  .required("You  did not provide OTP number.")
  .min(4, "OTP is not valid! it must be four digits")
  .max(4, "Otp must be 4 digits only");
