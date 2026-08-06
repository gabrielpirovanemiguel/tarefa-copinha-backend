// src/services/standings/standings-service.ts
var StandingService = class {
  calculate(teams, matches) {
    const standings = /* @__PURE__ */ new Map();
    for (const team of teams) {
      standings.set(team.id, {
        id: team.id,
        publicId: team.publicId,
        name: team.name,
        abbreviation: team.abbreviation,
        played: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        points: 0,
        qualified: false
      });
    }
    for (const match of matches) {
      if (!match.finished) continue;
      const home = standings.get(match.teamAId);
      const away = standings.get(match.teamBId);
      if (!home || !away) continue;
      home.played++;
      away.played++;
      home.goalsFor += match.teamAGoals;
      home.goalsAgainst += match.teamBGoals;
      away.goalsFor += match.teamBGoals;
      away.goalsAgainst += match.teamAGoals;
      if (match.teamAGoals > match.teamBGoals) {
        home.wins++;
        home.points += 3;
        away.losses++;
      } else if (match.teamAGoals < match.teamBGoals) {
        away.wins++;
        away.points += 3;
        home.losses++;
      } else {
        home.draws++;
        away.draws++;
        home.points++;
        away.points++;
      }
    }
    const table = Array.from(standings.values());
    for (const team of table) {
      team.goalDifference = team.goalsFor - team.goalsAgainst;
    }
    table.sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points;
      }
      if (b.goalDifference !== a.goalDifference) {
        return b.goalDifference - a.goalDifference;
      }
      if (b.goalsFor !== a.goalsFor) {
        return b.goalsFor - a.goalsFor;
      }
      return a.name.localeCompare(b.name);
    });
    const first = table.at(0);
    const second = table.at(1);
    if (first) {
      first.qualified = true;
    }
    if (second) {
      second.qualified = true;
    }
    return table;
  }
};

export {
  StandingService
};
//# sourceMappingURL=chunk-HDN5YKBQ.js.map