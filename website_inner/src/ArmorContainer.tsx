import { useState, useEffect } from 'react'

interface ArmorItem {
  id: string;
  name: string;
}
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

interface ArmorProperties {
  onArmorChange: (armorPieces: {
    helmet: fullArmorItem | null;
    chest: fullArmorItem | null;
    legs: fullArmorItem | null;
    gauntlets: fullArmorItem | null;
  }) => void;
}

const ArmorSection = ({ onArmorChange }: ArmorProperties) => {
  const [helmets, setHelmets] = useState<ArmorItem[]>([]);
  const [chests, setChests] = useState<ArmorItem[]>([]);
  const [legs, setLegs] = useState<ArmorItem[]>([]);
  const [gauntlets, setGauntlets] = useState<ArmorItem[]>([]);

  const [selectedHelmet, setSelectedHelmet] = useState<fullArmorItem | null>(null);
  const [selectedChest, setSelectedChest] = useState<fullArmorItem | null>(null);
  const [selectedLegs, setSelectedLegs] = useState<fullArmorItem | null>(null);
  const [selectedGauntlets, setSelectedGauntlets] = useState<fullArmorItem | null>(null);

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

  useEffect(() => {
    onArmorChange({
      helmet: selectedHelmet,
      chest: selectedChest,
      legs: selectedLegs,
      gauntlets: selectedGauntlets
    });
  }, [selectedHelmet, selectedChest, selectedLegs, selectedGauntlets]);

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
  };

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
  };

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
  };

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
  };

  return (
    <div className="flex gap-4 mb-8 justify-center">

      {/* helemt stuff */}
      <div className="text-center">
        <div className="text-sm text-gray-700 mb-2"> Select Helmet </div>

        <select className="w-full text-center text-sm mb-2 p-1 border border-gray-400 rounded" onChange={helmetChange}>
          <option value=""> None </option>
          {helmets.map(helmet => (
            <option key={helmet.id} value={helmet.id}> {helmet.name} </option>
          ))}
        </select>
        <div className="w-24 h-24 bg-black mx-auto">
          {selectedHelmet && selectedHelmet.image && (
            <img src={selectedHelmet.image} alt={selectedHelmet.name} className="w-full h-full object-cover" />
          )}
        </div>
      </div>

      {/* chestpieces */}
      <div className="text-center">
        <div className="text-sm text-gray-700 mb-2"> Select Chest Piece </div>

        <select className="w-full text-center text-sm mb-2 border border-gray-400 rounded" onChange={chestChange}>
          <option value=""> None </option>
          {chests.map(chest => (
            <option key={chest.id} value={chest.id}> {chest.name} </option>
          ))}
        </select>
        <div className="w-24 h-24 bg-black mx-auto">
          {selectedChest && selectedChest.image && (
            <img src={selectedChest.image} alt={selectedChest.name} className="w-full h-full object-cover" />
          )}
        </div>
      </div>

      {/* gauntlets */}
      <div className="text-center">
        <div className="text-sm text-gray-700 mb-2"> Select Gauntlets </div>

        <select className="w-full text-center text-sm mb-2 p-1 border border-gray-400 rounded" onChange={gauntletChange}>
          <option value=""> None </option>
          {gauntlets.map(gauntlet => (
            <option key={gauntlet.id} value={gauntlet.id}> {gauntlet.name} </option>
          ))}
        </select>
        <div className="w-24 h-24 bg-black mx-auto">
          {selectedGauntlets && selectedGauntlets.image && (
            <img src={selectedGauntlets.image} alt={selectedGauntlets.name} className="w-full h-full object-cover" />
          )}
        </div>
      </div>

      {/* legs */}
      <div className="text-center">
        <div className="text-sm text-gray-700 mb-2"> Select Leg Piece </div>

        <select className="w-full text-center text-sm mb-2 p-1 border border-gray-400 rounded" onChange={legsChange}>
          <option value=""> None </option>
          {legs.map(leg => (
            <option key={leg.id} value={leg.id}> {leg.name} </option>
          ))}
        </select>
        <div className="w-24 h-24 bg-black mx-auto">
          {selectedLegs && selectedLegs.image && (
            <img src={selectedLegs.image} alt={selectedLegs.name} className="w-full h-full object-cover" />
          )}
        </div>
      </div>
    </div>

  );

};

export default ArmorSection;