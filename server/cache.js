import NodeCache from "node-cache";
const cache = new NodeCache({
  stdTTL: 3600
});


/**
 * updates cache with the player preferences object
 * @playerId the player Id
 * @data the data
 */
function updatePrefsCache(playerId, data) {
  cache.set(
    playerId,
    data
  )
};


/**
 * searches cache for player prefs and returns the object
 * @playerId  the player Id 
 */
function getPrefsCache(playerId) {
  return cache.get(playerId)
}


/**
 * sets/updates the players character 
 * @playerId the player Id
 * @campaignId the campaign Id
 * @data the character data object
 */
function setCharCache(playerId, campaignId, data) {
cache.set(
  `${playerId}/${campaignId}`,
  data
  )
};


/**
 * gets the character object from the cache
 * @playerId
 * @campaignId
 */
function getCharCache(playerId, campaignId) {
return cache.get(`${playerId}/${campaignId}`)
};


/**
 * @playerId the player to delete
 */
function delCharCache(playerId) {
  cache.del(playerId);
}



export {
  updatePrefsCache,
  getPrefsCache,
  setCharCache,
  getCharCache,
  delCharCache
}