import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const MostrarSuscriptor = ({suscriptor}) => {
  if(!suscriptor) return <Spinner />;
  return( 
    <div className="row">
      <div className="col-md-6 mb-4">
        <Link
          to={'/suscriptores'}
          className="btn btn-secondary"
        >
          <FontAwesomeIcon icon="arrow-circle-left" />{' '}
          Volver al Listado
        </Link>
      </div>
      <div className="col-md-6">
        <Link
          to={`/suscriptores/editar/${suscriptor.id}`}
          className="btn btn-primary float-right"
        >
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          Editar Suscriptor
        </Link>
      </div>
      <hr className="mx-5 w-100"/>
      <div className="col-12">
        <h2 className="mb-4">
          {suscriptor.nombre} {suscriptor.apellido}
        </h2>
        <p>
          <span className="font-weight-bold">
            Carrera:
          </span>{' '}
          {suscriptor.carrera}
        </p>
        <p>
          <span className="font-weight-bold">
            Código:
          </span>{' '}
          {suscriptor.codigo}
        </p>
      </div>
    </div>
  );
}

MostrarSuscriptor.propTypes = {
  firestore : PropTypes.object.isRequired
}

export default compose(
  firestoreConnect(props => [{
    collection : 'suscriptores',
    storeAs : 'suscriptor',
    doc : props.match.params.id
  }]),
  connect(({firestore: {ordered}}, props) => ({
    suscriptor : ordered.suscriptor && ordered.suscriptor[0]
  }))
)(MostrarSuscriptor);