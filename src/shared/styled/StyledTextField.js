import { TextField, styled } from '@mui/material';

export default styled(TextField)`
  & .MuiFormHelperText-root {
    font-size: 14px;
    font-weight: bold;
    text-align: left;
    width: 100%;
  }

  &.success {
    & .MuiFormHelperText-root {
      color: #18bd18;
    }
  }

  &.error {
    & .MuiFormHelperText-root {
    }
  }

  & .MuiOutlinedInput-root {
    background: white !important;

    & fieldset {
      border: none !important;
    }

    &:hover fieldset {
      border: none !important;
    }

    &.Mui-focused fieldset {
      border: none !important;
    }
    color: red;
    width: 300px;
    height: 56px;
    border-radius: 10px;

    border: 1px solid rgba(39, 40, 141, 1);
    @media (max-width:500px) {
      width: inherit;
    }
  }

  & .MuiInputBase-input {
    background: white !important;
    color: black !important;
  }
`;
