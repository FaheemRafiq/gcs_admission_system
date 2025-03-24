// CityContext.tsx
import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';

// Import static fallback cities from a local JSON file
import defaultCities from '@/assets/cities.json';

// Define the shape of the context value
interface CityContextValue {
    cities: string[];
    loading: boolean;
}

// Create the context with an undefined default value
export const CityContext = createContext<CityContextValue | undefined>(undefined);

// Props for the provider
interface CityProviderProps {
    children: ReactNode;
}

/**
 * CityProvider component that fetches cities from a public API.
 * Falls back to local cities from @/assets/cities.json if the API fails.
 */
export const CityProvider: React.FC<CityProviderProps> = ({ children }) => {
    const [cities, setCities] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchCities = useCallback(async () => {
        setLoading(true);
        try {
            // Fetch cities from the public API (countriesnow.space)
            const response = await fetch('https://countriesnow.space/api/v0.1/countries/cities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ country: 'Pakistan' }), // Case-sensitive: "Pakistan"
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: { error: boolean; data: string[] } = await response.json();

            if (data.error) {
                throw new Error('API returned an error');
            }

            setCities([...data.data].sort()); // Sort cities alphabetically
        } catch (error) {
            console.error('Failed to fetch cities from API:', error);
            // Fallback to local cities from @/assets/cities.json
            setCities([...defaultCities].sort());
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCities();
    }, []);

    // Context value
    const value: CityContextValue = {
        cities,
        loading,
    };

    return (
        <CityContext.Provider value={value}>
            {children}
        </CityContext.Provider>
    );
};

// Custom hook for consuming the context with type safety
export const useCityContext = (): CityContextValue => {
    const context = React.useContext(CityContext);
    if (context === undefined) {
        throw new Error('useCityContext must be used within a CityProvider');
    }
    return context;
};