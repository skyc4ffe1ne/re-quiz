export default function SkeletonPreviewQuiz() {
  return (
    <div className="p-6 animate-pulse h-60 mx-auto w-1/3 border rounded-lg mt-16">
      <h3 className="pb-4 bg-muted h-10 w-full rounded-sm"> </h3>
      <div className="border w-full mt-4 rounded-md">
        <div className="justify-start bg-muted h-5 w-1/2 mx-4 my-2 rounded-sm"></div>
      </div>
      <div className="border w-full mt-4 rounded-md">
        <div className="justify-start bg-muted h-5 w-1/2 mx-4 my-2 rounded-sm"></div>
      </div>
      <div className="border w-full mt-4 rounded-md">
        <div className="justify-start bg-muted h-5 w-1/2 mx-4 my-2 rounded-sm"></div>
      </div>
    </div>
  );
}
