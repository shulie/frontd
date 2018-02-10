import React, { Component } from 'react';
import PropTypes from 'prop-types';

import update from 'react/lib/update';

class Group extends Component {
  static propTypes = {
    defaultValue: PropTypes.array,
    defaultSelectKeys: PropTypes.array,
    onChange: PropTypes.func,
    selectValues: PropTypes.array
  }

  static defaultProps = {
    defaultValue: [],
    onChange: function(){}
  }

  constructor(props) {
    super(props);
    this.state = {
      checked: props.selectValues || props.defaultSelectKeys || props.defaultValue || [],
    };
    this.onSelectChange = this.onSelectChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.selectValues) !== JSON.stringify(this.props.selectValues)) {
      this.setState({checked: nextProps.selectValues})
    }
  }
  onSelectChange(chk, key) {
    const { selectKeys } = this.state;
    let checked;
    if (chk) {
      checked = update(this.state.checked, {
        $push: [
          key
        ]
      });
    } else {
      const i = this.state.checked.indexOf(key);
      if (i > -1) {
        checked = update(this.state.checked, {
          $splice: [
            [i, 1]
          ]
        })
      }
    }
    this.setState({
      checked
    });
    this.props.onChange(checked);
  }

  render() {
    const { children, className } = this.props;
    const { checked } = this.state;

    return (
      <div className={className}>
        {React.Children.map(children, (child, i) => {
          const key = child.key || i;
          const props = {
            ...child.props,
            onChange: (checked) => this.onSelectChange(checked, key),
            checked: checked.indexOf(key) > -1,
            key: key,
            style: {
              marginRight: i < React.Children.toArray().length - 1 ? 32 : 0
            }
          };
          return {...child, props};
        })}
      </div>
    )
  }
}

export default Group;
