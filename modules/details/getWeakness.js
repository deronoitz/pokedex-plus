const getWeakness = async types => {
  let weakness = []
  await Promise.all(
    types.map(async data => {
      const response = await fetch(data.type.url)
      const types_arr = await response.json()
      const twice_damage_from = types_arr.damage_relations.double_damage_from
      weakness = [...weakness, ...twice_damage_from]
    })
  )
  weakness = weakness.map(item => item.name)
    .filter((value, index, self) => self.indexOf(value) === index)
  return weakness
}

export default getWeakness