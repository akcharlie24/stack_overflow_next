import * as z from "zod";

export const QuestionSchema = z.object({
  title: z.string().min(5).max(130),
  explanation: z.string().min(100),
  tags: z
    .array(z.string().min(1).max(20))
    .min(1, { message: "At least 1 tag needed" })
    .max(3, { message: "At max 3 tags allowed" }),
});

export const AnswerSchema = z.object({
  answer: z.string().min(100),
});

export const profileSchema = z.object({
  name: z.string().min(5).max(50),
  username: z.string().min(5).max(50),
  portfolioWebsite: z.string().url(),
  location: z.string().min(5).max(50),
  bio: z.string().min(10).max(160),
});
