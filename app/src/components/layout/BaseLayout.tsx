import { Outlet } from "react-router";
import Container from '@mui/material/Container';


export const BaseLayout = () => {
  return (
    <Container maxWidth="lg" sx={{ marginTop: 4, marginBottom: 4 }}>
      <Outlet/>
    </Container>
  );
}