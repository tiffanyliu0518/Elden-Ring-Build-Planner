import { useState, useEffect } from 'react'

interface TalismanItem {
    id: string;
    name: string;
}

interface fullTalismanItem {
    id: string;
    name: string;
    image: string;
}

interface TalismanProperties {
    onTalismanChange: (talismans: {
        talisman1: fullTalismanItem | null;
        talisman2: fullTalismanItem | null;
        talisman3: fullTalismanItem | null;
        talisman4: fullTalismanItem | null;
    }) => void;
}

const TalismanSection = ({ onTalismanChange }: TalismanProperties) => {
    const [talismans, setTalismans] = useState<TalismanItem[]>([]);
    const [selectedTalisman1, setSelectedTalisman1] = useState<fullTalismanItem | null>(null);
    const [selectedTalisman2, setSelectedTalisman2] = useState<fullTalismanItem | null>(null);
    const [selectedTalisman3, setSelectedTalisman3] = useState<fullTalismanItem | null>(null);
    const [selectedTalisman4, setSelectedTalisman4] = useState<fullTalismanItem | null>(null);

    useEffect(() => {
        fetch('/data/talismans_dropdown.json').then(res => res.json())
            .then(data => setTalismans(data))
    }, []);

    useEffect(() => {
        onTalismanChange({
            talisman1: selectedTalisman1,
            talisman2: selectedTalisman2,
            talisman3: selectedTalisman3,
            talisman4: selectedTalisman4,
        });
    }, [selectedTalisman1, selectedTalisman2, selectedTalisman3, selectedTalisman4]);

    const talismanChangeHandler = (setSelectedTalisman: (weapon: fullTalismanItem | null) => void) =>
        async (e: React.ChangeEvent<HTMLSelectElement>) => {
            const check = e.target.value;
            if (!check) {
                setSelectedTalisman(null);
                return;
            }

            const response = await fetch('/data/talismans.json');
            const fullTalismans = await response.json();
            const talisman = fullTalismans.find((w: fullTalismanItem) => w.id === check);
            setSelectedTalisman(talisman || null);
        }

    const Talisman1Change = talismanChangeHandler(setSelectedTalisman1);
    const Talisman2Change = talismanChangeHandler(setSelectedTalisman2);
    const Talisman3Change = talismanChangeHandler(setSelectedTalisman3);
    const Talisman4Change = talismanChangeHandler(setSelectedTalisman4);

    const TalismanSelector = ({ label, selectedTalisman, onChange }: {
        label: string, selectedTalisman: fullTalismanItem | null;
        onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    }) => (
        <div className="text-center">
            <div className="text-xs text-gray-700 mb-2"> {label} </div>

            <select className="w-full text-center text-xs mb-2 p-1 border border-gray-400 rounded" onChange={onChange}>
                <option value=""> None </option>
                {talismans.map(talisman => (
                    <option key={talisman.id} value={talisman.id}> {talisman.name} </option>
                ))}
            </select>
            <div className="w-18 h-18 bg-black mx-auto">
                {selectedTalisman && selectedTalisman.image && (
                    <img src={selectedTalisman.image} alt={selectedTalisman.name} className="w-full h-full object-cover" />
                )}
            </div>
        </div>
    );

    return (
        <div className = "flex gap-4 mb-8 justify-center">
            <TalismanSelector label = "Select Talisman 1" selectedTalisman = {selectedTalisman1} onChange = {Talisman1Change} />
            <TalismanSelector label = "Select Talisman 2" selectedTalisman = {selectedTalisman2} onChange = {Talisman2Change} />
            <TalismanSelector label = "Select Talisman 3" selectedTalisman = {selectedTalisman3} onChange = {Talisman3Change} />
            <TalismanSelector label = "Select Talisman 4" selectedTalisman = {selectedTalisman4} onChange = {Talisman4Change} />
        </div>
    );

};

export default TalismanSection;