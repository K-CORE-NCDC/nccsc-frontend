import React, { Component } from 'react'
import { renderPlot } from '@oncojs/survivalplot/index.js'
import defaults from 'lodash.defaults'
import '../../styles/survival.css'
import sampleData from './survival.json'

function isElementFullScreen (element) {
  return [
    document.fullscreenElement,
    document.webkitFullscreenElement,
    document.mozFullscreenElement,
  ].indexOf(element) >= 0
}

export default class SurvivalCmp extends React.Component {
  constructor(props) {
    super(props);

    this.listRef = React.createRef();
    this.data = [
      {
        "meta": {
          "id": "38144623-cbef-435f-9627-e13df0a6ba35",
          "state": "FINISHED",
          "count": 2,
          "name": "PAEN-IT",
          "description": "",
          "type": "DONOR",
          "version": 2,
          "timestamp": 1329318120,
          "subtype": "NORMAL"
        },
        "donors": [
          {
            "id": "DO52161",
            "status": "deceased",
            "time": 12.4,
            "survivalEstimate": 0.5,

          },
          {
            "id": "DO227681",
            "status": "deceased",
            "time": 12.4,
            "survivalEstimate": 0.2,

          },
          {
            "id": "DO227682",
            "status": "deceased",
            "time": 12.4,
            "survivalEstimate": 0.4,
          }
        ]
      }
    ]
    this.state = {
      data:this.data,
      tooltip: {
        donor: {},
        x: 0,
        y:0,
        isVisible: false,
      }
    }

    this.defaultProps2 = {
      palette: ['#1880b2', '#c20127', '#00005d'],
      censoredStatuses: ['alive'],
      margins: {
        top: 20,
        right: 20,
        bottom: 46,
        left: 60,
      },
      onMouseEnterDonors(event, donors) {
        console.log({
          donors: donors.map(donor => ({
            ...donor,
            isCensored: this.props.censoredStatuses.indexOf(donor.status) >= 0,
          })),
        })
      },
      onMouseLeaveDonors () {
        console.log('onMouseLeaveDonor')
      },
      onClickDonors (e, donors) {
        console.log('onClickDonor')
      },
      xAxisLabel: 'Survival Rate',
      yAxisLabel: 'Duration (days)',
    };

  }
  state = {


  }
  componentDidMount(){

    // this.setState({
      // "data":[this.props.survival_data]
    // })
    this.update()
    console.log(this.state)
  }


  handleMouseEnterDonors = (event, donors) => {
    this.setState({tooltip: {
      ...this.state.tooltip,
      isVisible: true,
      donor: donors[0],
      x: event.x,
      y: event.y,
    }})
  }

  handleMouseLeaveDonors = () => {
    this.setState({
      tooltip: {
        ...this.state.tooltip,
        isVisible: false,
      },
    })
  }

  updateState = newState => {
    this.stateStack = this.stateStack.concat(this.state)
    this.setState(newState)
  }

  update = params => {
    var state = this.state
    var container = this._container
    var handleMouseEnterDonors = this.handleMouseEnterDonors
    var handleMouseLeaveDonors = this.handleMouseLeaveDonors
    var props = this.defaultProps2

    renderPlot(defaults({
      container,
      dataSets: this.state.data,
      palette: props.palette,
      xDomain: state.xDomain,
      xAxisLabel: 'Duration (days)',
      yAxisLabel: 'Survival Rate',
      height: isElementFullScreen(container) ? ( window.innerHeight - 100 ) : 0,
      onMouseEnterDonors:{handleMouseEnterDonors},
      onMouseLeaveDonors:{handleMouseLeaveDonors},
      onDomainChange: {handleMouseLeaveDonors},
      margins: {
        top: 20,
        right: 20,
        bottom: 46,
        left: 60,
      },
    }, params))
  }

  render() {
    const tooltip = this.state.tooltip
    const donor = tooltip.donor
    const tooltipStyle = {
      position: 'absolute',
      top: tooltip.y,
      left: tooltip.x,
      display: tooltip.isVisible ? 'block' : 'none',
      pointerEvents: 'none',
    }

    return (
      <div>
        <div style={{'width':'960px'}}
          ref={c => this._container = c}
          className={this.props.className || ''}
        />
      </div>
    );
  }
}
