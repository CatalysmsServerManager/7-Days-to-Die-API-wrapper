export interface GameTime {
    days: Number,
    hours: Number,
    minutes: Number
}

export interface StatsResponse {
    gametime: GameTime,
    players: Number,
    hostiles: Number,
    animals: Number
}

export interface PlayerPosition {
    x: Number,
    y: Number,
    z: Number
}

export interface OnlinePlayerResponse {
    steamid: String,
    entityid: Number,
    ip: String,
    name: String,
    online: Boolean,
    position: PlayerPosition,
    experience: Number,
    level: Number,
    health: Number,
    stamina: Number,
    zombiekills: Number,
    playerkills: Number,
    playerdeaths: Number,
    score: Number,
    totalplaytime: Number,
    lastonline: String,
    ping: Number
}

export interface CommandResponse {
    command: String,
    parameters: String,
    result: String
}

export interface AllowedCommands {
    commands: Array< CommandEntry >
} 

export interface CommandEntry {
    command: String,
    description: String,
    help: String
}