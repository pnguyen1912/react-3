import React from 'react'

class App extends React.Component {

  state = {
    temp: '',
    toDoList: [],
    doneList: [],
    showing: 'all',
  }



  checkinput = (event) => {
    if (event === '') {
      console.log('Cannot be empty')
      return false
    } else {
      for (let i = 0; i < this.state.toDoList.length; i++) {
        if (event === this.state.toDoList[i]) {
          console.log('Already in available list')
          return false
        }
      }
      for (let i = 0; i < this.state.doneList.length; i++) {
        if (event === this.state.doneList[i]) {
          console.log('Already in wish list')
          return false
        }
      }
      return true
    }
  }

  addToToDo = () => {
    (this.checkinput(this.state.temp)) ?
      (this.setState({ toDoList: [...this.state.toDoList, this.state.temp] }, this.setState({ temp: '' }))) : (console.log('error'))
  }

  buttonClicked = event => {
    this.setState({ showing: event.target.value })

  }

  clearClicked = () => {
    this.setState({ doneList: [] })
  }


  render() {
    return (
      <div style={{ textAlign: 'center', width: '70%' }}>
        <h1>To Dos</h1>
        <input style={{ borderStyle: 'solid', width: '98.5%' }} placeholder='What need to be done...' type="text" value={this.state.temp} onKeyDown={(e) => { if (e.key === 'Enter') { this.addToToDo() } }} onChange={event => (this.setState({ temp: event.target.value }))} />
        <div>
          {this.state.showing !== 'done' ? (
            this.state.toDoList.map(item => {
              return (
                <div>
                  <div style={{ borderStyle: 'solid' }} onClick={() => {
                    const index = this.state.toDoList.indexOf(item)
                    const array = this.state.toDoList.slice();
                    array.splice(index, 1)
                    this.setState({ doneList: [...this.state.doneList, item], toDoList: array })
                  }}>                  <input style={{ float: 'left', }} type="checkbox" disabled />
                    {item}</div>
                </div>
              )
            })) : null}
        </div>
        <div>
          {this.state.showing !== 'active' ? (
            this.state.doneList.map(item => {
              return (
                <div
                  onClick={() => {
                    const index = this.state.doneList.indexOf(item)
                    const array = this.state.doneList.slice();
                    array.splice(index, 1)
                    this.setState({ toDoList: [...this.state.toDoList, item], doneList: array })
                  }}>
                  <div style={{
                    borderStyle: 'solid',
                    textDecoration: 'line-through',
                    fontStyle: 'italic'
                  }}> <input style={{ float: 'left' }} type="checkbox" checked disabled />{item}</div>
                </div>
              )
            })) : null}
        </div>


        <div style={{ borderStyle: 'solid' }}>
          {this.state.toDoList.length} item left
          <button onClick={this.buttonClicked} value='all' >All</button>
          <button onClick={this.buttonClicked} value='active'>Active</button>
          <button onClick={this.buttonClicked} value='done'>Completed</button>
          <button style={{ float: 'right' }} onClick={this.clearClicked}>Clear Completed</button>
        </div>
      </div>
    )
  }

}

export default App;