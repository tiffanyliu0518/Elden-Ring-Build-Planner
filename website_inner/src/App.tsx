import { useState, useEffect } from 'react'
import StatsSection from './StatsContainer';
import ArmorSection from './ArmorContainer';
import './App.css'
import WeaponSection from './WeaponContainer';
import TalismanSection from './TalismanContainer';

interface DmgNegation {
  name: string;
  amount: number;
}

interface Resistance {
  name: string;
  amount: number;
}

interface fullArmorItem {
  id: string;
  name: string;
  image: string;
  description: string;
  dmgNegation: DmgNegation[];
  resistance: Resistance[];
  weight: number;
}

interface ArmorStats {
  physical: number;
  strike: number;
  slash: number;
  pierce: number;
  magic: number;
  fire: number;
  lightning: number;
  holy: number;
  immunity: number;
  robustness: number;
  focus: number;
  vitality: number;
  poise: number;
}

interface fullWeaponItem {
  id: string;
  name: string;
  image: string;
  requiredAttributes?: RequiredAttribute[];
}

interface TalismanItem {
  id: string;
  name: string;
}

interface fullTalismanItem {
  id: string;
  name: string;
  image: string;
}

interface Stats {
  vigor: number;
  mind: number;
  endurance: number;
  strength: number;
  dexterity: number;
  intelligence: number;
  faith: number;
  arcane: number;
}

interface RequiredAttribute {
  name: string;
  amount: number;
}

