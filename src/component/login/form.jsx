import { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "../movieform/select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };
  validate = () => {
    const option = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, option);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  handleSubmit = (e) => {
    e.preventDefault()
    const errores = this.validate();
    this.setState({ errors: errores || {} });
    if (errores) return;
    this.doSubmit();
  };
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };
  renderBtn = (label) => {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };
  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        label={label}
        onChange={this.handleChange}
        value={data[name]}
        type={type}
        errors={errors[name]}
      ></Input>
    );
  };
  renderSelect = (name, label, option) => {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        label={label}
        value={data[name]}
        options={option}
        onChange={this.handleChange}
        errors={errors[name]}
      ></Select>
    );
  };
}

export default Form;
