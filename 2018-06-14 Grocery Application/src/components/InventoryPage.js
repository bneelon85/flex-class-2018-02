import React, { Component } from 'react'
import InventoryTable from './InventoryPage/InventoryTable.js'
import {getInventory} from '../inventory.js'

// C. Oakman
// You could put these two components (NoItemsFound, SearchInput) into their own
// modules if you wanted to.

function NoItemsFound () {
  return (
    <p className='no-items'>No items found.</p>
  )
}

function SearchInput (props) {
  return (
    <input className='input is-medium'
      type='text'
      value={props.searchTxt}
      onChange={props.updateSearchTxt}
      placeholder='Search Inventory …' />
  )
}

// C. Oakman
// This component has state, so we use a class.
class InventoryPage extends Component {
  constructor () {
    super()

    // C. Oakman
    // Initialize this component with inventory data that we stored in localStorage
    this.state = {
      inventory: getInventory(),
      searchTxt: ''
    }
  }

  // C. Oakman - we will pass the synthetic React event to this function as "evt"
  updateSearchTxt (evt) {
    // C. Oakman
    // Very often you need to get the value from an <input> element via onChange event
    // That value is located at: evt.currentTarget.value
    const newText = evt.currentTarget.value
    this.setState({searchTxt: newText})
  }

  // Does this item match the search text?
  isMatch (searchTxt, item) {
    // make everything a string and lower case
    const pluString = item.plu.toString()
    const lcSearchTxt = searchTxt.toLowerCase()
    const lcName = item.name.toLowerCase()

    return pluString.includes(lcSearchTxt) ||
           lcName.includes(lcSearchTxt)
  }

  render () {
    const updateSearchTxt = this.updateSearchTxt.bind(this)

    // C. Oakman - here we are binding "isMatch" to null (ie: nothing) and injecting
    // the first argument to the function
    const matchFn = this.isMatch.bind(null, this.state.searchTxt)

    // C. Oakman - filtering of results happens here
    const filteredItems = this.state.inventory.filter(matchFn)

    let bodyComponent = <InventoryTable items={filteredItems} />
    if (filteredItems.length === 0) {
      bodyComponent = <NoItemsFound />
    }

    // C. Oakman
    // This small render function produces a lot of DOM (the full inventory table)
    // But the complexity is located in other components that are children of this
    // one.
    // Small render functions are easier to understand than large ones.
    // You can generalize this to all programming:
    // "small functions are easier to understand than long functions"
    return (
      <section>
        <SearchInput searchTxt={this.state.searchTxt} updateSearchTxt={updateSearchTxt} />
        <div className='push-down'>
          {bodyComponent}
        </div>
      </section>
    )
  }
}

export default InventoryPage
