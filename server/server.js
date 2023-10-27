// Setup
import 'dotenv/config';
import express from 'express';
const app = express();
const port = 3000;
import bodyParser from "body-parser";
import { updatePrefs, getPrefs, setChar, getChar, getAllCampaigns, delChar } from './DBFunctions.js';


//Middleware
app.use('/', express.static('dist'));

app.use(bodyParser.json())

//Routes

//set player preferences, curently active character
app.post('/updatePrefs', async(req, res) => {
  let result = await updatePrefs(
    req.body.playerId,
    req.body.data
  )
  
  if (result) {
    res.send(
      `Preferences set
Active Campaign: ${req.body.data}`
      )
  }
  else {
    res.send('Preference error, no characters, or database down')
  }

});

// create or update a character
app.post('/setChar', (req, res) => {
  
  //packages a data object from the frontend form
  let data = {
    "name" : req.body.name || '',
    "level" : req.body.level || '1',
    "class" : req.body.class || '',
    "pfpUrl" : req.body.pfpUrl || '',
    "strength" : req.body.strength || 1,
    "dexterity" : req.body.dexterity || 1,
    "constitution" : req.body.constitution || 1,
    "intelligence" : req.body.intelligence || 1,
    "wisdom" : req.body.wisdom || 1,
    "charisma" : req.body.charisma || 1,

    "strSave" : req.body.strSave || 0,
    "dexSave" : req.body.dexSave || 0,
    "conSave" : req.body.conSave || 0,
    "intSave" : req.body.intSave || 0,
    "wisSave" : req.body.wisSave || 0,
    "chaSave" : req.body.chaSave || 0,

    "acrobatics" : req.body.acrobatics || 0,
    "animalHandling" : req.body.animalHandling || 0,
    "arcana" : req.body.arcana || 0,
    "athletics" : req.body.athletics || 0,
    "history" : req.body.history || 0,
    "insight" : req.body.insight || 0,
    "intimidation" : req.body.intimidation || 0,
    "investigaton" : req.body.investigaton || 0,
    "medicine" : req.body.medicine || 0,
    "nature" : req.body.nature || 0,
    "perception" : req.body.perception || 0,
    "performance" : req.body.performance || 0,
    "persuasion" : req.body.persuasion || 0,
    "religion" : req.body.religion || 0,
    "slightOfHand" : req.body.slightOfHand || 0,
    "stealth" : req.body.stealth || 0,
    "survival" : req.body.survival || 0,

    "campaignId" : req.body.campaignId
  }


  setChar(
    req.body.playerId,
    req.body.campaignId,
    data
    )

    res.send('recieved');
});

// deletes a character from the selected campaign
app.post('/delChar', async (req, res) => {

  let result = await delChar(
    req.body.playerId,
    req.body.data
  )
  

  if (result) {
    res.send("Character deleted")
  } else {
    res.send("character not found or database error")
  }

});

// get player prefereneces, currently active character
app.get('/getPrefs/:playerId', async (req, res) => {
  const result = await getPrefs(req.params.playerId);

  if (result) {
    res.send(result)
  } else {
    res.send(null)
  }
})


// gets a players character
app.get('/:playerId/:campaignId', async (req, res) => {
  res.send(
    await getChar(
      req.params.playerId,
      req.params.campaignId
    )
  )
});




app.listen(port, () => {
  console.log(`server listening on port: http://localhost:${port}`)
})