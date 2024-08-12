"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";
import Tag from "@/database/tag.model";

export const getTopInteractedTags = async (
  params: GetTopInteractedTagsParams,
) => {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // TODO: Find interactions for the user and group by tags

    // const tagCountMap = await Interaction.aggregate([
    //   { $match: { user: user._id, tags: { $exists: true, $ne: [] } } },
    //   { $unwind: "$tags" },
    //   { $group: { _id: "$tags", count: { $sum: 1 } } },
    //   { $sort: { count: -1 } },
    //   { $limit: limit },
    // ]);

    // topTags
    // const topTags = tagCountMap.map((tagCount) => tagCount._id);

    // todo : find the tag documents for the top tags
    // const topTagDocuments = await Tag.find({ _id: { $in: topTags } });

    // return topTagDocuments;

    return [
      { _id: "1", name: "tag1" },
      { _id: "2", name: "tag2" },
      { _id: "3", name: "tag3" },
    ];
  } catch (error) {
    console.error("Error fetching top interacted tags:", error);
    throw error;
  }
};

export const getAllTags = async (params: GetAllTagsParams) => {
  try {
    connectToDatabase();

    const tags = await Tag.find({});

    return { tags };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