function App() {
  const [selectedHelmet, setSelectedHelmet] = useState<fullArmorItem | null>(null);
  const [selectedChest, setSelectedChest] = useState<fullArmorItem | null>(null);
  const [selectedLegs, setSelectedLegs] = useState<fullArmorItem | null>(null);
  const [selectedGauntlets, setSelectedGauntlets] = useState<fullArmorItem | null>(null);

  const [selectedLWeapon1, setSelectedLWeapon1] = useState<fullWeaponItem | null>(null);
  const [selectedLWeapon2, setSelectedLWeapon2] = useState<fullWeaponItem | null>(null);
  const [selectedLWeapon3, setSelectedLWeapon3] = useState<fullWeaponItem | null>(null);
  const [selectedRWeapon1, setSelectedRWeapon1] = useState<fullWeaponItem | null>(null);
  const [selectedRWeapon2, setSelectedRWeapon2] = useState<fullWeaponItem | null>(null);
  const [selectedRWeapon3, setSelectedRWeapon3] = useState<fullWeaponItem | null>(null);

  const [selectedTalisman1, setSelectedTalisman1] = useState<fullTalismanItem | null>(null);
  const [selectedTalisman2, setSelectedTalisman2] = useState<fullTalismanItem | null>(null);
  const [selectedTalisman3, setSelectedTalisman3] = useState<fullTalismanItem | null>(null);
  const [selectedTalisman4, setSelectedTalisman4] = useState<fullTalismanItem | null>(null);

  const [stats, setStats] = useState<Stats>({
    vigor: 0, mind: 0, endurance: 0, strength: 0, dexterity: 0, intelligence: 0, faith: 0, arcane: 0
  });

  const handleArmorChange = (armorPieces: {
    helmet: fullArmorItem | null;
    chest: fullArmorItem | null;
    legs: fullArmorItem | null;
    gauntlets: fullArmorItem | null;
  }) => {
    setSelectedHelmet(armorPieces.helmet);
    setSelectedChest(armorPieces.chest);
    setSelectedLegs(armorPieces.legs);
    setSelectedGauntlets(armorPieces.gauntlets);
  };

  const handleWeaponsChange = (weapons: {
    LWeapon1: fullWeaponItem | null;
    LWeapon2: fullWeaponItem | null;
    LWeapon3: fullWeaponItem | null;
    RWeapon1: fullWeaponItem | null;
    RWeapon2: fullWeaponItem | null;
    RWeapon3: fullWeaponItem | null;
  }) => {
    setSelectedLWeapon1(weapons.LWeapon1);
    setSelectedLWeapon2(weapons.LWeapon2);
    setSelectedLWeapon3(weapons.LWeapon3);
    setSelectedRWeapon1(weapons.RWeapon1);
    setSelectedRWeapon2(weapons.RWeapon2);
    setSelectedRWeapon3(weapons.RWeapon3);
  };

  const handleTalismanChange = (talismans: {
    talisman1 : fullTalismanItem | null;
    talisman2 : fullTalismanItem | null;
    talisman3 : fullTalismanItem | null;
    talisman4 : fullTalismanItem | null;
  }) => {
    setSelectedTalisman1(talismans.talisman1);
    setSelectedTalisman2(talismans.talisman2);
    setSelectedTalisman3(talismans.talisman3);
    setSelectedTalisman4(talismans.talisman4);
  }


  const calculateStats = (): Stats => {
    const selectedWeapons = [selectedLWeapon1, selectedLWeapon2, selectedLWeapon3,
      selectedRWeapon1, selectedRWeapon2, selectedRWeapon3].filter(weapon => weapon !== null) as fullWeaponItem[];


    const requiredStats: Stats = {
      vigor: 0,
      mind: 0,
      endurance: 0,
      strength: 0,
      dexterity: 0,
      intelligence: 0,
      faith: 0,
      arcane: 0
    };

    const mapping: { [key: string]: keyof Stats } = {
      'Str': 'strength',
      'Dex': 'dexterity',
      'Int': 'intelligence',
      'Arc': 'arcane',
      'Vig': 'vigor',
      'Min': 'mind',
      'End': 'endurance',
      'Fai': 'faith'
    }

    selectedWeapons.forEach(weapon => {
      if (weapon.requiredAttributes) {
        weapon.requiredAttributes?.forEach(attr => {
          const statKey = mapping[attr.name];
          if (statKey) {
            requiredStats[statKey] = Math.max(requiredStats[statKey], attr.amount);
          }
        });
      }
    });
    return requiredStats;
  }

  const calculateArmorStats = (): ArmorStats => {
    const selectedArmor = [selectedHelmet, selectedChest, selectedLegs, selectedGauntlets]
      .filter(armor => armor !== null) as fullArmorItem[];

    const totalArmorStats: ArmorStats = {
      physical: 0, strike: 0, slash: 0, pierce: 0, magic: 0,
      fire: 0, lightning: 0, holy: 0, immunity: 0, robustness: 0,
      focus: 0, vitality: 0, poise: 0
    };

    selectedArmor.forEach(armor => {
      armor.dmgNegation?.forEach(dmg => {
        switch (dmg.name) {
          case 'Phy': totalArmorStats.physical += dmg.amount; break;
          case 'Strike': totalArmorStats.strike += dmg.amount; break;
          case 'Slash': totalArmorStats.slash += dmg.amount; break;
          case 'Pierce': totalArmorStats.pierce += dmg.amount; break;
          case 'Magic': totalArmorStats.magic += dmg.amount; break;
          case 'Fire': totalArmorStats.fire += dmg.amount; break;
          case 'Ligt': totalArmorStats.lightning += dmg.amount; break;
          case 'Holy': totalArmorStats.holy += dmg.amount; break;
        }
      });

      armor.resistance?.forEach(res => {
        switch (res.name) {
          case 'Immunity': totalArmorStats.immunity += res.amount; break;
          case 'Robustness': totalArmorStats.robustness += res.amount; break;
          case 'Focus': totalArmorStats.focus += res.amount; break;
          case 'Vitality': totalArmorStats.vitality += res.amount; break;
          case 'Poise': totalArmorStats.poise += res.amount; break;
        }
      });

    });
    return totalArmorStats;
  }

  return (
    <div className="min-h-screen min-w-screen bg-gray-300 overflow-hidden">

        {/* main layout */}

          {/* left section to select things */}
          <div className="flex-col gap-4 mb-8 flex-1">
            {/* section for armor at the top */}
            <ArmorSection onArmorChange={handleArmorChange} />
            {/* WEAPONS */}
            <WeaponSection onWeaponsChange = {handleWeaponsChange} />
            {/* TALISMANS */}
            <TalismanSection onTalismanChange = {handleTalismanChange} />

            <StatsSection stats={stats} onStatsChange={setStats} requiredStats={calculateStats()}></StatsSection>

          </div>
          <div className="p-4 border border-gray-400 rounded bg-gray-100">
            <h4 className="text-md font-medium mb-2 text-gray-700"> Defenses </h4>
            <div className="flex-cols gap-2 text-sm">
              <div className="flex justify-between">
                <span> Physical: </span>
                <span> {calculateArmorStats().physical} </span>
              </div>

              <div className="flex justify-between">
                <span> VS Strike: </span>
                <span> {calculateArmorStats().strike} </span>
              </div>

              <div className="flex justify-between">
                <span> VS Slash: </span>
                <span> {calculateArmorStats().slash} </span>
              </div>

              <div className="flex justify-between">
                <span> VS Pierce: </span>
                <span> {calculateArmorStats().pierce} </span>
              </div>

              <div className="flex justify-between">
                <span> Magic: </span>
                <span> {calculateArmorStats().magic} </span>
              </div>

              <div className="flex justify-between">
                <span> Fire: </span>
                <span> {calculateArmorStats().fire} </span>
              </div>

              <div className="flex justify-between">
                <span> Lightning: </span>
                <span> {calculateArmorStats().lightning} </span>
              </div>

              <div className="flex justify-between">
                <span> Holy: </span>
                <span> {calculateArmorStats().holy} </span>
              </div>
            </div>
          </div>

          <div>
            <div className="p-4 border border-gray-400 rounded bg-gray-100">
              <h4 className="text-md font-medium mb-2 text-gray-700"> Resistances </h4>
              <div className="flex-cols gap-2 text-sm">
                <div className="flex justify-between">
                  <span> Immunity: </span>
                  <span> {calculateArmorStats().immunity} </span>
                </div>

                <div className="flex justify-between">
                  <span> Robustness: </span>
                  <span> {calculateArmorStats().robustness} </span>
                </div>

                <div className="flex justify-between">
                  <span> Focus: </span>
                  <span> {calculateArmorStats().focus} </span>
                </div>

                <div className="flex justify-between">
                  <span> Vitality: </span>
                  <span> {calculateArmorStats().vitality} </span>
                </div>

                <div className="flex justify-between">
                  <span> Poise: </span>
                  <span> {calculateArmorStats().poise} </span>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default App
