import React, { useContext } from 'react';
import { MapPinIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useCityContext } from '@/contexts/CityContext';

interface PakistanCitySelectProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    selectId?: string;
    isError?: string | undefined;
}

export const PakistanCitySelect = React.memo(({
    value,
    onChange,
    placeholder = 'Select a city',
    className,
    selectId = 'pakistan-city',
    isError
} : PakistanCitySelectProps) => {
    const { cities, loading } = useCityContext();

    return (
        <div className="relative">
            <div className="flex w-full items-center">
                <div className="pointer-events-none absolute left-3 flex items-center justify-center text-muted-foreground/80">
                    <MapPinIcon size={16} strokeWidth={2} aria-hidden="true" />
                </div>
                <Select
                    value={value}
                    onValueChange={onChange}
                    disabled={loading}
                >
                    <SelectTrigger
                        id={selectId}
                        className={cn('w-full border pl-9', isError ? 'border-red-500' : '', className)}
                    >
                        <SelectValue placeholder={loading ? 'Loading cities...' : placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {cities.map((city) => (
                            <SelectItem key={city} value={city}>
                                {city}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            {isError && <p className="mt-1 text-sm text-red-500">{isError}</p>}
        </div>
    );
});