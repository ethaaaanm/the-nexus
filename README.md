Find us at:  https://ethaaaanm.github.io/the-nexus/

## Firestore Database Structure
### `players` Collection
Each document represents a player.
- `playerId`: (string) The unique ID of the player.
- `playerName`: (string) The name of the player.
- `teamID`: (string) The ID of the team the player belongs to.
- `stats`: (map)
  - `basketball`: (map)
    - `gamesPlayed`: (number)
    - `points`: (number)
    - `assists`: (number)
    - `rebounds`: (number)
  - `softball`: (map)
    - `gamesPlayed`: (number)
    - `hits`: (number)
    - `strikeOuts`: (number)
    - `battingAverage`: (number)
    - `atBats`: (number)
    - `rbi`: (number)
  -  `ultimate`: (map)
    - `gamesPlayed`: (number)
    - `assists`: (number)
    - `blocks`: (number)
    - `points`: (number)
  - `volleyball`: (map)
    - `gamesPlayed`: (number)
    - `wins`: (number)
    - `losses`: (number)
    - `winPercentage`: (number)


### `teams` Collection
Each document represents a team.
- `teamID`: (string) The unique ID of the team.
- `teamName`: (string) The name of the team.
- `players`: (array) List of player IDs associated with the team.
- `stats`: (map)
  - `basketball` (map)
    - `gamesPlayed`: (number)
    - `wins`: (number)
    - `losses`: (number)
  - `softball` (map)
    - `gamesPlayed`: (number)
    - `wins`: (number)
    - `losses`: (number)
  - `volleyball` (map)
    - `gamesPlayed`: (number)
    - `wins`: (number)
    - `losses`: (number)
  - `ultimate` (map)
    - `gamesPlayed`: (number)
    - `wins`: (number)
    - `losses`: (number)


### `games` Collection
Each document represents a game.
- `gameID`: (string) The unique ID of the game.
- `date`: (timestamp) The date of the game.
- `teamIDA`: (map) The ID of one team
    - `score`: (number) 
    - `playerStats`: (map) 
        - `player1ID`: (map) 
            `gamesPlayed`: (number)
            `points`: (number)
            `rebounds`: (number)
            `assists`: (number)
        - `player2ID`: (map) 
            `gamesPlayed`: (number)
            `points`: (number)
            `rebounds`: (number)
            `assists`: (number)
        - `...`
- `teamIDB`: (map) The ID of the other team
    - `score`: (number) 
    - `playerStats`: (map) 
        - `player1ID`: (map) 
            `gamesPlayed`: (number)
            `points`: (number)
            `rebounds`: (number)
            `assists`: (number)
        - `player2ID`: (map) 
            `gamesPlayed`: (number)
            `points`: (number)
            `rebounds`: (number)
            `assists`: (number)
        - `...`