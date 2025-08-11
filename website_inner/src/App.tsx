import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

interface ArmorItem {
  id: string;
  name: string;
}
interface fullArmorItem {
  id: string;
  name: string;
  image: string;
}

interface WeaponItem {
  id: string;
  name: string;
}

interface fullWeaponItem {
  id: string;
  name: string;
  image: string;
}


function App() {
  const [helmets, setHelmets] = useState<ArmorItem[]>([]);
  const [chests, setChests] = useState<ArmorItem[]>([]);
  const [legs, setLegs] = useState<ArmorItem[]>([]);
  const [gauntlets, setGauntlets] = useState<ArmorItem[]>([]);

  const [selectedHelmet, setSelectedHelmet] = useState<fullArmorItem | null>(null);
  const [selectedChest, setSelectedChest] = useState<fullArmorItem | null>(null);
  const [selectedLegs, setSelectedLegs] = useState<fullArmorItem | null>(null);
  const [selectedGauntlets, setSelectedGauntlets] = useState<fullArmorItem | null>(null);

  const [weapons, setWeapons] = useState<WeaponItem[]> ([]);
  const [selectedLWeapon1, setSelectedLWeapon1] = useState<fullWeaponItem | null>(null);
  const [selectedLWeapon2, setSelectedLWeapon2] = useState<fullWeaponItem | null>(null);
  const [selectedLWeapon3, setSelectedLWeapon3] = useState<fullWeaponItem | null>(null);
  const [selectedRWeapon1, setSelectedRWeapon1] = useState<fullWeaponItem | null>(null);
  const [selectedRWeapon2, setSelectedRWeapon2] = useState<fullWeaponItem | null>(null);
  const [selectedRWeapon3, setSelectedRWeapon3] = useState<fullWeaponItem | null>(null);


  useEffect(() => {

    fetch('/data/helmets_dropdown.json').then(res => res.json())
      .then(data => setHelmets(data))

    fetch('/data/chests_dropdown.json').then(res => res.json())
      .then(data => setChests(data))
    
    fetch('/data/legs_dropdown.json').then(res => res.json())
      .then(data => setLegs(data))

    fetch('/data/gauntlets_dropdown.json').then(res => res.json())
      .then(data => setGauntlets(data))

      fetch('/data/weapons_dropdown.json').then(res => res.json())
      .then(data => setWeapons(data))
    }, []);

    const helmetChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
      const check = e.target.value;
      if (!check) {
        setSelectedHelmet(null);
        return;
      }

      const response = await fetch('/data/helmets.json');
      const fullHelmets = await response.json();
      const helmet = fullHelmets.find((h: fullArmorItem) => h.id === check);
      setSelectedHelmet(helmet || null);
    }

    const chestChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
      const check = e.target.value;
      if (!check) {
        setSelectedChest(null);
        return;
      }

      const response = await fetch('data/chests.json');
      const fullChests = await response.json();
      const chest = fullChests.find((h: fullArmorItem) => h.id === check);
      setSelectedChest(chest || null);
    }

    const gauntletChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
      const check = e.target.value;
      if (!check) {
        setSelectedGauntlets(null);
        return;
      }

      const response = await fetch('data/gauntlets.json');
      const fullGaunts = await response.json();
      const gauntlet = fullGaunts.find((h: fullArmorItem) => h.id === check);
      setSelectedGauntlets(gauntlet || null);
    }

    const legsChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
      const check = e.target.value;
      if (!check) {
        setSelectedLegs(null);
        return;
      }

      const response = await fetch('data/legs.json');
      const fullLegs = await response.json();
      const legs = fullLegs.find((h: fullArmorItem) => h.id === check);
      setSelectedLegs(legs || null);
    }

    const weaponChangeHandler = (setSelectedWeapon: (weapon: fullWeaponItem | null) => void) =>
      async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const check = e.target.value;
        if (!check) {
          setSelectedWeapon(null);
          return;
        }

        const response = await fetch('/data/weapons.json');
        const fullWeapons = await response.json();
        const weapon = fullWeapons.find((w: fullWeaponItem) => w.id === check);
        setSelectedWeapon(weapon || null);
      }

    const Lweapon1Change = weaponChangeHandler(setSelectedLWeapon1);
    const Lweapon2Change = weaponChangeHandler(setSelectedLWeapon2);
    const Lweapon3Change = weaponChangeHandler(setSelectedLWeapon3);
    const Rweapon1Change = weaponChangeHandler(setSelectedRWeapon1);
    const Rweapon2Change = weaponChangeHandler(setSelectedRWeapon2);
    const Rweapon3Change = weaponChangeHandler(setSelectedRWeapon3);




  return (
    <div className = " bg-gray-300 p-6">

      <div className = "w-full">

      {/* main layout */}
      <div className = "flex gap-6 justify-center">

        {/* left section to select things */}
        <div className = "flex flex-col gap-4 mb-8">

          {/* section for armor at the top */}
          <div className = "flex gap-4 mb-8 justify-center">

            {/* helemt stuff */}
            <div className = "text-center">
              <div className = "text-sm text-gray-700 mb-2"> Select Helmet </div>

              <select className = "w-full text-center text-sm mb-2 p-1 border border-gray-400 rounded" onChange = {helmetChange}>
                <option value = ""> None </option> 
                {helmets.map (helmet => (
                  <option key = {helmet.id} value = {helmet.id}> {helmet.name} </option>
                ))}
              </select>
              <div className = "w-24 h-24 bg-black mx-auto">
                {selectedHelmet && selectedHelmet.image && (
                  <img src = {selectedHelmet.image} alt = {selectedHelmet.name} className = "w-full h-full object-cover"/>
                )}
              </div>
            </div>

            {/* chestpieces */}
            <div className = "text-center">
              <div className = "text-sm text-gray-700 mb-2"> Select Chest Piece </div>

              <select className = "w-full text-center text-sm mb-2 p-1 border border-gray-400 rounded" onChange = {chestChange}>
                <option value = ""> None </option> 
                {chests.map (chest => (
                  <option key = {chest.id} value = {chest.id}> {chest.name} </option>
                ))}
              </select>
              <div className = "w-24 h-24 bg-black mx-auto">
                {selectedChest && selectedChest.image && (
                  <img src = {selectedChest.image} alt = {selectedChest.name} className = "w-full h-full object-cover"/>
                )}
              </div>
            </div>

            {/* gauntlets */}
            <div className = "text-center">
              <div className = "text-sm text-gray-700 mb-2"> Select Gauntlets </div>

              <select className = "w-full text-center text-sm mb-2 p-1 border border-gray-400 rounded" onChange = {gauntletChange}>
                <option value = ""> None </option> 
                {gauntlets.map (gauntlet => (
                  <option key = {gauntlet.id} value = {gauntlet.id}> {gauntlet.name} </option>
                ))}
              </select>
              <div className = "w-24 h-24 bg-black mx-auto">
                {selectedGauntlets && selectedGauntlets.image && (
                  <img src = {selectedGauntlets.image} alt = {selectedGauntlets.name} className = "w-full h-full object-cover"/>
                )}
              </div>
            </div>

            {/* legs */}
            <div className = "text-center">
              <div className = "text-sm text-gray-700 mb-2"> Select Leg Piece </div>

              <select className = "w-full text-center text-sm mb-2 p-1 border border-gray-400 rounded" onChange = {legsChange}>
                <option value = ""> None </option> 
                {legs.map (leg => (
                  <option key = {leg.id} value = {leg.id}> {leg.name} </option>
                ))}
              </select>
              <div className = "w-24 h-24 bg-black mx-auto">
                {selectedLegs && selectedLegs.image && (
                  <img src = {selectedLegs.image} alt = {selectedLegs.name} className = "w-full h-full object-cover"/>
                )}
              </div>
            </div>
          </div>


          {/* WEAPONS */}
          <div className = "flex gap-4 justify-center">
              {/* left hand stuff */}

            {/* left hand 1 */}
            <div className = "text-center">
              <div className = "text-xs text-gray-700 mb-2"> Select Left Hand Weapon 1 </div>

              <select className = "w-full text-center text-xs mb-2 p-1 border border-gray-400 rounded" onChange = {Lweapon1Change}>
                <option value = ""> None </option> 
                {weapons.map (weapon => (
                  <option key = {weapon.id} value = {weapon.id}> {weapon.name} </option>
                ))}
              </select>
              <div className = "w-18 h-18 bg-black mx-auto">
                {selectedLWeapon1 && selectedLWeapon1.image && (
                  <img src = {selectedLWeapon1.image} alt = {selectedLWeapon1.name} className = "w-full h-full object-cover"/>
                )}
              </div>
            </div>

            <div className = "text-center">
              <div className = "text-xs text-gray-700 mb-2"> Select Left Hand Weapon 2 </div>

              <select className = "w-full text-center text-xs mb-2 p-1 border border-gray-400 rounded" onChange = {Lweapon2Change}>
                <option value = ""> None </option> 
                {weapons.map (weapon => (
                  <option key = {weapon.id} value = {weapon.id}> {weapon.name} </option>
                ))}
              </select>
              <div className = "w-18 h-18 bg-black mx-auto">
                {selectedLWeapon2 && selectedLWeapon2.image && (
                  <img src = {selectedLWeapon2.image} alt = {selectedLWeapon2.name} className = "w-full h-full object-cover"/>
                )}
              </div>
            </div>

            <div className = "text-center">
              <div className = "text-xs text-gray-700 mb-2"> Select Left Hand Weapon 3 </div>

              <select className = "w-full text-center text-xs mb-2 p-1 border border-gray-400 rounded" onChange = {Lweapon3Change}>
                <option value = ""> None </option> 
                {weapons.map (weapon => (
                  <option key = {weapon.id} value = {weapon.id}> {weapon.name} </option>
                ))}
              </select>
              <div className = "w-18 h-18 bg-black mx-auto">
                {selectedLWeapon3 && selectedLWeapon3.image && (
                  <img src = {selectedLWeapon3.image} alt = {selectedLWeapon3.name} className = "w-full h-full object-cover"/>
                )}
              </div>
            </div>

            <div className = "text-center">
              <div className = "text-xs text-gray-700 mb-2"> Select Right Hand Weapon 1 </div>

              <select className = "w-full text-center text-xs mb-2 p-1 border border-gray-400 rounded" onChange = {Rweapon1Change}>
                <option value = ""> None </option> 
                {weapons.map (weapon => (
                  <option key = {weapon.id} value = {weapon.id}> {weapon.name} </option>
                ))}
              </select>
              <div className = "w-18 h-18 bg-black mx-auto">
                {selectedRWeapon1 && selectedRWeapon1.image && (
                  <img src = {selectedRWeapon1.image} alt = {selectedRWeapon1.name} className = "w-full h-full object-cover"/>
                )}
              </div>
            </div>

            <div className = "text-center">
              <div className = "text-xs text-gray-700 mb-2"> Select Right Hand Weapon 2 </div>

              <select className = "w-full text-center text-xs mb-2 p-1 border border-gray-400 rounded" onChange = {Rweapon2Change}>
                <option value = ""> None </option> 
                {weapons.map (weapon => (
                  <option key = {weapon.id} value = {weapon.id}> {weapon.name} </option>
                ))}
              </select>
              <div className = "w-18 h-18 bg-black mx-auto">
                {selectedRWeapon2 && selectedRWeapon2.image && (
                  <img src = {selectedRWeapon2.image} alt = {selectedRWeapon2.name} className = "w-full h-full object-cover"/>
                )}
              </div>
            </div>

            <div className = "text-center">
              <div className = "text-xs text-gray-700 mb-2"> Select Right Hand Weapon 3 </div>

              <select className = "w-full text-center text-xs mb-2 p-1 border border-gray-400 rounded" onChange = {Rweapon3Change}>
                <option value = ""> None </option> 
                {weapons.map (weapon => (
                  <option key = {weapon.id} value = {weapon.id}> {weapon.name} </option>
                ))}
              </select>
              <div className = "w-18 h-18 bg-black mx-auto">
                {selectedRWeapon3 && selectedRWeapon3.image && (
                  <img src = {selectedRWeapon3.image} alt = {selectedRWeapon3.name} className = "w-full h-full object-cover"/>
                )}
              </div>
            </div>

          </div>

        </div>
        </div>
      </div>
    </div>
  )
}

export default App
