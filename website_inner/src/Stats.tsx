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
    requiredStats: Stats;
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

const emptyStats: Stats = {
  vigor: 0,
  mind: 0,
  endurance: 0,
  strength: 0,
  dexterity: 0,
  intelligence: 0,
  faith: 0,
  arcane: 0
};

const StatsSection = ({ stats, onStatsChange, requiredStats = emptyStats}: StatsProperties) => {
    const handleStatChange = (statName: keyof Stats, value: string) => {
        const v = Math.max(0, Math.min(99, parseInt(value) || 0));
        onStatsChange({ ... stats, [statName]: v});
    };

    return (
        <div className = "bg-gray-200 p-6">
            <h3 className = "text-lg font-semibold text-gray-800 mb-4 text-center"> Character Stats </h3>
                <div className = "flex gap-6">
                    {/* required stats parts */}
                    <div className = "flex-1">
                        <h4 className = "font-sm mb-2 text-gray-800"> Required Level </h4>
                        <div className = "space-y-2">
                            {labels.map(({key, label}) => (
                                <div key = {key} className = "flex items-center gap-4">
                                    <span className = {"w-28 text-xs font-sm"}> {label}</span>
                                    <div className = "w-10 h-8 text-center text-xs"> {requiredStats[key] || '-'}
                                    </div>
                                </div>
                          ))}
                    </div>
                </div>

        <div className = "flex-1">
            <h4 className = "font-sm text-gray-800 mb-2"> Current Level </h4>
            <div className = "space-y-2">
                {labels.map(({key}) => (
                    <div key = {key} className = "flex items-center gap-4">
                        <input type = "number" max = "99" value = {stats[key]}
                            onChange = {(e) => handleStatChange(key, e.target.value)}
                            className = "w-10 h-8 text-xs text-center">
                        </input>
                    </div>

                ))}
            </div>
        </div>
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