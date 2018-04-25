import React from 'react';
import PropTypes from 'prop-types'

const Input = (props) => {
    return (
        <div className="form-group">
            <label htmlFor={props.fieldAttributes}>{props.labelValue}</label>
            <input type={props.inputType}
                   className={props.fieldClass}
                   name={props.fieldAttributes}
                   id={props.fieldAttributes}
                   placeholder={props.labelValue}
                   value={props.fieldValue}
                   onChange={props.onChange}
                   required={true}/>
            <div className="invalid-feedback">
                {props.errorMsg}
            </div>
        </div>
    )
};

Input.propTypes = {
    fieldAttributes: PropTypes.string.isRequired,
    labelValue: PropTypes.string.isRequired,
    fieldValue: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    fieldClass: PropTypes.string.isRequired,
    errorMsg: PropTypes.string.isRequired,
    inputType: PropTypes.string.isRequired
};

export default Input;