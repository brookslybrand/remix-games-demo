// db.ts

interface BoardGame {
  id: number;
  name: string;
  description: string;
  minPlayers: number;
  maxPlayers: number;
  playTime?: number; // Play time in minutes
}

class InMemoryDatabase {
  private boardGames: BoardGame[] = [];
  private nextId: number = 1;

  constructor(seedData: Omit<BoardGame, "id">[] = []) {
    this.seedDatabase(seedData);
  }

  private seedDatabase(seedData: Omit<BoardGame, "id">[]): void {
    seedData.forEach((boardGame) => this.addBoardGame(boardGame));
  }

  async addBoardGame(boardGame: Omit<BoardGame, "id">) {
    const newBoardGame = { ...boardGame, id: this.nextId++ };
    this.boardGames.push(newBoardGame);
    return newBoardGame;
  }

  async getBoardGames() {
    return this.boardGames;
  }

  async getBoardGameById(id: number) {
    return this.boardGames.find((game) => game.id === id);
  }

  updateBoardGame(id: number, updatedGame: Partial<Omit<BoardGame, "id">>) {
    const gameIndex = this.boardGames.findIndex((game) => game.id === id);
    if (gameIndex === -1) return undefined;

    const updatedBoardGame = { ...this.boardGames[gameIndex], ...updatedGame };
    this.boardGames[gameIndex] = updatedBoardGame;
    return updatedBoardGame;
  }

  deleteBoardGame(id: number) {
    const gameIndex = this.boardGames.findIndex((game) => game.id === id);
    if (gameIndex === -1) return false;

    this.boardGames.splice(gameIndex, 1);
    return true;
  }
}

export const db = new InMemoryDatabase([
  {
    name: "Catan",
    description: "A game of trading and building",
    minPlayers: 3,
    maxPlayers: 4,
    playTime: 120,
  },
  {
    name: "Pandemic",
    description: "A cooperative game of disease control",
    minPlayers: 2,
    maxPlayers: 4,
    playTime: 60,
  },
  {
    name: "Ticket to Ride",
    description: "A cross-country train adventure",
    minPlayers: 2,
    maxPlayers: 5,
    playTime: 90,
  },
  {
    name: "Carcassonne",
    description: "A tile-placement game",
    minPlayers: 2,
    maxPlayers: 5,
    playTime: 45,
  },
  {
    name: "7 Wonders",
    description: "A card drafting game",
    minPlayers: 2,
    maxPlayers: 7,
    playTime: 30,
  },
]);
