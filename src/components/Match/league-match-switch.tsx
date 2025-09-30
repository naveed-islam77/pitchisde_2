import { useRouter } from "next/router";

const TOGGLE_OPTIONS = [
  { key: "date", label: "Date" },
  { key: "round", label: "Round" },
];

const LeagueMatchSwitch = ({
  activeToggle,
  setActiveToggle,
  toggleOptions = TOGGLE_OPTIONS,
}) => {
  const router = useRouter();
  const { leagueId, ...rest } = router.query;

  return (
    <div className="flex items-center justify-center sm:justify-start mb-4">
      <div className="flex gap-2 bg-gray-200 rounded-full max-sm:w-full p-1">
        {toggleOptions?.map(({ key, label }) => (
          <button
            key={key}
            className={`text-sm px-4 py-2 rounded-full max-sm:w-full font-semibold hover:bg-gray-50 ${
              activeToggle === key
                ? "bg-white text-x-bargreen"
                : "text-gray-600"
            }`}
            onClick={() => setActiveToggle(key)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LeagueMatchSwitch;
