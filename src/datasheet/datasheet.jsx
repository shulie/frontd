import React from 'react';
import ReactDOM from 'react-dom';

// import update from 'react/lib/update';
import PropTypes from 'prop-types';

import Row from './row';
function buildArray(number = 0) {
  let _array = [];
  for (let index = 0; index < number; index++) {
    _array.push({});
  }
  return _array
}

const ROW_HEIGHT = 33; //默认行高
const PAGE_TOTAL = 50;
class Datasheet extends React.Component {
  static propTypes = {
    header: PropTypes.array,
    dataSource: PropTypes.array,
    onChange: PropTypes.func,
    onLoad: PropTypes.func
  }
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    }
    this.handleSeleteCell = this.handleSeleteCell.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentWillMount() {
    if (this.props.dataSource && Array.isArray(this.props.dataSource)) {
      this.setState({ dataSource: this.initHeadData(this.props.dataSource) });
    }
  }
  componentDidMount() {
    // const $datasheet = ReactDOM.findDOMNode(this);
    // const $parentNode = $datasheet.parentNode;
    // console.log('la', $parentNode.clientWidth)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.dataSource !== this.props.dataSource) {
      this.setState({dataSource: this.initHeadData(nextProps.dataSource)})
    }
  }
  initHeadData(dataSource) {
    let header = this.props.header;
    return Array.isArray(dataSource) ? dataSource.map(item => {
      if (header.length > item.length) {
          return [].concat(item, buildArray(header.length - item.length))
      }
      return item;
    }) : []
  }
  handleSeleteCell(rIndex, index) {
    const dataSource = this.state.dataSource;
    const _dataSource = dataSource.map((item, idx) => {
      if (rIndex === idx) {
        return item.map((c, jdx) => ({
            ...c,
            editable: false,
            selected: jdx === index ? true : false
          })
        );
      }
      return item.map(c => ({...c, editable: false, selected: false }));
    })
    this.setState({ dataSource: _dataSource })
  }
  handleChange(rIndex, index, value) {
    let [preCell, nextCell] = [null, null];
    const dataSource = this.state.dataSource.map((row, idx) => {
      if (idx === rIndex) {
        return row.map((cell, jdx) => {
          if (jdx === index) {
            preCell = { ...cell };
            nextCell = {...cell, value}
            return nextCell;
          }
          return cell;
        });
      }
      return row;
    });
    this.setState({ dataSource }, () => {
      if (this.props.onChange && typeof this.props.onChange === 'function') {
        let {
           editable: preEditable,
           selected: preSelected,
           ...preOther
         } = preCell;
        let {

          editable: nextEditable,
          selected: nextSelected,
          ...nextOther
        } = nextCell;
        this.props.onChange({ ...preOther }, { ...nextOther }, [rIndex, index])
      }
    })
  }
  handleKeyDown(e) {
    // console.log(e.keyCode)
    // // const dataSource = this.state.dataSource;
    // // const _dataSource = dataSource.map((item, idx) =>
    // //   item.map(c => ({...c, editable: c.selected ? true : false }))
    // // )
    // // this.setState({ dataSource: _dataSource })
  }
  handleDoubleClick(rIndex, index) {
    const dataSource = this.state.dataSource.map((item, idx) => {
      if (idx === rIndex) {
        return item.map((c, jdx) => ({
          ...c,
          selected: jdx === index ? true : false,
          editable: jdx === index ? true : false
        }));
      }
      return item.map(c => ({...c, editable: false, selected: false }));
    })
    this.setState({ dataSource });
  }
  handleScroll() {
    const { scrollTop, scrollHeight, clientHeight } = this.refs.datasheet;
    const { onScrollPage, dataSource } = this.props;
    this.refs.thead.style.transform = `translateY(${scrollTop}px)`;
    if (typeof onScrollPage === 'function') {
      onScrollPage({ scrollTop, scrollHeight, clientHeight, height: 32})
      // if (scrollTop + clientHeight > scrollHeight - ROW_HEIGHT) {
      //
      // } else if (scrollTop === 0) {
      //   onScrollPage('up')
      // }
    }
  }
  render() {
    const dataSource = this.state.dataSource;
    const header = this.props.header;
    const { xScroll } = this.props;
    let tStyle = null;
    if (xScroll) {
      tStyle={ width: xScroll };
    }
    return (
      <div
        className="dh-datasheet"
        ref="datasheet"
        onScroll={this.handleScroll}
        onWheel={this.handleScroll}
        >
        <table
          tabIndex="-1"
          cellSpacing="0"
          onKeyDown={this.handleKeyDown}
          style={tStyle}
        >
          <thead ref="thead">
            <tr>
              {
                header.map((item, idx) => (
                  <th key={`datasheet-th-${idx}`}>{item.title}</th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {
              dataSource.map((item, idx) => (
                <Row
                  index={idx}
                  data={item}
                  key={`datasheet-row-${idx}`}
                  onChange={this.handleChange}
                  onDoubleClick={this.handleDoubleClick}
                  onEditable={this.handleEditable}
                  onSelectCell={this.handleSeleteCell}
                />
              ))
            }
          </tbody>
        </table>
      </div>
    )
  }
}
export default Datasheet
