// npm packages
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import moment from 'moment';

// our packages
import {createQuestion} from '../../store/actions';
import Navbar from '../../components/navbar';
import {MyPropType} from '../../util';

const mapStateToProps = state => ({
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  doCreateQuestion: payload => dispatch(createQuestion(payload)),
});

export const Create = ({doCreateQuestion, user}) => {
  let questionText;
  let questionDate;

  const handleCreate = (e) => {
    e.preventDefault();

    const text = questionText.value;
    const expirationDate = moment(questionDate.value).toISOString();
    doCreateQuestion({text, expirationDate});

    return false;
  };

  return (
    <div>
      <Navbar user={user} current="/create" />

      <div>
        <form>
          <div className="form-group">
            <label htmlFor="questionText">Question text</label>
            <input
              type="text"
              className="form-control"
              id="questionText"
              placeholder="Question text"
              ref={(t) => { questionText = t; }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="expirationDate">Expiration date</label>
            <input
              type="date"
              className="form-control"
              id="expirationDate"
              placeholder="expirationDate"
              ref={(d) => { questionDate = d; }}
            />
          </div>
          <button type="submit" className="btn btn-default" onClick={handleCreate}>
            Create a new question
          </button>
        </form>
      </div>
    </div>
  );
};
Create.propTypes = {
  doCreateQuestion: PropTypes.func.isRequired,
  user: MyPropType.UserPropType.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
