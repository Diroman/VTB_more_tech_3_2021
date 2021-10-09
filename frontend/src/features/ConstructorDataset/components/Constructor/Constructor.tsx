import React from 'react';
import ChipInput from "material-ui-chip-input";

const Constructor = () => {
    const [state, setState] = React.useState<string>('');
    const [value, setValue] = React.useState<string[]>(['foo', 'bar']);

    const handleAddChip = (chip: string) => {
        console.log('add', chip)
        const newValues = [...value, chip]
        setValue(newValues);
    }

    const handleDeleteChip = (ship: string, index: number) => {
        console.log('delete');
    }

    return (
        <div>

        </div>

    );
}

export default Constructor;
