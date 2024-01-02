import React, { useState } from 'react';
const categories = Object.keys(categoryKeywords); // Assuming categoryKeywords is your mapping object
const [selectedCategories, setSelectedCategories] = useState([]);
const [filteredDescriptions, setFilteredDescriptions] = useState([]);

// Function to handle category click
const handleCategoryClick = (category) => {
    setSelectedCategories(prev => [...prev, category]);
    // Filter descriptions based on selected categories
    const descriptions = categories.reduce((acc, cat) => {
        if (selectedCategories.includes(cat)) {
            return acc.concat(categoryKeywords[cat]);
        }
        return acc;
    }, []);
    setFilteredDescriptions(descriptions);
};

// Render categories
const renderCategories = () => {
    return categories.map(category => (
        <div key={category} onClick={() => handleCategoryClick(category)}>
            {category}
        </div>
    ));
};

// Render descriptions
const renderDescriptions = () => {
    return filteredDescriptions.map(description => (
        <div key={description}>
            {description}
        </div>
    ));
};
