const getDescription = async url => {
  const species = await fetch(url).then(res => res.json())
  const description = species?.flavor_text_entries.filter(i =>
    i.language.name === 'en'
  )
  return description
}

export default getDescription