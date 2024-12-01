import { useForm } from '@mantine/form';
import { NumberInput, TextInput, Button } from '@mantine/core';
import axios from "axios"
import { useNavigate } from "react-router"
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

function Login() {

  const navigate = useNavigate()
  const { refechData } = useContext(AuthContext);
  
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { username: '', password: '' },
  });
  const handleOnformSubmit = (values) => {
    axios.post('http://localhost:3000/auth/login', values,
      // { withCredentials: true }
    ).then(async ({ data }) => {
      document.cookie = `access_token= Bearer ${data.cookie}`;
      await refechData();
      navigate('/home')
    })
  }

  return (
    <div style={{ marginTop: "50px", display: "flex", justifyContent: "center" }}>
      <form onSubmit={form.onSubmit(handleOnformSubmit)}>
        <TextInput
          label="User Name"
          placeholder="UserName"
          key={form.key('username')}
          {...form.getInputProps('username')}
        />
        <TextInput
          mt="sm"
          label="Password"
          placeholder="Password"
          key={form.key('password')}
          {...form.getInputProps('password')}
        />

        <Button type="submit" mt="sm">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Login