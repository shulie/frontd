import React from 'react';
import PropTypes from 'prop-types';
class DatasheetCell extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   value: props.value
    // };
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }
  componentDidUpdate(prevProps) {
    const { rIndex, index } = this.props;
    if (this.props.editable && this.props.selected) {

      let ref = this.refs[`input_${rIndex}_${index}`];
       //ref.focus();
      // let val = ref.value;
      // ref.value = '';
      // ref.value = val;

    }
  }
  handleDoubleClick() {
    let { rIndex, index } = this.props;
    this.props.onDoubleClick(rIndex, index);
  }
  handleClick() {
    const { rIndex, index } = this.props
    this.props.onClick(rIndex, index);
  }
  handleKeyDown() {
    const { rIndex , index} = this.props;
    this.props.onEditable(rIndex, index)
  }
  // handleChange(e) {
  //   this.setState({ value: e.target.value });
  // }
  handleBlur(e) {
    let value = e.target.value
    let { rIndex, index } = this.props;
    if (this.props.value + '' !== value) {
      this.props.onChange(rIndex, index, value);
    }
  }
  render() {
    const props = this.props;
    const value = props.value;
    return (
      <td
        className={props.selected ? 'selected' : ''}
        onClick={this.handleDoubleClick}
        // onClick={this.handleClick}
      >
        {
          props.editable ? (
            <input
              className="editable"
              ref={`input_${props.rIndex}_${props.index}`}
              defaultValue={value}
              // onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
          ) : null
        }
        <span>{value}</span>
      </td>
    )
  }
}
export default DatasheetCell
