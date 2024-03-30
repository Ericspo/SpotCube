import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { styled as MuiStyled, Button } from '@mui/material';
import MailchimpSubscribe from "react-mailchimp-subscribe"

const StyledInput = styled.input`
  border: none !important;
  height: fit-content;
  user-select: none;
  background: transparent;
  border-bottom: 1px solid white !important;
  color: white;
  padding: 10px 0;
  font-size: 15px;
  min-width: 400px;
  margin-left: auto;
  margin-right: 30px;

  @media (max-width: 900px) {
    margin-top: 46px;
    margin-left: 0px;
    margin-bottom: 10px;
  }

  &::placeholder {
    color: white;
    opacity: 1; /* Firefox */
  }

  &:active {
    border: none !important;
  }

  &:hover,
  &:focus {
    border: none !important;
    outline: none !important;
    border-bottom: 1px solid white !important;
  }
`;

const StyledForm = styled.form`
  display: flex;
  gap: 10px;
  flex-direction: row;
  @media (max-width: 1200px) {
    display: block
  }
`

const StyledButton = MuiStyled(Button)`
  border-radius: 40;
  background: white;
  font-size: 24;
  color: #0d0d2b;
  text-transform: capitalize;
  border-radius: 100px;
  font-weight: 600;
  padding: 10px 20px;
  :hover {
    background-color: #c4d2d1;
  }
`;

const CustomForm = ({ status, message, onValidated }) => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        email &&
        email.indexOf("@") > -1 &&
        onValidated({
          MERGE0: email,
          MERGE1: '',
          MERGE2: ''
        });

    }

    useEffect(() => {
      if(status === "success") clearFields();
    }, [status])

    const clearFields = () => {
        setEmail('');
    }

    return (
      <>
        {
          (status === null || status === 'sending' || status === 'error')?
          <StyledForm onSubmit={handleSubmit}>
            <StyledInput onChange={(e)=>{setEmail(e.target.value)}} label="Email" value={email} required placeholder='Enter your email'></StyledInput>
            <StyledButton type="submit">Subscribe</StyledButton>
          </StyledForm>
          :
          status === 'success' &&
          <div className='text-sm font-normal text-[#1b8073]'>Welcome! You are successfully registered.</div>
        }
      </>
    );
};


const MailchimpForm = () => {
    const url = `https://spoticcoin.us22.list-manage.com/subscribe/post?u=83bf61f4fa0c42f41b2409a6a&id=7137db5ede`;

    return (
        <div className="mc__form-container">
            <MailchimpSubscribe
                url={url}
                render={({ subscribe, status, message }) => (
                    <CustomForm
                        status={status}
                        message={message}
                        onValidated={formData => subscribe(formData)}
                    />
                )}
            />
        </div>

    )
}

export default MailchimpForm;