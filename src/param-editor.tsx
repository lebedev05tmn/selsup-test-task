import React from "react";

interface Param {
  id: number;
  name: string;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface ParamInputProps {
  param: Param;
  value: string;
  onChange: (paramId: number, value: string) => void;
}

interface ParamEditorProps {
  params: Param[];
  model: Model;
}

interface ParamEditorState {
  paramValues: { [paramId: number]: string };
}

class ParamInput extends React.Component<ParamInputProps> {
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { param, onChange } = this.props;
    onChange(param.id, e.target.value);
  };

  render() {
    const { param, value } = this.props;
    return (
      <div>
        <label>{param.name}</label>
        <input type="text" value={value} onChange={this.handleChange} />
      </div>
    );
  }
}

class ParamEditor extends React.Component<ParamEditorProps, ParamEditorState> {
  constructor(props: ParamEditorProps) {
    super(props);
    const { model } = props;
    const paramValues: { [paramId: number]: string } = {};
    model.paramValues.forEach(paramValue => {
      paramValues[paramValue.paramId] = paramValue.value;
    });
    this.state = { paramValues };
  }

  handleParamChange = (paramId: number, value: string) => {
    this.setState(prevState => ({
      paramValues: {
        ...prevState.paramValues,
        [paramId]: value,
      },
    }));
  };

  getModel = (): Model => {
    const { paramValues } = this.state;
    return {
      paramValues: Object.keys(paramValues).map(paramId => ({
        paramId: parseInt(paramId),
        value: paramValues[parseInt(paramId)],
      })),
    };
  };

  render() {
    const { params } = this.props;
    const { paramValues } = this.state;

    return (
      <div>
        {params.map(param => (
          <ParamInput
            key={param.id}
            param={param}
            value={paramValues[param.id] || ""}
            onChange={this.handleParamChange}
          />
        ))}
      </div>
    );
  }
}

export default ParamEditor;
