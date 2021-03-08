import React, { Component } from "react";
import { connect } from "react-redux";
import { getStudent,updateStudent } from "../actions/student.actions";
import {listSubjects} from "../actions/subject.actions"
import { Button, Form, FormGroup, Label, Input, Spinner } from "reactstrap";

class StudentEditPage extends Component {
  
  async componentDidMount(){
    await this.props.listSubjects();
    let {id} = this.props.match.params;
    let data = await getStudent(id);
    this.setState({...data,load:false});
  }

  state = {
    RegistrationCode: "",
    Cpf:"",
    Name:"",
    Photo: undefined,
    ClassName:"",
    Subjects:[],
    load:true,
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

  async handleSubmit (e){
    e.preventDefault();
    let {state} = this;
    let {id} = this.props.match.params;
    delete state.Id;
    if(await updateStudent(id,state)){
      await this.props.history.push("/students");
    }
    
 }

 handlerAddSubject(id){
  let {Subjects} = this.state;
  if(!Subjects){
    Subjects = [id];
    return;
  }
  let index = Subjects.findIndex(x => x == id)
  
  if(index > -1){
    Subjects.splice(index, 1);
  }else{
    Subjects.push(id);
  }

  this.setState({Subjects});
}

  render() {
    let { subjects } = this.props; 
    let {list} = subjects;
    let {state} = this;
    return (
      <div>
        {state.load ? (
          <Spinner type="grow" color="info" />
        ) : (<Form onSubmit={(event) => this.handleSubmit(event)}>
        <FormGroup>
          <Label for="matriculaInput">Matricula</Label>
          <Input
            type="number"
            name="RegistrationCode"
            id="matriculaInput"
            placeholder="Número de Matricula"
            value={state.RegistrationCode}
            onChange={(event) => this.handlerChangeInput(event)}
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
          />
        </FormGroup>
        <FormGroup>
          <Label for="inputPhoto">Foto</Label>
          <Input type="file" name="photo" id="inputPhoto" 
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
          />
        </FormGroup>
        <div>
          <Label>Matérias</Label>
          {
              list.map(item => (<FormGroup check key={"mat-"+item.Id}>
                <Label check>
                  <Input type="checkbox" checked={state.Subjects && state.Subjects.includes(item.Id)} onChange={() => this.handlerAddSubject(item.Id)}/> {item.Name}
                </Label>
              </FormGroup>))
            }
        </div>
        <br />
        <Button size="lg" block type="submit">
          Atualizar
        </Button>
      </Form>)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  subjects : state.Subject
});

const mapDispatchToProps = {
  listSubjects
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentEditPage);
