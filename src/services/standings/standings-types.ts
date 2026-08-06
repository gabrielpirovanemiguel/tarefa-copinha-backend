export interface StandingTeam {
  id: number;
  publicId: string;

  name: string;
  abbreviation: string;
}

export interface StandingMatch {
  id: number;

  teamAId: number;
  teamBId: number;

  teamAGoals: number;
  teamBGoals: number;

  finished: boolean;
}

export interface Standing {
  id: number;
  publicId: string;

  name: string;
  abbreviation: string;

  played: number;

  wins: number;
  draws: number;
  losses: number;

  goalsFor: number;
  goalsAgainst: number;

  goalDifference: number;

  points: number;

  qualified: boolean;
}
