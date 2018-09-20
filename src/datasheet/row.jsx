import React from 'react';
import PropTypes from 'prop-types';
import Cell from './cell';

class DatasheetRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentWillMount() {
    if (this.props.data && Array.isArray(this.props.data)) {
      this.state.data = this.props.data;
    }
  }
  shouldComponentUpdate(nextProps) {
     return nextProps.index === this.props.index
  }
  render() {
    // const data = this.state.data;
    const { index, data} = this.props;
    return (
      <tr>
        {

          data.map((item, idx) => (
            <Cell
              key={`datasheet-cell-${idx}`}
              index={idx}
              rIndex={index}
              selected={item.selected}
              editable={item.editable}
              value={item.value}
              readOnly={item.readOnly}
              onChange={this.props.onChange}
              onClick={this.props.onSelectCell}
              onDoubleClick={this.props.onDoubleClick}
            />
          ))
        }
      </tr>
    )
  }
}
export default DatasheetRow
