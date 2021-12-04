/**
 * A20 introduces more platforms, which means player IDs can be a bit wonky. 
 */
export function handleSteamId(data: Record<string, any> | Array<Record<string, any>>): any {

  if (Array.isArray(data)) {
    return data.map(handleSteamId);
  }

  if (data.players && Array.isArray(data.players)) {
    return {
      ...data,
      players: data.players.map(handleSteamId)
    };
  }

  const newData = { ...data };

  if (data.userid && data.userid.includes('Steam_')) {
    newData.steamid = data.userid.replace('Steam_', '');
    newData.userid = data.userid;
  }

  if (data.steamid && data.steamid.includes('Steam_')) {
    newData.steamid = newData.steamid.replace('Steam_', '');
    newData.userid = newData.steamid;
  } 

  return newData;
}