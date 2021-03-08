import React, { Component } from 'react';
import {connect} from 'react-redux';
import {listSubjects,deleteSubject} from "../actions/subject.actions"
import {Table,Spinner, Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import ModalConfirm from "../components/ModalConfirm"

class SubjectsPage extends Component {
  state = {
    isOpen: false,
    subject: null
  }
  componentDidMount = async () => {
    this.props.listSubjects();
  };

  handlerConfirmDeleteSubject(event,subject){
    event.preventDefault();
    this.setState({subject})
    this.setIsOpen();
  }

  async handlerDeleteSubject(){
    let {isOpen,subject} = this.state;
    await this.props.deleteSubject(subject.Id)
    this.setState({isOpen:!isOpen,subject:null})
    await this.props.listSubjects();

  }
  
  setIsOpen(){
    this.setState({isOpen:!this.state.isOpen})
  }
  render() {
    let {isOpen,subject} = this.state;
    let { list, load } = this.props.subjects;
    return (
      <div>

        {load ? (
          <Spinner type="grow" color="info" />
        ) : (
          <Table>
            <thead>
              <tr>
                <th className="text-center" colSpan="2">
                  Matérias Cadastradas
                </th>
                <th>
                  <Link to={"/subjects/add"}>
                    Adicionar
                  </Link>
                </th>
              </tr>
              <tr>
                <th>Matéria</th>
                <th>Professor</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item) => (
                <tr key={item.Id}>
                  <td>{item.Name}</td>
                  <td>{item.Teacher}</td>
                  <td>
                    <Link to={`/subjects/${item.Id}/edit`}>Editar</Link>
                    {` `}
                    <a href="#" onClick={(event) => this.handlerConfirmDeleteSubject(event,item)}>Excluir</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <ModalConfirm isOpen={isOpen} setIsOpen={() => this.setIsOpen()} title="Excluir Matéria" actionConfirm={() => this.handlerDeleteSubject()}>
          <p>Confirmar exclusão da Matéria {(subject) ? subject.Name: ""}</p>
        </ModalConfirm>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  subjects: state.Subject
})

const mapDispatchToProps = {
  listSubjects,
  deleteSubject
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectsPage)