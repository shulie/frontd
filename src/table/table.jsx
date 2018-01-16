import React, { Component } from 'react';
import update from 'react/lib/update';
import classNames from 'classnames';

import PropTypes from 'prop-types';
import Checkbox from '../checkbox';
import Icon from '../icon';

const EXT_WIDTH = 24;

class Table extends Component {
  static propTypes = {
    dataSource: PropTypes.array,
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.element
        ]),
        ext: PropTypes.element,
        dataIndex: PropTypes.string,
        render: PropTypes.func,
        sorter: PropTypes.oneOfType([
          PropTypes.func,
          PropTypes.bool
        ])
      })
    ),
    onChange: PropTypes.func,
    onLoad: PropTypes.func,
    size: PropTypes.oneOf(['default', 'small', 'large']),
    bordered: PropTypes.bool,
    striped: PropTypes.bool,
    rowSelection: PropTypes.object,
    fixed: PropTypes.bool,
    upIcon: PropTypes.string,
    downIcon: PropTypes.string
  };

  static defaultProps = {
    size: 'default',
    striped: true,
    columns: [],
    dataSource: [],
    upIcon: 'sort-up',
    downIcon: 'sort-down',
    fixed: true

  };

  constructor(props) {
    super(props);
    this.state = {
      selectedIdx: [],
      fixedHeader: false,
      sorter: {},
      scrollLeft: 0
    };

    this.onClickSelect = this.onClickSelect.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.columns !== this.props.columns) {
      this.preventRequest = false;
    }
  }

  onClickSelectAll(checked) {
    const {
      dataSource,
      rowSelection: {
        onSelectAll = function () {
        }
        }
      } = this.props;

    let selectedIdx = [];
    if (checked) {
      selectedIdx = dataSource.map((d, i) => i);
    }
    this.setState({
      selectedIdx
    });
    onSelectAll(checked, checked ? dataSource : [])
  }

  onClickSelect(checked, idx) {
    const {
      dataSource,
      rowSelection: {
        onSelect = function () {
        }
        }
      } = this.props;
    const { selectedIdx } = this.state;

    const p = selectedIdx.indexOf(idx);
    if (p > -1) {
      selectedIdx.splice(p, 1);
    } else {
      selectedIdx.push(idx);
    }
    this.setState({
      selectedIdx
    });
    onSelect(dataSource[idx], checked, dataSource.filter((d, i) => selectedIdx.indexOf(i) > -1))
  }
  //默认第一次降序
  handleSortChange = (field) => {
    this.setState(
      {
        sorter: {
          [field]: this.state.sorter[field] == 'desc' ? 'asc' : 'desc'
        }
      }, () => {
        if (this.props.onChange) {
          this.props.onChange(null, null, this.state.sorter);
        }
    });
  };

  handleScroll = () => {
    const { scrollLeft, scrollTop, scrollHeight, clientHeight } = this.table;
    this.thead.style.transform = `translateY(${scrollTop}px)`;
    if (scrollTop + clientHeight >= scrollHeight - 36) {
      if (!this.preventRequest) {
        if (this.props.onLoad) {
          this.props.onLoad(this.props.dataSource.length);
        }
        this.preventRequest = true;
      }
    }
  };
  render() {
    const { dataSource, columns, size, bordered, striped, rowSelection, fixed, upIcon, downIcon, ...props } = this.props;
    const { selectedIdx, sorter } = this.state;

    const thead = (
      <thead ref={thead => this.thead = thead} >
      <tr>
        {rowSelection && (
          <th>
            <Checkbox onChange={this.onClickSelectAll.bind(this)}/>
          </th>
        )}
        {columns.map(d => (
          <th
              key={d.dataIndex}
              className={classNames({[d.className]: d.className})}
          >
            {d.title}
            {d.sorter && (
              <span className="dh-sort-icon" onClick={() => this.handleSortChange(d.dataIndex)}>
                  <Icon type={sorter[d.dataIndex] == 'asc' ? upIcon : downIcon} role={sorter[d.dataIndex] ? 'active' : ''}  />
              </span>
            )}
            {d.ext && (
              <span style={{paddingLeft: 20}}>
                <div className="dh-table-ext" style={{width: EXT_WIDTH}}>
                  {d.ext}
                </div>
              </span>
            )}
          </th>
        ))}
      </tr>
      </thead>
    );

    const tbody = (
      <tbody>
      {dataSource.map((d, i) => (
        <tr key={i}>
          {rowSelection && (
            <td>
              <Checkbox
                checked={selectedIdx.indexOf(i) > -1}
                onChange={(checked) => this.onClickSelect(checked, i)}
              />
            </td>
          )}
          {columns.map(c => (
            <td
              className={classNames({
                        'an-table-col-frozen': c.frozen
                      }, {[c.className]: c.className})}
              key={c.dataIndex}
            >
              {c.render ? c.render(d[c.dataIndex], d, i) : (d[c.dataIndex] || '(空白)')}
            </td>
          ))}
        </tr>
      ))}
      </tbody>
    );

    return (
      <div
        {...props}
        className={classNames('dh-table', {
          [`dh-table-${size}`]: size,
          [`dh-table-bordered`]: bordered,
          [`dh-table-striped`]: striped,
          [`dh-table-fixed`]: fixed
        })}
        ref={table => this.table = table}
        onWheel={this.handleScroll}
        onScroll={this.handleScroll}
      >
        <table cellSpacing="0">
          {tbody}
          {thead}
        </table>
      </div>
    )
  }
}

export default Table;
