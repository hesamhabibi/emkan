import LoginIcon from "@mui/icons-material/Login";
import { Box, TextField, FormControl, Button } from "@mui/material";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../services/AuthService/mutations";
import { useAuth } from "../../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import {useHeaderComponentContext} from "../../contexts/HeaderComponentContext"

const Login = () => {

  const {set_title_page, set_breadcrumbs} = useHeaderComponentContext();
  useEffect(() => {
    set_title_page('common.loginToAccount')
    set_breadcrumbs([])
  }, [])

  const { set_user , set_token } = useAuth();
  const [login, { data, loading, error }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      console.log(data, "success");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const {t} = useTranslation();

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    // console.log(e.target);
    const username = e.target.username.value;
    const password = e.target.password.value;
    await login({
      variables: { username, password },
    }).then(({ data }) => {
      if (data) {
        set_user(data?.result?.user);
        set_token(data?.result?.token);
        // console.log(user);
      } else {
        console.log(error);
      }
    });
  };

  return (
    
      <main>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            mt: "1rem",
          }}
        >
          <LoginIcon fontSize="large" color="success" />
          <h2>{t('common.loginToAccount')}</h2>
        </Box>
        <FormControl
          component="form"
          sx={{
            width: "400px",
            mt: "20px",
          }}
          onSubmit={loginSubmitHandler}
        >
          <TextField
            id="username"
            name="username"
            label={t('common.username')}
            variant="outlined"
            sx={{
              marginBottom: "15px",
            }}
          />
          <TextField
            id="password"
            name="password"
            label={t('common.password')}
            variant="outlined"
          />
          <Button
            type="submit"
            sx={{
              marginTop: "3rem",
            }}
            variant="contained"
          >
            {t('common.login')}
          </Button>
          {data ? (
            <p>Successfully logged in !</p>
          ) : (
            error && <p>{error.message}</p>
          )}
        </FormControl>
      </main>
  
  );
};

export default Login;
