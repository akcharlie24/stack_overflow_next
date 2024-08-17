import AnswerCard from "@/components/cards/AnswerCard";
import { getUserAnswers } from "@/lib/actions/user.action";

interface AnswersTabProps {
  userId: string;
  clerkId?: string | null;
  searchProps?: { [key: string]: string | undefined };
}

const AnswersTab = async ({
  searchProps,
  userId,
  clerkId,
}: AnswersTabProps) => {
  const { userAnswers, isNextAnswer } = await getUserAnswers({
    userId,
    page: searchProps?.page ? +searchProps?.page : 1,
  });

  const pageNumber = searchProps?.page ? +searchProps?.page : 1;

  return (
    <>
      {userAnswers.map((answer) => (
        <AnswerCard
          key={answer._id}
          clerkId={clerkId}
          _id={answer._id}
          question={answer.question}
          author={answer.author}
          upvotes={answer.upvotes.length}
          createdAt={answer.createdAt}
        />
      ))}

      <div className="mt-10">Pagination</div>
    </>
  );
};
export default AnswersTab;
