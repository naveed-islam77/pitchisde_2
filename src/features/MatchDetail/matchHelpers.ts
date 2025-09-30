import { Events, Period, ProcessedEvent, StatTag } from "@/types/matchTypes";

export const processPeriodEvents = (
  events: Events[],
  period: Period
): (Events | ProcessedEvent)[] => {
  const processed: (Events | ProcessedEvent)[] = [];
  const timeAdded = period.time_added;
  let addedTimeInserted = false;

  if (timeAdded > 0) {
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      const currentExtra = event.extra_minute || 0;
      const nextEvent = events[i + 1];
      const nextExtra = nextEvent ? nextEvent.extra_minute || 0 : 0;

      processed.push(event);

      if (!addedTimeInserted && currentExtra > 0 && nextExtra === 0) {
        processed.push({
          type: "added_time",
          time: timeAdded,
          id: `added-${period.type_id}-${i}`,
        } as ProcessedEvent);
        addedTimeInserted = true;
      }
    }

    if (!addedTimeInserted && events.some((e) => (e.extra_minute || 0) > 0)) {
      processed.push({
        type: "added_time",
        time: timeAdded,
        id: `added-${period.type_id}-end`,
      } as ProcessedEvent);
    }
  } else {
    processed.push(...events);
  }

  return processed;
};

export const sortEvents = (events: Events[]) => {
  const sortedEvents = events?.sort((a, b) => {
    if (b.period_id !== a.period_id) return b.period_id - a.period_id;

    if (b.minute !== a.minute) return b.minute - a.minute;

    const aExtra = a.extra_minute || 0;
    const bExtra = b.extra_minute || 0;
    if (bExtra !== aExtra) return bExtra - aExtra;

    return b.sort_order - a.sort_order;
  });

  return sortedEvents;
};

export const getPeriodLabel = (typeId) => {
  switch (typeId) {
    case 1:
      return "HT";
    case 2:
      return "FT";
    case 3:
      return "AET";
    case 4:
      return "FTP";
    default:
      return "";
  }
};

// export const groupEvents = (sortedEvents: Events[]) => {
//   const groupedEvents = sortedEvents?.reduce((acc, event) => {
//     const periodType = event.period.type_id;
//     if (!acc[periodType]) {
//       acc[periodType] = {
//         period: event.period,
//         events: [],
//       };
//     }
//     acc[periodType].events.push(event);
//     return acc;
//   }, {});

//   return groupedEvents;
// };

export const getStatTags = (lineup: any) => {
  const tags: StatTag[] = [];

  if (lineup?.length === 0) return tags;

  lineup?.forEach((detail: any) => {
    if (detail?.assists > 0) {
      tags.push(
        ...Array(detail.assists).fill({
          icon: "/mig/icons/assist.png",
          position: "top-left",
        })
      );
    }

    if (detail?.goals > 0) {
      tags.push(
        ...Array(detail.goals).fill({
          icon: "/mig/icons/goal.png",
          position: "top-right",
        })
      );
    }

    if (detail?.captain) {
      tags.push({
        icon: "/mig/icons/captain.png",
        position: "bottom-center",
      });
    }

    if (detail?.yellow_cards > 0) {
      tags.push(
        ...Array(detail.yellow_cards).fill({
          icon: "/mig/icons/yellowCard.png",
          position: "middle-left",
        })
      );
    }

    if (detail?.red_cards > 0) {
      tags.push(
        ...Array(detail.red_cards).fill({
          icon: "/mig/icons/redCard.png",
          position: "bottom-center",
        })
      );
    }

    if (detail?.yellow_red_cards > 0) {
      tags.push(
        ...Array(detail.yellow_red_cards).fill({
          icon: "/mig/icons/yellowRed.png",
          position: "bottom-center",
        })
      );
    }

    if (detail?.own_goals > 0) {
      tags.push(
        ...Array(detail.own_goals).fill({
          icon: "/mig/icons/ownGoal.png",
          position: "bottom-center",
        })
      );
    }

    if (detail?.penalties_scored > 0) {
      tags.push(
        ...Array(detail.penalties_scored).fill({
          icon: "/mig/icons/penaltyScore.png",
          position: "bottom-center",
        })
      );
    }

    if (detail?.penalties_saved > 0) {
      tags.push(
        ...Array(detail.penalties_saved).fill({
          icon: "/mig/icons/penaltySave.png",
          position: "bottom-center",
        })
      );
    }
  });

  return tags;
};


export const getHomeLineUps = (lineups, homeFormation) => {
  return lineups
    .filter((lineup) => lineup.team_id === homeFormation.participant_id)
    .filter((lineup) => lineup.formation_field !== null)
    .sort((a, b) => a.formation_position - b.formation_position);
};

export const getHomeSubstitutes = (lineups, homeFormation) => {
  return lineups
    .filter((lineup) => lineup.team_id === homeFormation.participant_id)
    .filter((lineup) => lineup.formation_field === null)
    .sort((a, b) => a.formation_position - b.formation_position);
};

export const getAwayLineUps = (lineups, awayFormation) => {
  return lineups
    .filter((lineup) => lineup.team_id === awayFormation.participant_id)
    .filter((lineup) => lineup.formation_field !== null)
    .sort((a, b) => a.formation_position - b.formation_position);
};

export const getAwaySubstitutes = (lineups, awayFormation) => {
  return lineups
    .filter((lineup) => lineup.team_id === awayFormation.participant_id)
    .filter((lineup) => lineup.formation_field === null)
    .sort((a, b) => a.formation_position - b.formation_position);
};

export const getPlayerRating = (lineup) => {
  const ratingDetail = lineup?.details?.find(
    (detail) => detail.type.id === 118
  );
  return ratingDetail ? ratingDetail.data.value : null;
};

// Rating background color helper
export const getRatingColor = (rating) => {
  if (!rating) return "bg-gray-400";
  if (rating >= 7.5) return "bg-green-500";
  if (rating >= 6.5) return "bg-yellow-500";
  return "bg-orange-400";
};

export const getEventTags = (events: any[]) => {
  const tags: { icon: string; minute: number }[] = [];

  events?.forEach((event) => {
    if (event?.lineup_type === "substitute") {
      if (event?.sub_out) {
        tags.push({
          icon: "/mig/icons/sub-out.png",
          minute: event?.sub_out_min,
        });

        // Check for injury
        if (event.injured) {
          tags.push({
            icon: "/mig/icons/injury.png",
            minute: event?.sub_out_min,
          });
        }
      }
      // Substitution In (Player coming on)
      else if (event?.sub_in) {
        tags.push({
          icon: "/mig/icons/sub-in.png",
          minute: event?.sub_out_min,
        });
      }
    }
  });

  return tags;
};

export const getSideLined = (sidelined, formation) => {
  return sidelined?.filter(
    (line) => line?.side === formation
  );
};
