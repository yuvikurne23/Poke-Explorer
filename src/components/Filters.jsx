import React, { useState } from 'react';

const typeOptions = ['normal', 'fire', 'water', 'grass', 'electric',
    'ice', 'fighting', 'poison', 'ground', 'flying',
    'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

const Filters = ({
    searchTerm,
    setSearchTerm,
    selectedType,
    setSelectedType,
    allPokemonNames = []
}) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    const filteredSuggestions = allPokemonNames.filter(name =>
        name.toLowerCase().startsWith(searchTerm.toLowerCase()) && searchTerm !== ''
    );

    const handleKeyDown = (e) => {
        if (!showSuggestions || filteredSuggestions.length === 0) return;

        if (e.key === 'ArrowDown') {
            setActiveIndex((prev) => (prev + 1) % filteredSuggestions.length);
        } else if (e.key === 'ArrowUp') {
            setActiveIndex((prev) => (prev - 1 + filteredSuggestions.length) % filteredSuggestions.length);
        } else if (e.key === 'Enter' && activeIndex >= 0) {
            setSearchTerm(filteredSuggestions[activeIndex]);
            setShowSuggestions(false);
            setActiveIndex(-1);
        }
    };

    const handleSuggestionClick = (name) => {
        setSearchTerm(name);
        setShowSuggestions(false);
        setActiveIndex(-1);
    };

    return (
        <div className="filters">
            <div style={{ position: 'relative' }}>
                <input
                    type="text"
                    placeholder="Search by Pokémon name"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowSuggestions(true);
                        setActiveIndex(-1);
                    }}
                    onKeyDown={handleKeyDown}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
                />
                {showSuggestions && filteredSuggestions.length > 0 && (
                    <ul className="suggestions">
                        {filteredSuggestions.map((name, index) => (
                            <li
                                key={name}
                                className={index === activeIndex ? 'active' : ''}
                                onMouseDown={() => handleSuggestionClick(name)}
                            >
                                {name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                <option value="">All Types</option>
                {typeOptions.map((type) => (
                    <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Filters;
