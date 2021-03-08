import React, { Component } from "react";
import { connect } from "react-redux";
import { getSubject,updateSubject } from "../actions/subject.actions";
import { Button, Form, FormGroup, Label, Input, Spinner } from "reactstrap";

class SubjetcEditPage extends Component {
  
  async componentDidMount(){
    let {id} = this.props.match.params;
    let data = await getSubject(id);
    this.setState({...data,load:false,id});
  }

  state = {
    Id:null,
    Teacher:"",
    Name:"",
    load:true,
  }

  handlerChangeInput (event){
      let {value, name}= event.target;
      this.setState({[name]: value})
  }


  async handleSubmit (e){
    e.preventDefault();
    let {state} = this;
    if(await updateSubject(state.Id,state)){
      await this.props.history.push("/subjects");
    }
    
 }

  render() {
    let {state} = this;
    return (
      <div>
        {state.load ? (
          <Spinner type="grow" color="info" />
        ) : (
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
              Atualizar
            </Button>
          </Form>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(SubjetcEditPage);
