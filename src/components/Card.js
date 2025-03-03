import React, { useState } from 'react'
import style from '../styles/globals.css'
import axios from 'axios'

const Card = (props) => {
  const [abilityName, setAbilityName] = useState('')
  const [abilityDesc, setAbilityDesc] = useState('')
  const [toggleInfo, setToggleInfo] = useState(false)
  const getAbility = async (idx) => {
    setToggleInfo(!toggleInfo)
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idx + 1}`)
    setAbilityName(res.data.abilities[0].ability.name)
    const abilityDes = await axios.get(res.data.abilities[0].ability.url)

    abilityDes.data.effect_entries.map((item) => {
      if (item.language.name === 'en') {
        setAbilityDesc(item.effect)
        return
      }
    })
  }
  return (
    <div>
      <div
        onMouseEnter={() => getAbility(props.id + 1)}
        onMouseLeave={() => setToggleInfo(false)}
        className="m-5 p-1 w-[200px]  shadow-lg rounded-lg flex flex-col items-center cursor-pointer hover:shadow-2xl transition-all
        bg-pink-50 bg-clip-padding backdrop-filter bg-opacity-30 hover:scale-110
        hover:bg-gradient-to-r from-yellow-300 to-red-500 hover:text-gray-100"
      >
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id + 1}.png`} alt=""></img>
        {props.name}
      </div>
      {toggleInfo && (
        <div className="ml-3 border-4 border-grey-500  absolute flex flex-col items-center w-[220px]  bg-white rounded-lg  p-2">
          <h1 className="text-lg font-bold">{abilityName || 'Loading'}</h1>
          <p className="text-sm">{abilityDesc || 'Loading'}</p>
        </div>
      )}
    </div>
  )
}

export default Card
