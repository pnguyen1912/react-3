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
      <div style={{ textAlign: 'center', font: '20px', }}>
        <header>To Dos</header>
        <input style={{ borderStyle: 'solid', height: '50px' }} placeholder='What need to be done...' type="text" value={this.state.temp} onKeyDown={(e) => { if (e.key === 'Enter') { this.addToToDo() } }} onChange={event => (this.setState({ temp: event.target.value }))} />
        <div>
          {this.state.showing !== 'done' ? (
            this.state.toDoList.map(item => {
              return (
                <div style={{ height: '50px', borderStyle: 'solid' }}
                  onMouseOver={() => document.getElementById(`${item}`).style.display = 'block'}
                  onMouseOut={() => document.getElementById(`${item}`).style.display = 'none'}

                >
                  <div  >
                    <div style={{}} onClick={() => {
                      const index = this.state.toDoList.indexOf(item)
                      const array = this.state.toDoList.slice();
                      array.splice(index, 1)
                      this.setState({ doneList: [...this.state.doneList, item], toDoList: array })
                    }}>                  <input style={{ float: 'left', }} type="checkbox" />
                      {item}</div>
                    <div>
                      <button id={item} style={{ float: 'right', display: 'none' }}
                        onClick={() => {
                          const index = this.state.toDoList.indexOf(item)
                          const array = this.state.toDoList.slice();
                          array.splice(index, 1)
                          this.setState({ toDoList: array })
                        }}

                      ><span className="icon icon-error"></span></button>
                    </div></div>
                </div>
              )
            })) : null}
        </div>
        <div  >
          {this.state.showing !== 'active' ? (
            this.state.doneList.map(item => {
              return (
                <div style={{ height: '50px', borderStyle: 'solid' }}
                  onClick={() => {
                    const index = this.state.doneList.indexOf(item)
                    const array = this.state.doneList.slice();
                    array.splice(index, 1)
                    this.setState({ toDoList: [...this.state.toDoList, item], doneList: array })
                  }}>
                  <div style={{

                    textDecoration: 'line-through',
                    fontStyle: 'italic'
                  }}> <input style={{ float: 'left' }} type="checkbox" checked />{item}</div>
                </div>
              )
            })) : null}
        </div>


        <div style={{ borderStyle: 'solid', height: '50px', fontSize: '20px' }}>
          <p style={{ float: 'left', paddingLeft: '20px', margin: '0', height: '50px' }}>{this.state.toDoList.length} item left</p>
          <button style={{ borderRadius: '8px', height: '50px' }} onClick={this.buttonClicked} value='all' >All</button>
          <button style={{ borderRadius: '8px', height: '50px' }} onClick={this.buttonClicked} value='active'>Active</button>
          <button style={{ borderRadius: '8px', height: '50px' }} onClick={this.buttonClicked} value='done'>Completed</button>
          <button style={{ float: 'right', borderRadius: '8px', height: '50px' }} onClick={this.clearClicked}>Clear Completed</button>
        </div>
      </div>
    )
  }

  onHover = () => {

  }


}

export default App;