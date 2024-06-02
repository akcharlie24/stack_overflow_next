import Link from "next/link";
import React from "react";

interface Props {
  _id: number;
  title: string;
  tags: { _id: number; name: string }[];
  author: { _id: number; name: string; picture: string };
  upvotes: number;
  views: number;
  answers: Array<object>;
  createdAt: Date;
}

const QuestionCard = ({
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
}: Props) => {
  return (
    <div className="card-wrapper p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {String(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h3>{title}</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
