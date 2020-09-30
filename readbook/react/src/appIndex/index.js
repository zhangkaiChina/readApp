import React, { Component } from 'react'
import axios from 'axios'

import BookSelectBtn from '../bookSelectBtn'
export class appIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bookSelect: []
    }
  }
  componentWillMount () {
    axios.get('/booklist')
      .then((res) => {
        let { bookSelect } = res.data
        this.setState({
          bookSelect
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  render () {
    let { bookSelect } = this.state
    return (
      <div>
        {
          bookSelect.map((el, index) => {
            return <BookSelectBtn key={index} chanId={el.chanId} child={el.child} title={el.title}></BookSelectBtn>
          })
        }
      </div>
    )
  }
}

export default appIndex
