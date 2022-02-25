import { DefaultCheckBox } from "../../../atoms/button";
import React from 'react'
export const ToggleTransferMode = () => {
    const [ checkbox, toggle ] = React.useState(false)
    return (
        <>
            <DefaultCheckBox label='Enable Fast Transfer (1% Fee)' name='transfermode' _check={toggle} checked={checkbox}/>
        </>
    )
}