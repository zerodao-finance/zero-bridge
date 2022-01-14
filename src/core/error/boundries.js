import { Component } from 'react'


export class Boundry extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        logErrorToMyService(error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return <h1>Oops, something went wrong</h1>
        }
        return this.props.children
    }

}