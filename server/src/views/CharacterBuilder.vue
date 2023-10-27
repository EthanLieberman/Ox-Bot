<script setup>
import '../css/character-builder.css';
import StatBox from './components/StatBox.vue';
import SavingThrows from './components/SavingThrows.vue';
import SubSavingThrows from './components/SubSavingThrows.vue';
import Abilities from './components/Abilities.vue';
import axios from 'axios';

</script>

<template>

  <div class="wallpaper">

    <div class="container">

      <div class="basic-info">
        <div class="basic-info__nameplate">
          <label v-text="'Character Name'"></label>
          <input type="text" v-model="basicInfo.name">

          <label v-text="'Level'"></label>
          <input type="number" min="1" max="20" v-model="basicInfo.level">
          
          <label v-text="'Class'"></label>
          <input type="text" v-model="basicInfo.class">

          <label v-text="'Profile Image Url'"></label>
          <input type="url" v-model="basicInfo.pfpUrl">
        </div>

        <div>
          <button v-text="'Submit Character Sheet'" @click="sumbitCharacterData"/>
        </div>

        <div v-if="submitResponse" v-text="'Character Data Saved!'" class="basic-info__response"></div>
      </div>

      <div class="core-stats">
        <div v-for="stat in Object.keys(stats)" class="core-stats__block">
          <div class="core-stats__values">
              <label v-text="stat"></label>
              <input type="number" v-model="stats[stat]" min="1" max="20">
              <label v-text="subStat(stat)" class="core-stats__substat"></label>
            </div>
          <StatBox class="core-stats__background"></StatBox>
        </div>
      </div>

      <div class="container__lower">

        <div class="savingThrows">
          <div class="savingThrows__saves">
            <div v-for="save in Object.keys(saves)" class="savingThrows__stats">
              <label v-text="save"></label>
              <input type="number" v-model="saves[save]">
            </div>
          </div>
          <SavingThrows class="savingThrows__background"></SavingThrows>
        </div>


        
        <div class="skills">
          <div class="skills__values">
            <div v-for="skill in Object.keys(skills)" class="skills__stats">
              <label v-text="skill"></label>
              <input type="number" v-model="skills[skill]">
            </div>
          </div>

          <Abilities class="skills__background"></Abilities>
        </div>
      </div>

    </div>

  </div>
</template>

<script>

export default {

  components: {
    StatBox,
    SavingThrows,
    SubSavingThrows,
    Abilities
  },

  data() {
    return {

      characterId : '',
      campaignId : '',

      basicInfo : {
        name : '',
        level: '1',
        class : '',
        pfpUrl : '',
      },

      stats : {
        strength: '1',
        dexterity: '1',
        constitution : '1',
        intelligence : '1',
        wisdom : '1',
        charisma : '1'
      },

      saves : {
        strSave : '0',
        dexSave : '0',
        conSave : '0',
        intSave : '0',
        wisSave : '0',
        chaSave : '0'
      },
      
      skills : {
        acrobatics : '0',
        animalHandling : '0',
        arcana : '0',
        athletics : '0',
        history : '0',
        insight : '0',
        intimidation : '0',
        investigaton : '0',
        medicine : '0',
        nature : '0',
        perception : '0',
        performance : '0',
        persuasion : '0',
        religion : '0',
        slightOfHand : '0',
        stealth : '0',
        survival : '0'
      },

      submitResponse : false

    }
  },

  mounted() {

    const getStats = () => {

      this.playerId = this.$route.query.playerId
      this.campaignId = this.$route.query.campaignId

      axios.get(`/${this.playerId}/${this.campaignId}`)
      .then(res =>  {
        this.basicInfo.name = res.data.name || '',
        this.basicInfo.level = res.data.level || '',
        this.basicInfo.class = res.data.class || '',
        this.basicInfo.pfpUrl = res.data.pfpUrl || '',

        this.stats.strength = res.data.strength || 1,
        this.stats.dexterity = res.data.dexterity || 1,
        this.stats.constitution = res.data.constitution || 1,
        this.stats.intelligence = res.data.intelligence || 1,
        this.stats.wisdom = res.data.wisdom || 1,
        this.stats.charisma = res.data.charisma || 1,

        this.saves.strSave = res.data.strSave || 0,
        this.saves.dexSave = res.data.dexSave || 0,
        this.saves.conSave = res.data.conSave || 0,
        this.saves.intSave = res.data.intSave || 0,
        this.saves.wisSave = res.data.wisSave || 0,
        this.saves.chaSave = res.data.chaSave || 0,

        this.skills.acrobatics = res.data.acrobatics || 0,
        this.skills.animalHandling = res.data.animalHandling || 0,
        this.skills.arcana = res.data.arcana || 0,
        this.skills.athletics = res.data.athletics || 0,
        this.skills.history = res.data.history || 0,
        this.skills.insight = res.data.insight || 0,
        this.skills.intimidation = res.data.intimidation || 0,
        this.skills.investigaton = res.data.investigaton || 0,
        this.skills.medicine = res.data.medicine || 0,
        this.skills.nature = res.data.nature || 0,
        this.skills.perception = res.data.perception || 0,
        this.skills.performance = res.data.performance || 0,
        this.skills.persuasion = res.data.persuasion || 0,
        this.skills.religion = res.data.religion || 0,
        this.skills.slightOfHand = res.data.slightOfHand || 0,
        this.skills.stealth = res.data.stealth || 0,
        this.skills.survival = res.data.survival || 0
        
      })
      .then(this.$router.push('/'))

    }

    getStats();

  },

  methods : {

    sumbitCharacterData() {
      let data = {
        name: this.basicInfo.name,
        level: this.basicInfo.level,
        class: this.basicInfo.class,
        pfp: this.basicInfo.pfpUrl,

        strength: this.stats.strength,
        dexterity: this.stats.dexterity,
        constitution: this.stats.constitution,
        intelligence: this.stats.intelligence,
        wisdom: this.stats.wisdom,
        charisma: this.stats.charisma,

        strSave: this.saves.strSave,
        dexSave: this.saves.dexSave,
        conSave: this.saves.conSave,
        intSave: this.saves.intSave,
        wisSave: this.saves.wisSave,
        chaSave: this.saves.chaSave,

        acrobatics: this.skills.acrobatics,
        animalHandling: this.skills.animalHandling,
        arcana: this.skills.arcana,
        athletics: this.skills.athletics,
        history: this.skills.history,
        insight: this.skills.insight,
        intimidation: this.skills.intimidation,
        investigaton: this.skills.investigaton,
        medicine: this.skills.medicine,
        nature: this.skills.nature,
        perception: this.skills.perception,
        performance: this.skills.performance,
        persuasion: this.skills.persuasion,
        religion: this.skills.religion,
        slightOfHand: this.skills.slightOfHand,
        stealth: this.skills.stealth,
        survival: this.skills.survival,

        playerId: this.playerId,
        campaignId: this.campaignId
      }

      axios.post('/setChar', data)
      .then(() => {
        this.submitResponse = true;

        setTimeout(() => {
          this.submitResponse = false;
        }, 2000);
      })
    }
  },


  computed: {


    subStat() {
      return  (stat) => Math.floor((this.stats[stat] -10)/2);
    }

  }
}

</script>