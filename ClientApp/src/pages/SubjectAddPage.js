import React, { Component } from "react";
import { connect } from "react-redux";
import { addSubject } from "../actions/subject.actions";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class SubjectAddPage extends Component {
  
  state = {
    Name: "",
    Teacher:""
  }

  handlerChangeInput (event){
      let {value, name}= event.target;
      this.setState({[name]: value})
  }

  async handleSubmit (e){
    e.preventDefault();
    await this.props.addSubject(this.state);
    await this.props.history.push("/subjects");
 }

  render() {
    let {state} = this;
    return (
      <div>
        <Form onSubmit={(event) => this.handleSubmit(event)}>
          <FormGroup>
            <Label for="nameInput">Matéria</Label>
            <Input
              type="text"
              name="Name"
              id="nameInput"
              placeholder="Nome da Matéria"
              value={state.Name}
              onChange={(event) => this.handlerChangeInput(event)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="teacherInput">Professor(a)</Label>
            <Input
              type="text"
              name="Teacher"
              id="teacherInput"
              placeholder="Nome do Professor"
              value={state.Teacher}
              onChange={(event) => this.handlerChangeInput(event)}
              required
            />
          </FormGroup>
          <br />
          <Button size="lg" block type="submit">
            Cadastrar
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
    addSubject
};

export default connect(mapStateToProps, mapDispatchToProps)(SubjectAddPage);
