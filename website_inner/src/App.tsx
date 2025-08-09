import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

interface ArmorItem {
  id: string;
  name: string;
}

function App() {
  const [helmets, setHelmets] = useState<ArmorItem[]>([]);
  const [chests, setChests] = useState<ArmorItem[]>([]);
  const [legs, setLegs] = useState<ArmorItem[]>([]);
  const [gauntlets, setGauntlets] = useState<ArmorItem[]>([]);

  useEffect(() => {
    fetch('/data/helmets_dropdown.json').then(res => res.json())
      .then(data => setHelmets(data))

    fetch('/data/chests_dropdown.json').then(res => res.json())
      .then(data => setChests(data))
    
    fetch('/data/legs_dropdown.json').then(res => res.json())
      .then(data => setLegs(data))

    fetch('/data/gauntlets_dropdown.json').then(res => res.json())
      .then(data => setGauntlets(data))
    }, []);


  return (
    <div className = "App">

        <div>
          <label>Helmet: </label>
          <select name = "dropdown" className='text-center'>
            <option> None </option>
            {helmets.map(helmet => (
              <option key = {helmet.id} value = {helmet.id}> {helmet.name} </option>
            ))}
          </select>
        </div>

        <div>
          <label>Chest: </label>
          <select name = "dropdown" className='text-center'>
            <option> None </option>
            {chests.map(chest => (
              <option key = {chest.id} value = {chest.id}> {chest.name} </option>
            ))}
          </select>
        </div>


    </div>
  )
}

export default App
