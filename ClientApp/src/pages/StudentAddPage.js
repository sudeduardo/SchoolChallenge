import React, { Component } from "react";
import { connect } from "react-redux";
import { addStudent } from "../actions/student.actions";
import { listSubjects } from "../actions/subject.actions";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useHistory } from "react-router-dom";

class StudentAddPage extends Component {
  async componentDidMount() {
    this.props.listSubjects();
  }
  
  state = {
    RegistrationCode: "",
    Cpf:"",
    Name:"",
    Photo: undefined,
    ClassName:"",
    Subjects:[]
  }

  handlerChangeInput (event){
      let {value, name}= event.target;
      this.setState({[name]: value})
  }

  handleOnFileChange (e){
    let file = e.target.files[0];
    this.setState({
        [e.target.name] : file
    })
  }

  handlerAddSubject(item){
    let {Subjects} = this.state;
    let index = Subjects.findIndex(x => x.Id == item.Id)
    
    if(index > -1){
      Subjects.splice(index, 1);
    }else{
      Subjects.push({Id:item.Id});
    }

    this.setState({Subjects});
  }

  async handleSubmit (e){
    e.preventDefault();
    await this.props.addStudent(this.state);
    await this.props.history.push("/students");
 }

  render() {
    let { subjects } = this.props; 
    let {list} = subjects;
    let {state} = this;
    return (
      <div>
        <Form onSubmit={(event) => this.handleSubmit(event)}>
          <FormGroup>
            <Label for="matriculaInput">Matricula</Label>
            <Input
              type="number"
              name="RegistrationCode"
              id="matriculaInput"
              placeholder="Número de Matricula"
              value={state.RegistrationCode}
              onChange={(event) => this.handlerChangeInput(event)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="cpfInput">CPF</Label>
            <Input
              type="text"
              name="Cpf"
              id="cpfInput"
              placeholder="CPF do Aluno"
              value={state.Cpf}
              onChange={(event) => this.handlerChangeInput(event)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="nameInput">Nome</Label>
            <Input
              type="text"
              name="Name"
              id="nameInput"
              placeholder="Nome de Aluno"
              value={state.Name}
              onChange={(event) => this.handlerChangeInput(event)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="inputPhoto">Foto</Label>
            <Input type="file" name="Photo" id="inputPhoto" 
            onChange={(event) => this.handleOnFileChange(event)}
            
            />
          </FormGroup>
          <FormGroup>
            <Label for="inputClassName">Curso</Label>
            <Input
              type="text"
              name="ClassName"
              id="inputClassName"
              placeholder="Nome do Curso"
              value={state.ClassName}
              onChange={(event) => this.handlerChangeInput(event)}
              required
            />
          </FormGroup>
          <div>
            <Label>Matérias</Label>
            {
              list.map(item => (<FormGroup check key={"mat-"+item.Id}>
                <Label check>
                  <Input type="checkbox" checked={state.Subjects.findIndex(x => x.Id == item.Id) > -1} onChange={() => this.handlerAddSubject(item)}/> {item.Name}
                </Label>
              </FormGroup>))
            }
          </div>
          <br />
          <Button size="lg" block type="submit">
            Cadastrar
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  subjects : state.Subject
});

const mapDispatchToProps = {
  addStudent,
  listSubjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentAddPage);
