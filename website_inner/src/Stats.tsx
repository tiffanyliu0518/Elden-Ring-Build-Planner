import {useState} from 'react';

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

interface StatsProperties {
    stats: Stats;
    onStatsChange: (newStats: Stats) => void;
    requiredStats?: Partial<Stats>;
}

const labels = [
    {key: 'vigor' as keyof Stats, label: 'Vigor', color: 'text-red-600'},
    {key: 'mind' as keyof Stats, label: 'Mind', color: 'text-purple-600'},
    {key: 'endurance' as keyof Stats, label: 'Endurance', color: 'text-green-600'},
    {key: 'strength' as keyof Stats, label: 'Strength', color: 'text-purple-600'},
    {key: 'dexterity' as keyof Stats, label: 'Dexterity', color: 'text-orange-600'},
    {key: 'intelligence' as keyof Stats, label: 'Intelligence', color: 'text-blue-600'},
    {key: 'faith' as keyof Stats, label: 'Faith', color: 'text-yellow-600'},
    {key: 'arcane' as keyof Stats, label: 'Arcane', color: 'text-pink-600'},
    ];

const StatsSection = ({ stats, onStatsChange, requiredStats = {}}: StatsProperties) => {
    const handleStatChange = (statName: keyof Stats, value: string) => {
        const v = Math.max(0, Math.min(99, parseInt(value) || 0));
        onStatsChange({ ... stats, [statName]: v});
    };

    return (
        <div className = "bg-gray-200 p-3 shadow-md">
            <h3 className = "space-y-2 text-sm font-semibold text-gray-800 mb-4 text-center"> Character Stats </h3>
            <div className = "flex-cols gap-4 max-w-4xl mx-auto">
                {labels.map(({key, label}) => (
                    <div key = {key} className = "flex items-center gap-4">
                        <label className = {`text-xs w-32 font-medium mb-2`}> {label} </label>
                        <input type = "number" min = "0" max = "99" value = {stats[key]}
                            onChange = {(e) => handleStatChange(key, e.target.value)}
                            className = "w-10 h-8 text-xs text-center">
                        </input>
                    </div>

                ))}
        </div>

        <div className = "mt-4 w-1/2">
            <div className = "text-xs text-gray-600">
                Total Level: <span className = "font font-semibold text-gray-800">
                    {Object.values(stats).reduce((sum, stat) => sum + stat, 0)}
                </span>
            </div>
        </div>
    </div>
    );
};

export default StatsSection;