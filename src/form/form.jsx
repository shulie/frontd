import React from 'react';
import PropTypes from 'prop-types';
import createClass from 'create-react-class'
import { createForm } from 'rc-form';
import classNames from 'classnames';
import FormItem from './form-item';
import  { FIELD_META_PROP } from './constants';
class Form extends React.Component {
   static defaultProps = {
    layout: 'horizontal',
    onSubmit(e) {
      e.preventDefault();
    },
  };
  static propTypes = {
    layout: PropTypes.oneOf(['horizontal', 'inline', 'vertical']),
    children: PropTypes.any,
    onSubmit: PropTypes.func,
  };
  constructor(props) {
    super(props);
  }
  static Item = FormItem
  // if create
  static create(options) {
    const formWrapper = createForm(Object.assign({
      fieldNameProp: 'id',
    }, options, {
      fieldMetaProp: FIELD_META_PROP
    }));
    return (Component) => formWrapper(createClass({
      propTypes: {
        form: PropTypes.object.isRequired,
      },
      childContextTypes: {
        form: PropTypes.object.isRequired,
      },
      getChildContext() {
        return {
          form: this.props.form,
        };
      },
      componentWillMount() {
        this.__getFieldProps = this.props.form.getFieldProps;
      },
      deprecatedGetFieldProps(name, option) {
        warning(
          false,
          '`getFieldProps` is not recommended, please use `getFieldDecorator` instead, ' +
          'see: https://github.com/react-component/form',
        );
        return this.__getFieldProps(name, option);
      },
      render() {
        ('wjb-test', this.deprecatedGetFieldProps)
        this.props.form.getFieldProps = this.deprecatedGetFieldProps;

        const withRef = {};
        if (options && options.withRef) {
          withRef.ref = 'formWrappedComponent';
        }
        return <Component {...this.props} {...withRef} />;
      },
    }))
  }
  render() {
    const { layout, ...props } = this.props;
    return (
      <form
        {...props}
        className={classNames('dh-form', {
          [`dh-form-${layout}`]: layout
        })
      }>
        {
           this.props.children
        }
      </form>
    )
  }
}
export default Form;
