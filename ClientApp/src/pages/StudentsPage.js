import React, { Component } from 'react';
import {connect} from 'react-redux';
import {listStudent, deleteStudent} from "../actions/student.actions"
import {Table,Spinner, Button} from 'reactstrap';
import { Link } from 'react-router-dom';

import ModalConfirm from "../components/ModalConfirm"

class StudentPage extends Component {

  state = {
    isOpen: false,
    student: null
  }

  componentDidMount = async () => {
    this.props.listStudent();
  };

  handlerConfirmDeleteStudent(event,student){
    event.preventDefault();
    this.setState({student})
    this.setIsOpen();
  }

  async handlerDeleteStudent(){
    let {isOpen,student} = this.state;
    await this.props.deleteStudent(student.Id)
    this.setState({isOpen:!isOpen,student:null})
    await this.props.listStudent();

  }
  
  setIsOpen(){
    this.setState({isOpen:!this.state.isOpen})
  }

  
  render() {
    let {isOpen,student} = this.state;
    let { list, load } = this.props.students;
    return (
      <div>

        {load ? (
          <Spinner type="grow" color="info" />
        ) : (
          <Table>
            <thead>
              <tr>
                <th className="text-center" colSpan="3">
                  Alunos Cadastrado
                </th>
                <th>
                  <Link to={"/students/add"}>
                    Adicionar
                  </Link>
                </th>
              </tr>
              <tr>
                <th>Matricula</th>
                <th>Nome</th>
                <th>Turma</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item) => (
                <tr key={item.Id}>
                  <th>{item.RegistrationCode}</th>
                  <td>{item.Name}</td>
                  <td>{item.ClassName}</td>
                  <td>
                    <Link to={`/students/${item.Id}/edit`}>Editar</Link>
                    {` `}
                    <Link  onClick={(event) => this.handlerConfirmDeleteStudent(event,item)}>Excluir</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <ModalConfirm isOpen={isOpen} setIsOpen={() => this.setIsOpen()} title="Excluir Aluno" actionConfirm={() => this.handlerDeleteStudent()}>
          <p>Confirmar exclusão do Aluno {(student) ? student.Name: ""}</p>
        </ModalConfirm>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  students: state.Student
})

const mapDispatchToProps = {
  listStudent,
  deleteStudent
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentPage)