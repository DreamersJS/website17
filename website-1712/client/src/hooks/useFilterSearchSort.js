import { useMemo } from 'react';

function getNestedValue(obj, path) {
    const parts = path.split('.');
    let current = obj;
    for (let part of parts) {
        if (Array.isArray(current)) {
            // If current is array, flatten and extract part from each item
            current = current.flatMap(item => getNestedValue(item, parts.slice(parts.indexOf(part)).join('.')));
            break; // handled in recursion
        }
        if (!current || !Object.prototype.hasOwnProperty.call(current, part)) {
            return '';
        }
        current = current[part];
    }
    return current;
}

export const useFilterSearchSort = ({
    items,
    searchQuery = '',
    searchKeys = [],
    categoryKey = '',
    selectedCategory = '',
    sortKeys = [],
}) => {
    return useMemo(() => {
        let filtered = [...items];

        // Filter by category
        if (selectedCategory && categoryKey) {
            filtered = filtered.filter(
                (item) =>
                    getValue(item, categoryKey)?.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        // Filter by search
        if (searchQuery && searchKeys.length > 0) {
            const searchWords = searchQuery.toLowerCase().trim().split(/\s+/);
            filtered = filtered.filter((item) =>
                searchWords.some((word) =>
                    searchKeys.some((key) => {
                        const value = getNestedValue(item, key);
                        if (Array.isArray(value)) {
                            return value
                                .map((v) => v?.toString().toLowerCase())
                                .some((v) => v.includes(word));
                        }
                        return value?.toString().toLowerCase().includes(word);
                    })
                )
            );
        }

        // Sort by multiple keys
        if (sortKeys.length > 0) {
            filtered.sort((a, b) => {
                for (const { key, order } of sortKeys) {
                    const aVal = getValue(a, key);
                    const bVal = getValue(b, key);

                    let result = 0;
                    if (typeof aVal === 'string' && typeof bVal === 'string') {
                        result = aVal.localeCompare(bVal);
                    } else if (typeof aVal === 'number' && typeof bVal === 'number') {
                        result = aVal - bVal;
                    } else if (aVal instanceof Date || bVal instanceof Date) {
                        result = new Date(aVal) - new Date(bVal);
                    }

                    if (result !== 0) return order === 'asc' ? result : -result;
                }
                return 0;
            });
        }

        return filtered;
    }, [items, searchQuery, searchKeys, categoryKey, selectedCategory, sortKeys]);
};