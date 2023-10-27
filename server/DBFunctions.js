import { db, collection, getDoc, setDoc, doc} from './firebase.js';
import { deleteDoc, getDocs, query, updateDoc } from "firebase/firestore";
import { updatePrefsCache, getPrefsCache, setCharCache, getCharCache, delCharCache } from './cache.js';

/**
 * Creates a new preferences doc when creating the first character
 * @playerId The players Id
 * @data The campaign to add
 */
async function createPrefs(playerId, data) {
  try {
    await setDoc(doc(db, 'players', playerId), {
      'active' : data,
      'campaigns' : [data]
    })
    .then(() => updatePrefsCache(
      playerId,
      {
        'active' : data,
        'campaigns' : [data]
      })) // sets cache with same data as database if db is reached 1st import as data entered needs to be an object and doesnt start as one
    .catch(res => console.log(res))

    return
  }
  catch{}
};


/**
 * Sets the players active campaign from an array of their campaigns
 * @playerId The players Id
 * @data The perference data
 */
async function updatePrefs(playerId, data) {
  try {
    let docExists = await getPrefs(playerId);

    if (docExists) {  // if database document exists update it and cache the data
      const newCampaigns = [...docExists.campaigns, data];
      const uniqueCampaigns = [...new Set(newCampaigns)];
  
      await updateDoc(doc(db, 'players', playerId), {
        'active' : data,
        'campaigns' : uniqueCampaigns
      })
      .then(() => updatePrefsCache(
        playerId,
        {
          'active' : data,
          'campaigns' : uniqueCampaigns
        }
        ))
      .catch(res => console.log(res))

    } else {
      await createPrefs(playerId, data) // if database doc doesnt exist, create it
    }
    
    return true // if database is correctly written to return true
  }
  catch {
    return false  // if database cannot be reached return false
  }

};


/**
 * Gets all the players campaigns and the currently active one
 * @playerId The players Id
 */
async function getPrefs(playerId) {

  let data = getPrefsCache(playerId); // try getting prefs from cache before trying database
  if(data) {
    return data
  }

  try{
    const docRef = doc(db, 'players', playerId);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    if(data) {  // checks database if nothing in cache, if there is data update the cache and return data
      updatePrefsCache(playerId, data)
      return data
    }

    return null;  // if no data return null to end block
  }
  catch {
    return null // if database error return null
  }

};


/**
 * Creates or updates a players character in the database
 * @PlayerId The Current players Id
 * @campaignId The Id of the campaign, as setup by the player
 * @data the character data to be entered
 */
async function setChar(playerId, campaignId, data) {

  const existingPref = await getPrefs(playerId)

  if (!existingPref) {
    await createPrefs(playerId, data.campaignId)
  }

  await setDoc(doc(db, 'players', playerId, 'characters', campaignId), {
    "name" : data.name,
    "level" : data.level,
    "class" : data.class,
    "pfpUrl" : data.pfpUrl,
    "strength" : data.strength,
    "dexterity" : data.dexterity,
    "constitution" : data.constitution,
    "intelligence" : data.intelligence,
    "wisdom" : data.wisdom,
    "charisma" : data.charisma,

    "strSave" : data.strSave,
    "dexSave" : data.dexSave,
    "conSave" : data.conSave,
    "intSave" : data.intSave,
    "wisSave" : data.wisSave,
    "chaSave" : data.chaSave,

    "acrobatics" : data.acrobatics,
    "animalHandling" : data.animalHandling,
    "arcana" : data.arcana,
    "athletics" : data.athletics,
    "history" : data.history,
    "insight" : data.insight,
    "intimidation" : data.intimidation,
    "investigaton" : data.investigaton,
    "medicine" : data.medicine,
    "nature" : data.nature,
    "perception" : data.perception,
    "performance" : data.performance,
    "persuasion" : data.persuasion,
    "religion" : data.religion,
    "slightOfHand" : data.slightOfHand,
    "stealth" : data.stealth,
    "survival" : data.survival,

    "campaignId" : data.campaignId
  })
  .then(() => setCharCache(playerId, campaignId, data)) // waits for database to update then updates cache
  .catch(res => console.log(res));

  return;
};


/**
 * Gets a players character
 * @playerId The players Id
 * @campaignId The Id of the campaign, as setup by the player
 */
async function getChar(playerId, campaignId) {
  const cacheData = getCharCache(playerId,campaignId) // checks cache first
  if(cacheData) {
    return cacheData
  }

  const docRef = doc(db, 'players', playerId, 'characters', campaignId);  // if nothing in cache, checks database then copies to cache and returns data
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();

  setCharCache(playerId,campaignId,data);

  return data;
};


/**
 * returns an array of all the players campaigns
 * @playerId The players Id
 */
async function getAllCampaigns(playerId) {
    let campaigns = [];

    const col = query(collection(db, 'players' , playerId, 'characters'));

    const querySnap = await getDocs(col);

    querySnap.forEach((doc) => {
      campaigns.push(doc.data().campaignId)
    })

    return campaigns;
}


/**
 * Deletes the character associated with the campaign selected
 * @PlayerId The Current players Id
 * @campaignId The Id of the campaign, as setup by the player
 */
async function delChar(playerId, campaignId) {

  try {
    await deleteDoc(doc(db, 'players', playerId, 'characters', campaignId));  // tries to delete from database first

    // used to get all campaigns for the player
    let prefs = await getPrefs(playerId);

    // new campaigns all but the one to delete
    let campaigns = prefs.campaigns.filter((campaign) => campaign !== campaignId);

    // if only 1 campaign remaining, sets it to active
    if (campaigns.length == 1) {
       prefs.active = campaigns[0]
    }

  
    // sets new active campaign to latest in array updates database then cache
    if (campaigns.length >= 1) {
        await updateDoc(doc(db, 'players', playerId), {
          'active' : prefs.active,
          'campaigns' : campaigns
        })
        .then(() => updatePrefsCache(
          playerId,
          {
          'active' : prefs.active,
          'campaigns' : campaigns
          }
        ));
      }
    
    else {
      await deleteDoc(doc(db, 'players', playerId)) // if this is the last campaign left, deletes the whole player data and updates cache
      .then(() => delCharCache(playerId));
    }

    return true // if deletion is successfull return true
  }
  catch {
    return false  // if deletin is unsucessfull return false
  }

};


export {
  updatePrefs,
  getPrefs,
  setChar,
  getChar,
  getAllCampaigns,
  delChar
}