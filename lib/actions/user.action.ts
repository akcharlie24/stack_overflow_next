"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  GetUserStatsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import { FilterQuery } from "mongoose";
import Tag from "@/database/tag.model";
import Answer from "@/database/answer.model";

export async function getUserById(params: any) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const createUser = async (userData: CreateUserParams) => {
  try {
    connectToDatabase();
    const newUser = await User.create(userData);

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateUser = async (params: UpdateUserParams) => {
  try {
    connectToDatabase();

    const { clerkId, updateData, path } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    // good practice to revalidate after server action
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteUser = async (params: DeleteUserParams) => {
  try {
    connectToDatabase();

    const { clerkId } = params;
    const user = await User.findOneAndDelete({ clerkId });
    if (!user) {
      throw new Error("User not found");
    }

    // if user exist delete user data from database
    // quesions,answers,comments etc

    // get user question ids

    // const userQuestionIds = await Question.find({
    //   author: user._id,
    // }).distinct("_id");

    // delete user Questions
    await Question.deleteMany({ author: user._id });

    // TODO: delete user answers, comments etc

    // delete user
    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    connectToDatabase();

    // const { page = 1, pageSize = 20, filter, searchQuery } = params;

    const users = await User.find({}).sort({ createdAt: -1 });

    return { users };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const toggleSaveQuestion = async (params: ToggleSaveQuestionParams) => {
  try {
    connectToDatabase();

    const { questionId, userId, path } = params;

    // find user
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    // ? check is the question already saved
    const isSavedQuestion = user.saved.includes(questionId);
    if (isSavedQuestion) {
      // remove question from saved
      await User.findByIdAndUpdate(
        userId,
        {
          $pull: { saved: questionId },
        },
        { new: true },
      );
    } else {
      // saved the question
      await User.findByIdAndUpdate(
        userId,
        {
          $addToSet: { saved: questionId },
        },
        { new: true },
      );
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSavedQuestions = async (params: GetSavedQuestionsParams) => {
  try {
    connectToDatabase();
    const { clerkId, page = 1, pageSize = 10, filter, searchQuery } = params;

    // pagination
    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};

    let sortOptions = {};
    switch (filter) {
      case "most_recent":
        sortOptions = { createdAt: -1 };
        break;
      case "oldest":
        sortOptions = { createdAt: 1 };
        break;
      case "most_voted":
        sortOptions = { upvotes: -1 };
        break;
      case "most_viewed":
        sortOptions = { views: -1 };
        break;
      case "most_answered":
        sortOptions = { answers: -1 };
        break;

      default:
        sortOptions = { createdAt: -1 };
        break;
    }

    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      match: query,
      options: {
        skip: skipAmount,
        limit: pageSize + 1,
        sort: sortOptions,
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    if (!user) {
      throw new Error("User not found");
    }

    const saveQuestions = user.saved;

    const isNext = saveQuestions.length > pageSize;

    return { questions: saveQuestions, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserInfo = async (params: GetUserByIdParams) => {
  try {
    connectToDatabase();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      throw new Error("User not found");
    }

    const totalQuestions = await Question.countDocuments({ author: user._id });
    const totalAnswers = await Answer.countDocuments({ author: user._id });

    // ? count question upvotes
    // const [questionUpvotes] = await Question.aggregate([
    //   { $match: { author: user._id } },
    //   {
    //     $project: {
    //       _id: 0,
    //       upvotes: { $size: "$upvotes" },
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: null,
    //       totalUpvotes: { $sum: "$upvotes" },
    //     },
    //   },
    // ]);

    // ? count answer upvotes
    // const [answerUpvotes] = await Answer.aggregate([
    //   { $match: { author: user._id } },
    //   {
    //     $project: {
    //       _id: 0,
    //       upvotes: { $size: "$upvotes" },
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: null,
    //       totalUpvotes: { $sum: "$upvotes" },
    //     },
    //   },
    // ]);

    //  count question views

    // const [questionViwes] = await Question.aggregate([
    //   { $match: { author: user._id } },
    //
    //   {
    //     $group: {
    //       _id: null,
    //       totalViews: { $sum: "$views" },
    //     },
    //   },
    // ]);

    // calculation badge criteria

    // const criteria = [
    //   { type: "QUESTION_COUNT" as BadgeCriteriaType, count: totalQuestions },
    //   { type: "ANSWER_COUNT" as BadgeCriteriaType, count: totalAnswers },
    //   {
    //     type: "QUESTION_UPVOTES" as BadgeCriteriaType,
    //     count: questionUpvotes?.totalUpvotes || 0,
    //   },
    //   {
    //     type: "ANSWER_UPVOTES" as BadgeCriteriaType,
    //     count: answerUpvotes?.totalUpvotes || 0,
    //   },
    //   {
    //     type: "TOTAL_VIEWS" as BadgeCriteriaType,
    //     count: questionViwes?.totalViews || 0,
    //   },
    // ];

    // ? badge counts

    return {
      user,
      totalQuestions,
      totalAnswers,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserQuestions = async (params: GetUserStatsParams) => {
  try {
    connectToDatabase();
    const { userId, page = 1, pageSize = 10 } = params;
    // pagination

    const skipAmount = (page - 1) * pageSize;

    const totalQuestions = await Question.countDocuments({ author: userId });

    const userQuestions = await Question.find({ author: userId })
      .skip(skipAmount)
      .limit(pageSize)
      .sort({
        createdAt: -1,
        views: -1,
        upvotes: -1,
      })
      .populate("tags", "_id name")
      .populate("author", "_id clerkId name picture");

    const isNextQuestion = totalQuestions > skipAmount + userQuestions.length;

    return { totalQuestions, userQuestions, isNextQuestion };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getUserAnswers = async (params: GetUserStatsParams) => {
  try {
    connectToDatabase();
    const { userId, page = 1, pageSize = 10 } = params;
    const skipAmount = (page - 1) * pageSize;

    const totalAnswers = await Answer.countDocuments({ author: userId });
    const userAnswers = await Answer.find({ author: userId })
      .skip(skipAmount)
      .limit(pageSize)
      .sort({
        createdAt: -1,
        upvotes: -1,
      })
      .populate("question", "_id title")
      .populate("author", "_id clerkId name picture");

    const isNextAnswer = totalAnswers > skipAmount + userAnswers.length;

    return { totalAnswers, userAnswers, isNextAnswer };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
