import { Component, createRef } from 'react'

export class ContactFilter extends Component {

    state = {
        filterBy: null
    }

    typeInputRef = createRef()

    componentDidMount() {
        const { filterBy } = this.props
        this.setState({ filterBy: { ...filterBy } })
    }

    handleRef = (elInput) => {
        elInput?.focus()
    }

    handleChange = ({ target }) => {
        const field = target.name
        let value = target.value
        // switch (target.type) {
        //     case 'number':
        //     case 'range':
        //         value = +value
        //         break;
        //     case 'checkbox':
        //         value = target.checked
        //         break
        //     default:
        //         break;
        // }

        this.setState(
            prevState => ({ filterBy: { ...prevState.filterBy, [field]: value } }),
            () => this.props.onChangeFilter({ ...this.state.filterBy })
        )

    }

    render() {
        const { filterBy } = this.state
        if (!filterBy) return <div>Loading...</div>

        const { term } = filterBy
        return (
            <form className='contact-filter'>
                <section>
                    <label htmlFor="term"></label>
                    <input ref={this.handleRef} onChange={this.handleChange}
                     value={term} type="text" name="term" id="term" placeholder='Search for a contact' />
                </section>
            </form>
        )
    }
}
