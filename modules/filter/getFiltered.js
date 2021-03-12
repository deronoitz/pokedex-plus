const getFilteredHeight = async (data, height) => {
  const isShort = value => value <= 10
  const isMedium = value => value <= 15 && value > 10
  const isTall = value => value >= 15
  let filterHeight;
  switch (height) {
    case 'short':
      filterHeight = isShort
      break;
    case 'medium':
      filterHeight = isMedium
      break;
    case 'tall':
      filterHeight = isTall
      break;
    default:
      filterHeight = value => value
      break;
  }
  return data.filter(i => filterHeight(i.height))
}

const getFilteredWeight = async (data, weight) => {
  const isShort = value => value <= 100
  const isMedium = value => value <= 500 && value > 100
  const isHeavy = value => value >= 500
  let filterWeight;
  switch (weight) {
    case 'light':
      filterWeight = isShort
      break;
    case 'medium':
      filterWeight = isMedium
      break;
    case 'heavy':
      filterWeight = isHeavy
      break;
    default:
      filterWeight = value => value
      break;
  }
  return data.filter(i => filterWeight(i.weight))
}

const getFilteredAbility = async (data, ability) => {
  return ability !== 'all' ? 
    data.filter(i => i.abilities.filter(j => j.ability.name === ability).length > 0) 
    : 
    data
}

const getFilteredType = async (data, types) => {
  let temp = []
  if(typeof types === 'string'){
    temp = data.filter(i => i.types.filter(j => j.type.name === types).length > 0)
  } else {
    for(let type of types){
      temp = [
        ...temp,
        ...data.filter(i => i.types.filter(j => j.type.name === type).length > 0)
      ]
    }
  }
  return types.length !== 0 ? temp :  data
}

const getFiltered = async (data, filter) => {
  const { weight, height, ability, type } = filter
  let filtered = data
  filtered = await getFilteredWeight(filtered, weight)
  filtered = await getFilteredHeight(filtered, height)
  filtered = await getFilteredAbility(filtered, ability)
  filtered = await getFilteredType(filtered, type || [])
  return filtered
}

export default getFiltered