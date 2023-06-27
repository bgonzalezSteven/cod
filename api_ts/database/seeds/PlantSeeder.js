'use strict'

/*
|--------------------------------------------------------------------------
| PlantSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

const Plant = use('App/Models/Plant')
const RoleUserData = [
  {
    id: 1,
    plant: 'Saccharum officinarum'
  },
  {
    id: 2,
    plant: 'Triticum aestivum'
  },
  {
    id: 3,
    plant: 'Glycine max'
  },
  {
    id: 4,
    plant: 'Zea mays'
  },
  {
    id: 5,
    plant: 'Phaseolus vulgaris'
  },
  {
    id: 6,
    plant: 'Sorghum bicolor'
  },
  {
    id: 7,
    plant: 'Oryza sativa'
  }
]
class PlantSeeder {
  async run () {
    for (let i in RoleUserData) {
      let dates = await Plant.find(RoleUserData[i].id)
      if(!dates) {
        await Plant.create(RoleUserData[i])
      } else {
        dates.name = RoleUserData[i].name,
        dates.email = RoleUserData[i].email,
        dates.password = RoleUserData[i].password
        dates.save()
      }
    }
      console.log('Plant Finish')
  }
}

module.exports = PlantSeeder
