import { getPlayerAbsence, getPlayerBanner, getPlayerMatches, getPlayerPerformance, getPlayerStatitics, getPlayerStatitics90, getPlayerTransfers, getPlayerTrophies } from "@/services/players-api";
import { useQuery } from "@tanstack/react-query";

export function useGetPlayerBanner(playerId: string) {
  return useQuery({
    queryKey: ["player banner", playerId],
    queryFn: () => getPlayerBanner(playerId),
    enabled: !!playerId,
  });
}

export function useGetPlayerMatches(playerId: string, seasonId?: string) {
  return useQuery({
    queryKey: ["player matches", playerId, seasonId],
    queryFn: () => getPlayerMatches(playerId, seasonId),
    enabled: !!playerId,
  });
}
export function useGetPlayerStatistics(playerId: string, seasonId?: string) {
  return useQuery({
    queryKey: ["player statistics", playerId, seasonId],
    queryFn: () => getPlayerStatitics(playerId, seasonId),
    enabled: !!playerId,
  });
}

export function useGetPlayerTransfers(playerId: string) {
  return useQuery({
    queryKey: ["player transfers", playerId],
    queryFn: () => getPlayerTransfers(playerId),
    enabled: !!playerId,
  });
}

export function useGetPlayerTrophies(playerId: string) {
  return useQuery({
    queryKey: ["player trophies", playerId],
    queryFn: () => getPlayerTrophies(playerId),
    enabled: !!playerId,
  });
}

export function useGetPlayerStatistics90(playerId: string, seasonId: string) {
  return useQuery({
    queryKey: ["player statistics 90", playerId, seasonId],
    queryFn: () => getPlayerStatitics90(playerId, seasonId),
    enabled: !!playerId,
  });
}

export function useGetPlayerPerformance(playerId: string) {
  return useQuery({
    queryKey: ["player performance", playerId],
    queryFn: () => getPlayerPerformance(playerId),
    enabled: !!playerId,
  });
}

export function useGetPlayerAbsence(playerId: string) {
  return useQuery({
    queryKey: ["player absence", playerId],
    queryFn: () => getPlayerAbsence(playerId),
    enabled: !!playerId,
  });
}
