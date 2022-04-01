import * as React from 'react'
import { useNotificationContext } from '../../api/notification';

export const NotificationContainer = ({card}) => {
    const { cardDispatch } = useNotificationContext();
    
    function renderItem(i) {
        if (typeof i.content === 'function') {
            return i.content({...i})
        } else {
            return <pre>{JSON.stringify(content, null, 2)}</pre>;
        }
    }


    return (
        <div className="fixed top-[48px] left-[10px] z-[100]">
            <div>
                {
                    card.reverse().map(i => {
                        return (
                            <div key={i.id} className="my-3 z-[100]">
                                { renderItem({...i, dispatch: cardDispatch})}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}