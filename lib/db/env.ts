import zod, { string } from "zod";

//validate .env keys presence
const envSchema = zod.object({
  DATABASE_URL: zod.string().nonempty(),
  GOOGLE_CLIENT_ID: zod.string().nonempty(),
  GOOGLE_CLIENT_SECRET: zod.string().nonempty(),
  NEXTAUTH_URL: zod.string().nonempty(),
  NEXTAUTTH_SECRE: zod.string().nonempty(),
});

export const env = envSchema.parse(process.env);
