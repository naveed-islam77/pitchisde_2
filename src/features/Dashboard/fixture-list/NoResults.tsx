function NoResults({ message }: { message: string | undefined }) {
  return (
    <div className="h-96 flex items-center justify-center px-4">
      <h1 className="text-center text-xl text-dark/70 font-semibold">
        {message}
      </h1>
    </div>
  );
}

export default NoResults;