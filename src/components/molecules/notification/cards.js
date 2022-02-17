import { CardTemplate } from '../../atoms/template'
import * as Error from '../../atoms/status/error'
export const ErrorCard = ({children, message}) => {
    return (
        <CardTemplate>
            <Error.ErrorIndicator message={message}/>
        </CardTemplate>
    )
}