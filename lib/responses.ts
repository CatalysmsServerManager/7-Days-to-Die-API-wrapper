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

export interface Position {
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
    position: Position,
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

export interface entityLocation {
    id : Number,
    name: String,
    position: Position
}

export interface landClaimsResponse {
    claimsize: Number,
    claimowners: Array < ClaimOwner >
}

export interface ClaimOwner {
    steamid: String,
    claimactive: Boolean,
    playername: String,
    claims: Array < Position >
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

export interface InventoryResponse {
    playername: String,
    bag: Array < any >,
    belt: Array < any >,
    equipment: PlayerEquipment,
}

export interface PlayerEquipment {
    head: any,
    eyes: any,
    face: any,
    armor: any,
    jacket: any,
    shirt: any,
    legarmor: any,
    pants: any,
    boots: any,
    gloves: any
}

export interface getPlayerListResponse {
    total: Number,
    totalUnfiltered: Number,
    firstResult: Number,
    players: Array < PlayerNotOnline >
}

export interface PlayerNotOnline {
    steamid: String,
    entityid: Number,
    ip: String,
    name: String,
    online: Boolean,
    position: Position,
    totalplaytime: Number,
    lastonline: String,
    ping: Number,
    banned: Boolean
}

export interface PlayerLocation {
    steamid: String,
    name: String,
    online: Boolean,
    position: Position
}

export interface GetServerInfo {
    GameType: GetServerInfoEntry,
    GameName: GetServerInfoEntry,
    GameHost: GetServerInfoEntry,
    ServerDescription: GetServerInfoEntry,
    ServerWebsiteURL: GetServerInfoEntry,
    LevelName: GetServerInfoEntry,
    GameMode: GetServerInfoEntry,
    Version: GetServerInfoEntry,
    IP: GetServerInfoEntry,
    CountryCode: GetServerInfoEntry,
    SteamID: GetServerInfoEntry,
    CompatibilityVersion: GetServerInfoEntry,
    Platform: GetServerInfoEntry,
    Port: GetServerInfoEntry,
    CurrentPlayers: GetServerInfoEntry,
    MaxPlayers: GetServerInfoEntry,
    GameDifficulty: GetServerInfoEntry,
    DayNightLength: GetServerInfoEntry,
    ZombiesRun: GetServerInfoEntry,
    DayCount: GetServerInfoEntry,
    Ping: GetServerInfoEntry,
    DropOnDeath: GetServerInfoEntry,
    DropOnQuit: GetServerInfoEntry,
    BloodMoonEnemyCount: GetServerInfoEntry,
    EnemyDifficulty: GetServerInfoEntry,
    PlayerKillingMode: GetServerInfoEntry,
    CurrentServerTime: GetServerInfoEntry,
    DayLightLength: GetServerInfoEntry,
    BlockDurabilityModifier: GetServerInfoEntry,
    AirDropFrequency: GetServerInfoEntry,
    LootAbundance: GetServerInfoEntry,
    LootRespawnDays: GetServerInfoEntry,
    MaxSpawnedZombies: GetServerInfoEntry,
    LandClaimSize: GetServerInfoEntry,
    LandClaimDeadZone: GetServerInfoEntry,
    LandClaimExpiryTime: GetServerInfoEntry,
    LandClaimDecayMode: GetServerInfoEntry,
    LandClaimOnlineDurabilityModifier: GetServerInfoEntry,
    LandClaimOfflineDurabilityModifier: GetServerInfoEntry,
    MaxSpawnedAnimals: GetServerInfoEntry,
    IsDedicated: GetServerInfoEntry,
    IsPasswordProtected: GetServerInfoEntry,
    ShowFriendPlayerOnMap: GetServerInfoEntry,
    BuildCreate: GetServerInfoEntry
    EACEnabled: GetServerInfoEntry,
    Architecture64: GetServerInfoEntry,
    StockSettings: GetServerInfoEntry,
    StockFiles: GetServerInfoEntry,
    RequiredMod: GetServerInfoEntry,
    AirDropMarker: GetServerInfoEntry,
    EnemySpawnMode: GetServerInfoEntry,
    IsPublic: GetServerInfoEntry
}

export interface GetServerInfoEntry {
    type: String,
    value: any
}