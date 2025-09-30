import { useFeaturedMatches } from "@/features/Dashboard/useDashboard";
import { Splide } from "@splidejs/react-splide";
import { Block } from "../Block";
import { ScheduledMatch } from "../ScheduledMatch";

export function FeaturedMatches({ title = "Featured Matches" }) {
  const { featuredMatches, isLoading, isError } = useFeaturedMatches();

  if (isLoading)
    return (
      <Block showNextButton={false} title={title}>
        <div className="relative overflow-x-hidden bg-gray-200 h-48 rounded-md">
          <div className="shimmer-effect"></div>
        </div>
      </Block>
    );

  if (isError)
    return (
      <Block showNextButton={false} title={title}>
        <div className="relative overflow-x-hidden h-48 flex flex-col justify-center rounded-md">
          <p className="text-center text-xl font-medium">
            {"Upcoming Matches not Available"}
          </p>
        </div>
      </Block>
    );

  if (featuredMatches?.length === 0)
    return (
      <Block showNextButton={false} title={title}>
        <div className="relative overflow-x-hidden h-48 flex flex-col justify-center rounded-md">
          <p className="text-center text-xl font-medium">
            {"No Upcoming News"}
          </p>
        </div>
      </Block>
    );

  return (
    <Block
      title={title}
      showNextButton={false}
      contentClassName="pb-8 flex flex-col items-center justify-center"
    >
      <Splide
        options={{
          arrows: false,
          type: "loop",
          autoplay: true,
          width: "40rem",
          classes: { pagination: "splide__pagination !-bottom-5" },
        }}
      >
        <div className="space-y-6">
          {featuredMatches?.slice(0, 3)?.map((fixture) => (
            <ScheduledMatch
              key={fixture?.id}
              fixture={fixture}
              isLoading={false}
            />
          ))}
        </div>
      </Splide>
    </Block>
  );
}
