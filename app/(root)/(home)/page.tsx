import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";
import React from "react";

const questions = [
  {
    _id: 1,
    title: "What is the difference between React and Vue.js?",
    tags: [
      { _id: "1", name: "javascript" },
      { _id: "2", name: "frontend" },
    ],
    author: {
      _id: 123,
      name: "John Doe",
      picture: "https://example.com/profile_pictures/john_doe.jpg", // Replace with actual image URL
    },
    upvotes: 250000,
    views: 10000000,
    answers: [
      {
        _id: 456,
        content:
          "Both are popular JavaScript libraries for building user interfaces. React uses a virtual DOM for efficient updates, while Vue.js offers a more lightweight approach.",
        author: {
          _id: 45,
          name: "Jane Smith",
          picture: "https://example.com/profile_pictures/jane_smith.jpg", // Replace with actual image URL
        },
        createdAt: new Date("2024-06-02"),
      },
    ],
    createdAt: new Date("2024-05-30"),
  },
  {
    _id: 2,
    title: "How do I implement routing in a React application?",
    tags: [
      { _id: "3", name: "react" },
      { _id: "4", name: "routing" },
    ],
    author: {
      _id: 456,
      name: "Jane Smith",
      picture: "https://example.com/profile_pictures/jane_smith.jpg", // Replace with actual image URL
    },
    upvotes: 18,
    views: 750,
    answers: [], // Empty answers array
    createdAt: new Date("2024-06-01"),
  },
  {
    _id: 3,
    title: "What are the best practices for state management in React?",
    tags: [
      { _id: "1", name: "javascript" },
      { _id: "5", name: "react" },
      { _id: "6", name: "state" },
    ],
    author: {
      _id: 789,
      name: "Michael Jones",
      picture: "https://example.com/profile_pictures/michael_jones.jpg", // Replace with actual image URL
    },
    upvotes: 32,
    views: 1500,
    answers: [], // Empty answers array
    createdAt: new Date("2024-05-28"),
  },
  {
    _id: 4,
    title: "Explain the concept of functional components in React.",
    tags: [
      { _id: "1", name: "javascript" },
      { _id: "5", name: "react" },
      { _id: "7", name: "components" },
    ],
    author: {
      _id: 1011,
      name: "Sarah Lee",
      picture: "https://example.com/profile_pictures/sarah_lee.jpg", // Replace with actual image URL
    },
    upvotes: 12,
    views: 400,
    answers: [], // Empty answers array
    createdAt: new Date("2024-05-25"),
  },
];

const Home = () => {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for Questions Here..."
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There's no question to show"
            description="  Be the first one to break the silence! 🚀 Ask a Question and kickstart the discussion. Our query could be the next big thing others learn from.Get Involved!💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
};

export default Home;
