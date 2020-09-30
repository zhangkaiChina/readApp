import React, { Component } from 'react'
import './bookSelectBtn.css'
export class index extends Component {
  constructor(props) {
    super(props)
    console.log(this.props)
  }
  render () {
    return (
      <div>
        <div className='selectBox'>
          <div className='selectList'>
            <p className='titlebox'>

            </p>
            <div className='selectBtnBox'>
              <p className='selectBtn'>

              </p>
            </div>
          </div>
        </div>
        <div className='description'>

        </div>
      </div>
    )
  }
}

export default index
