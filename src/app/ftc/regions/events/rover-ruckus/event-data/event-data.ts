export class EventData {
  _id: string;
  lastUpdated: string;
  eventInformation: {
    address: string;
    date: string;
    location: string;
    name: string;
  };
  ranking: Ranking[];
  matchHistory: MatchHistory[];
  averageScores: AverageScores[];
}

export class Ranking {
  rank: number;
  teamNumber: number;
  teamName: string;
  record: { wins: number; losses: number; ties: number };
  qualifyingPoints: number;
  rankingPoints: number;
  averageScore: any;
  averageMarginalScore: any;
  average: {
    auto: any;
    driver: any;
    end: any;
  };
}

export class MatchHistory {
  matchNumber: number;
  alliance: string;
  team1: { teamNumber: number; teamName: string; rank: number; surrogate: boolean };
  team2: { teamNumber: number; teamName: string; rank: number; surrogate: boolean };
  result: { total: number; penalty: number; final: number };
  prediction: string;
  winner: string;
  gameInformation: {
    auto: {
      landing: number;
      sampling: number;
      claiming: number;
      parking: number;
    };
    driver: { goldMineral: number; silverMineral: number; anyMineral: number };
    end: { latched: number; parkedCrater: number; parkedCompletelyCrater: number };
  };
}

export class AverageScores {
  teamNumber: number;
  teamName: string;
  averageScore: any;
  averageMarginalScore: any;
  average: { auto: any; driver: any; end: any };
  gameAverages: { auto: { landing: any; sampling: any; claiming: any; parking: any }; driver: { goldMineral: any; silverMineral: any; anyMineral: any }; end: { latched: any; parkedCrater: any; parkedCompletelyCrater: any } };
}
