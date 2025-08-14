import { useState, useEffect } from 'react'

interface WeaponItem {
    id: string;
    name: string;
}

interface fullWeaponItem {
    id: string;
    name: string;
    image: string;
    requiredAttributes?: RequiredAttribute[];
}

interface RequiredAttribute {
    name: string;
    amount: number;
}

interface WeaponProperties {
    onWeaponsChange: (weapons: {
        LWeapon1: fullWeaponItem | null;
        LWeapon2: fullWeaponItem | null;
        LWeapon3: fullWeaponItem | null;
        RWeapon1: fullWeaponItem | null;
        RWeapon2: fullWeaponItem | null;
        RWeapon3: fullWeaponItem | null;
    }) => void;
}

const WeaponSection = ({ onWeaponsChange }: WeaponProperties) => {
    const [weapons, setWeapons] = useState<WeaponItem[]>([]);
    const [selectedLWeapon1, setSelectedLWeapon1] = useState<fullWeaponItem | null>(null);
    const [selectedLWeapon2, setSelectedLWeapon2] = useState<fullWeaponItem | null>(null);
    const [selectedLWeapon3, setSelectedLWeapon3] = useState<fullWeaponItem | null>(null);
    const [selectedRWeapon1, setSelectedRWeapon1] = useState<fullWeaponItem | null>(null);
    const [selectedRWeapon2, setSelectedRWeapon2] = useState<fullWeaponItem | null>(null);
    const [selectedRWeapon3, setSelectedRWeapon3] = useState<fullWeaponItem | null>(null);

    useEffect(() => {
        fetch('/data/weapons_dropdown.json').then(res => res.json())
            .then(data => setWeapons(data));
    }, []);

    useEffect(() => {
        onWeaponsChange({
            LWeapon1: selectedLWeapon1,
            LWeapon2: selectedLWeapon2,
            LWeapon3: selectedLWeapon3,
            RWeapon1: selectedRWeapon1,
            RWeapon2: selectedRWeapon2,
            RWeapon3: selectedRWeapon3,
        });
    }, [selectedLWeapon1, selectedLWeapon2, selectedLWeapon3,
        selectedRWeapon1, selectedRWeapon2, selectedRWeapon3, onWeaponsChange]);

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
        };

    const Lweapon1Change = weaponChangeHandler(setSelectedLWeapon1);
    const Lweapon2Change = weaponChangeHandler(setSelectedLWeapon2);
    const Lweapon3Change = weaponChangeHandler(setSelectedLWeapon3);
    const Rweapon1Change = weaponChangeHandler(setSelectedRWeapon1);
    const Rweapon2Change = weaponChangeHandler(setSelectedRWeapon2);
    const Rweapon3Change = weaponChangeHandler(setSelectedRWeapon3);

    return (
        <div className="flex gap-4 mb-8 justify-center">
            {/* left hand stuff */}

            {/* left hand 1 */}
            <div className="text-center">
                <div className="text-xs text-gray-700 mb-2"> Select Left Hand Weapon 1 </div>

                <select className="w-full text-center text-xs mb-2 p-1 border border-gray-400 rounded" onChange={Lweapon1Change}>
                    <option value=""> None </option>
                    {weapons.map(weapon => (
                        <option key={weapon.id} value={weapon.id}> {weapon.name} </option>
                    ))}
                </select>
                <div className="w-18 h-18 bg-black mx-auto">
                    {selectedLWeapon1 && selectedLWeapon1.image && (
                        <img src={selectedLWeapon1.image} alt={selectedLWeapon1.name} className="w-full h-full object-cover" />
                    )}
                </div>
            </div>

            <div className="text-center">
                <div className="text-xs text-gray-700 mb-2"> Select Left Hand Weapon 2 </div>

                <select className="w-full text-center text-xs mb-2 p-1 border border-gray-400 rounded" onChange={Lweapon2Change}>
                    <option value=""> None </option>
                    {weapons.map(weapon => (
                        <option key={weapon.id} value={weapon.id}> {weapon.name} </option>
                    ))}
                </select>
                <div className="w-18 h-18 bg-black mx-auto">
                    {selectedLWeapon2 && selectedLWeapon2.image && (
                        <img src={selectedLWeapon2.image} alt={selectedLWeapon2.name} className="w-full h-full object-cover" />
                    )}
                </div>
            </div>

            <div className="text-center">
                <div className="text-xs text-gray-700 mb-2"> Select Left Hand Weapon 3 </div>

                <select className="w-full text-center text-xs mb-2 p-1 border border-gray-400 rounded" onChange={Lweapon3Change}>
                    <option value=""> None </option>
                    {weapons.map(weapon => (
                        <option key={weapon.id} value={weapon.id}> {weapon.name} </option>
                    ))}
                </select>
                <div className="w-18 h-18 bg-black mx-auto">
                    {selectedLWeapon3 && selectedLWeapon3.image && (
                        <img src={selectedLWeapon3.image} alt={selectedLWeapon3.name} className="w-full h-full object-cover" />
                    )}
                </div>
            </div>

            <div className="text-center">
                <div className="text-xs text-gray-700 mb-2"> Select Right Hand Weapon 1 </div>

                <select className="w-full text-center text-xs mb-2 p-1 border border-gray-400 rounded" onChange={Rweapon1Change}>
                    <option value=""> None </option>
                    {weapons.map(weapon => (
                        <option key={weapon.id} value={weapon.id}> {weapon.name} </option>
                    ))}
                </select>
                <div className="w-18 h-18 bg-black mx-auto">
                    {selectedRWeapon1 && selectedRWeapon1.image && (
                        <img src={selectedRWeapon1.image} alt={selectedRWeapon1.name} className="w-full h-full object-cover" />
                    )}
                </div>
            </div>

            <div className="text-center">
                <div className="text-xs text-gray-700 mb-2"> Select Right Hand Weapon 2 </div>

                <select className="w-full text-center text-xs mb-2 p-1 border border-gray-400 rounded" onChange={Rweapon2Change}>
                    <option value=""> None </option>
                    {weapons.map(weapon => (
                        <option key={weapon.id} value={weapon.id}> {weapon.name} </option>
                    ))}
                </select>
                <div className="w-18 h-18 bg-black mx-auto">
                    {selectedRWeapon2 && selectedRWeapon2.image && (
                        <img src={selectedRWeapon2.image} alt={selectedRWeapon2.name} className="w-full h-full object-cover" />
                    )}
                </div>
            </div>

            <div className="text-center">
                <div className="text-xs text-gray-700 mb-2"> Select Right Hand Weapon 3 </div>

                <select className="w-full text-center text-xs mb-2 p-1 border border-gray-400 rounded" onChange={Rweapon3Change}>
                    <option value=""> None </option>
                    {weapons.map(weapon => (
                        <option key={weapon.id} value={weapon.id}> {weapon.name} </option>
                    ))}
                </select>
                <div className="w-18 h-18 bg-black mx-auto">
                    {selectedRWeapon3 && selectedRWeapon3.image && (
                        <img src={selectedRWeapon3.image} alt={selectedRWeapon3.name} className="w-full h-full object-cover" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default WeaponSection;